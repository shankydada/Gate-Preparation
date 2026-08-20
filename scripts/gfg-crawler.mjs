#!/usr/bin/env node
/**
 * gfg-crawler — validates every GeeksforGeeks link used by the app.
 *
 * What it does
 *   1. Extracts all https://www.geeksforgeeks.org/... URLs from the src/ tree
 *      (gateData.ts inline resources + the curated gfgMap.ts).
 *   2. Crawls each URL (bounded concurrency, browser UA, timeout, retries
 *      with exponential backoff, Retry-After awareness).
 *   3. Classifies results:
 *        ok      2xx (after redirects)
 *        dead    404 / 410 — the article is gone, fix the data
 *        blocked 403 / 406 / 429-persistent — GFG anti-bot / rate limiting
 *                (NOT treated as dead; retry later or from another network)
 *        error   anything else (5xx after retries, network failure, DNS…)
 *   4. Writes a human-readable summary and an optional JSON report.
 *
 * Usage
 *   node scripts/gfg-crawler.mjs [--strict] [--max N] [--concurrency N]
 *        [--timeout ms] [--json out.json] [--base-url URL] [--quiet]
 *
 *   --strict        exit 1 if any link is *dead* (blocked/error never fail —
 *                   GFG throttles datacenter IPs like GitHub Actions runners)
 *   --max N         validate at most N links (smoke testing)
 *   --concurrency N parallel requests (default 6; keep modest, be polite)
 *   --timeout ms    per-request timeout (default 15000)
 *   --json PATH     also write a machine-readable report
 *   --base-url URL  remap all GFG links onto this origin (offline fixtures)
 *   --quiet         only print the summary
 *
 * Exit codes: 0 = healthy (or non-strict), 1 = dead links found (strict),
 *             2 = usage error.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const GFG_HOSTS = /https:\/\/(?:www\.)?geeksforgeeks\.org\/[^\s"'`),]+/g;

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const v = args[i + 1];
  return v && !v.startsWith('--') ? v : true;
};

const strict = args.includes('--strict');
const quiet = args.includes('--quiet');
const max = Number(flag('max', 0)) || 0;
const concurrency = Math.max(1, Number(flag('concurrency', 6)) || 6);
const timeoutMs = Math.max(1000, Number(flag('timeout', 15000)) || 15000);
const jsonPath = typeof flag('json', undefined) === 'string' ? flag('json', '') : '';
const baseUrl = typeof flag('base-url', undefined) === 'string' ? flag('base-url', '').replace(/\/+$/, '') : '';

if (args.some(a => a.startsWith('--help') || a.startsWith('-h')) ) {
  console.log('See header comment in this file for usage.');
  process.exit(0);
}

// ── URL discovery ──────────────────────────────────────────────────────────
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx|js|jsx|md)$/.test(entry)) acc.push(p);
  }
  return acc;
}

// Expand simple `${CONST}/path` template literals (gfgMap.ts stores links as
// `${GFG}/maths/set-theory/`) so they are discovered like literal URLs.
function expandGfgTemplates(text) {
  const constRe = /(?:const|let|var)\s+([A-Z][A-Z0-9_]*)\s*=\s*['"](https:\/\/(?:www\.)?geeksforgeeks\.org[^'"]*)['"]/g;
  let m;
  while ((m = constRe.exec(text))) {
    text = text.split(`\${${m[1]}}`).join(m[2]);
  }
  return text;
}

const ROOT = path.resolve(import.meta.dirname, '..');
const files = walk(path.join(ROOT, 'src'));
const found = new Map(); // url -> [sources]
for (const file of files) {
  const text = expandGfgTemplates(readFileSync(file, 'utf8'));
  for (const raw of text.match(GFG_HOSTS) ?? []) {
    // strip trailing punctuation that regex may have swallowed
    const url = raw.replace(/[.,;:]+$/, '');
    if (!found.has(url)) found.set(url, []);
    found.get(url).push(path.relative(ROOT, file));
  }
}

let urls = [...found.keys()].sort();
if (max > 0) urls = urls.slice(0, max);

if (urls.length === 0) {
  console.error('No GeeksforGeeks URLs found under src/ — nothing to crawl.');
  process.exit(0);
}
if (!quiet) console.log(`Found ${found.size} unique GFG URLs in src/ (crawling ${urls.length}).\n`);

// ── HTTP client with the usual "crawler fixes" ────────────────────────────
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const DEAD = new Set([404, 410]);
const BLOCKED = new Set([403, 406, 429, 503]);

async function checkUrl(url, attempt = 1) {
  const target = baseUrl ? baseUrl + new URL(url).pathname : url;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(target, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (res.ok) return { status: 'ok', code: res.status };

    if (DEAD.has(res.status)) return { status: 'dead', code: res.status };

    // Retry transient statuses (429/5xx/503) up to 3 times with backoff,
    // honouring Retry-After when GFG sends it.
    const transient = res.status === 429 || res.status >= 500 || BLOCKED.has(res.status);
    if (transient && attempt < 3) {
      const ra = Number(res.headers.get('retry-after')) || 0;
      const wait = Math.max(ra * 1000, 500 * 3 ** (attempt - 1)) + Math.random() * 250;
      if (!quiet) console.log(`  ↻ ${res.status} ${url} — retrying in ${Math.round(wait)}ms (attempt ${attempt + 1}/3)`);
      await sleep(wait);
      return checkUrl(url, attempt + 1);
    }

    return BLOCKED.has(res.status)
      ? { status: 'blocked', code: res.status }
      : { status: 'error', code: res.status };
  } catch (err) {
    const reason = err?.name === 'AbortError' ? 'timeout' : (err?.cause?.code ?? err?.code ?? 'network');
    if (attempt < 3) {
      const wait = 500 * 3 ** (attempt - 1) + Math.random() * 250;
      if (!quiet) console.log(`  ↻ ${reason} ${url} — retrying in ${Math.round(wait)}ms (attempt ${attempt + 1}/3)`);
      await sleep(wait);
      return checkUrl(url, attempt + 1);
    }
    return { status: 'error', code: 0, reason: String(reason) };
  } finally {
    clearTimeout(timer);
  }
}

// ── Bounded-concurrency worker pool (never unbounded; be polite to GFG) ───
const results = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    const outcome = await checkUrl(url);
    results.push({ url, sources: found.get(url), ...outcome });
    if (!quiet) {
      const mark = outcome.status === 'ok' ? '✔' : outcome.status === 'dead' ? '✘' : '⚠';
      console.log(`${mark} [${outcome.status.padEnd(7)}] ${outcome.code || outcome.reason || ''} ${url}`);
    }
  }
}
await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));

// ── Report ─────────────────────────────────────────────────────────────────
const counts = results.reduce((acc, r) => ((acc[r.status] = (acc[r.status] ?? 0) + 1), acc), {});
const summary = {
  generatedAt: new Date().toISOString(),
  crawled: results.length,
  totalFound: found.size,
  ok: counts.ok ?? 0,
  dead: counts.dead ?? 0,
  blocked: counts.blocked ?? 0,
  error: counts.error ?? 0,
};

console.log('\n──────── GFG link crawl summary ────────');
console.log(`ok: ${summary.ok}   dead: ${summary.dead}   blocked: ${summary.blocked}   error: ${summary.error}`);

if (summary.dead > 0) {
  console.log('\nDead links (article removed / slug changed — update src/data/gfgMap.ts or gateData.ts):');
  for (const r of results.filter(x => x.status === 'dead')) console.log(`  ✘ ${r.url}  (${r.sources.join(', ')})`);
}
if (summary.blocked + summary.error > 0) {
  console.log(`\n${summary.blocked + summary.error} link(s) were blocked/unreachable (anti-bot, rate limits or network).`);
  console.log('These are NOT counted as dead. Re-run locally or check the JSON report.');
}

if (jsonPath) {
  writeFileSync(jsonPath, JSON.stringify({ summary, results }, null, 2));
  console.log(`\nJSON report written to ${jsonPath}`);
}

if (strict && summary.dead > 0) {
  console.error(`\nStrict mode: ${summary.dead} dead link(s). Failing.`);
  process.exit(1);
}
process.exit(0);
