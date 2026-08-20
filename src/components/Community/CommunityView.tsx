import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
  Users,
  Search,
  Flame,
  Clock3,
  Trophy,
  ChevronUp,
  MessageCircle,
  Send,
  PlusCircle,
  X,
  Megaphone,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  PenLine,
} from 'lucide-react';
import { useStore, CommunityPost } from '../../store/useStore';
import { communityCategories } from '../../data/gateData';

type SortMode = 'hot' | 'new' | 'top';

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const catIcon = (id: string) => communityCategories.find(c => c.id === id)?.icon ?? '💬';
const catLabel = (id: string) => communityCategories.find(c => c.id === id)?.label ?? id;

export default function CommunityView() {
  const {
    darkMode,
    user,
    communityPosts,
    addCommunityPost,
    addCommunityReply,
    togglePostUpvote,
    toggleReplyUpvote,
  } = useStore();

  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<SortMode>('hot');
  const [search, setSearch] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [postCategory, setPostCategory] = useState('general');
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<{ [postId: string]: string }>({});

  const filteredPosts = useMemo(() => {
    let posts = [...communityPosts];
    if (category !== 'all') posts = posts.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        p => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'new':
        posts.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'top':
        posts.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'hot':
      default:
        posts.sort((a, b) => (b.upvotes + b.replies.length * 3) - (a.upvotes + a.replies.length * 3));
    }
    return posts;
  }, [communityPosts, category, sort, search]);

  const totalReplies = communityPosts.reduce((acc, p) => acc + p.replies.length, 0);
  const myPosts = communityPosts.filter(p => p.mine).length;

  const submitPost = () => {
    if (!title.trim() || !body.trim()) return;
    addCommunityPost(title.trim(), body.trim(), postCategory);
    setTitle('');
    setBody('');
    setComposerOpen(false);
  };

  const submitReply = (postId: string) => {
    const text = (replyDrafts[postId] || '').trim();
    if (!text) return;
    addCommunityReply(postId, text);
    setReplyDrafts(prev => ({ ...prev, [postId]: '' }));
  };

  const card = darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm';
  const input = `w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
    darkMode
      ? 'bg-gray-900/60 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400'
  }`;

  return (
    <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-500 mb-4">
            <Users className="w-3.5 h-3.5" /> {communityPosts.length} threads • {totalReplies} replies
          </span>
          <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Aspirant{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Community</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ask doubts, share strategies, celebrate streaks — post +25 XP, reply +15 XP
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Controls */}
            <motion.div className={`rounded-2xl p-4 space-y-3 ${card}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search threads… (e.g. deadlock, 2027 syllabus)"
                    className={`${input} pl-10`}
                  />
                </div>
                <div className="flex gap-2">
                  {([{ id: 'hot', icon: Flame, label: 'Hot' }, { id: 'new', icon: Clock3, label: 'New' }, { id: 'top', icon: Trophy, label: 'Top' }] as const).map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSort(s.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium ${
                        sort === s.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : darkMode ? 'bg-gray-700/60 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <s.icon className="w-4 h-4" /> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    category === 'all' ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700/60 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  ✨ All
                </button>
                {communityCategories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      category === c.id ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700/60 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Composer */}
            <motion.div className={`rounded-2xl overflow-hidden ${card}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {!composerOpen ? (
                <button
                  onClick={() => setComposerOpen(true)}
                  className={`w-full flex items-center gap-3 p-4 text-left ${darkMode ? 'hover:bg-gray-700/40' : 'hover:bg-gray-50'}`}
                >
                  <span className="text-2xl">😎</span>
                  <span className={`flex-1 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Start a discussion — doubt, strategy, or a win worth sharing… (+25 XP)
                  </span>
                  <PlusCircle className="w-5 h-5 text-blue-500" />
                </button>
              ) : (
                <motion.div className="p-5 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <PenLine className="w-4 h-4 text-blue-500" /> New Thread
                    </h3>
                    <button onClick={() => setComposerOpen(false)} className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Thread title (make it specific!)" maxLength={120} className={input} />
                  <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Describe your question or thought. What have you tried already?" rows={4} maxLength={2000} className={`${input} resize-none`} />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {communityCategories.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setPostCategory(c.id)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            postCategory === c.id ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700/60 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {c.icon} {c.label}
                        </button>
                      ))}
                    </div>
                    <motion.button
                      onClick={submitPost}
                      disabled={!title.trim() || !body.trim()}
                      className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 ${
                        title.trim() && body.trim()
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
                      }`}
                      whileHover={title.trim() && body.trim() ? { scale: 1.03 } : {}}
                      whileTap={title.trim() && body.trim() ? { scale: 0.97 } : {}}
                    >
                      <Send className="w-4 h-4" /> Post (+25 XP)
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Posts */}
            <AnimatePresence mode="popLayout">
              {filteredPosts.length === 0 && (
                <motion.div
                  className={`rounded-2xl p-10 text-center ${card}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                  <span className="text-5xl block mb-3">🔍</span>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>No threads found</p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Try a different search or start the first thread!</p>
                </motion.div>
              )}
              {filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  darkMode={darkMode}
                  expanded={expandedPost === post.id}
                  onToggleExpand={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  onUpvote={() => togglePostUpvote(post.id)}
                  onUpvoteReply={(rid) => toggleReplyUpvote(post.id, rid)}
                  replyDraft={replyDrafts[post.id] || ''}
                  onReplyDraftChange={(v) => setReplyDrafts(prev => ({ ...prev, [post.id]: v }))}
                  onSubmitReply={() => submitReply(post.id)}
                  card={card}
                  input={input}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Your community stats */}
            <motion.div className={`rounded-2xl p-5 ${card}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Sparkles className="w-4 h-4 text-yellow-500" /> Your Community Stats
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { v: myPosts, l: 'Threads' },
                  { v: user.repliesCreated, l: 'Replies' },
                  { v: user.questsCompletedTotal, l: 'Quests' },
                ].map(s => (
                  <div key={s.l} className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700/40' : 'bg-gray-50'}`}>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.v}</p>
                    <p className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.l}</p>
                  </div>
                ))}
              </div>
              {user.displayName && (
                <p className={`mt-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Posting as <strong className={darkMode ? 'text-blue-400' : 'text-blue-600'}>{user.displayName}</strong> (anonymous by default)
                </p>
              )}
            </motion.div>

            {/* Rules */}
            <motion.div className={`rounded-2xl p-5 ${card}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
              <h3 className={`font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <ShieldCheck className="w-4 h-4 text-green-500" /> House Rules
              </h3>
              <ul className={`space-y-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>🔍 Search before posting — your doubt may already be answered.</li>
                <li>🎯 Be specific: subject + topic + what you tried.</li>
                <li>🤝 Speak from experience in strategy threads; cite official sources for exam facts.</li>
                <li>🚫 No spam, ads, or paywalled resource selling.</li>
                <li>💪 Cheer loudly for every streak — small wins compound.</li>
              </ul>
            </motion.div>

            {/* Local board note */}
            <motion.div
              className={`rounded-2xl p-5 ${darkMode ? 'bg-blue-500/5 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'}`}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            >
              <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                💾 <strong>This board lives on your device</strong> (private, offline-first). Threads marked 🤖 are
                curated starter discussions. For discussions with thousands of aspirants & experts, join the big
                communities below.
              </p>
            </motion.div>

            {/* External communities */}
            <motion.div className={`rounded-2xl p-5 ${card}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <h3 className={`font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Megaphone className="w-4 h-4 text-purple-500" /> Bigger GATE Communities
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'GATE Overflow — #1 Q&A for GATE CS', url: 'https://gateoverflow.in', meta: '25+ yrs of solved PYQ discussions' },
                  { name: 'Reddit — r/GATEtards', url: 'https://www.reddit.com/r/GATEtards/', meta: 'Strategy, rants & motivation' },
                  { name: 'GateQA — free practice platform', url: 'https://gateqa.in', meta: 'PYQ question bank + mock tests' },
                  { name: 'GO Classes — community & courses', url: 'https://www.goclasses.in', meta: 'Deep-dive GATE CS content' },
                ].map(l => (
                  <motion.a
                    key={l.name}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between gap-2 p-3 rounded-xl text-sm ${
                      darkMode ? 'bg-gray-700/40 hover:bg-gray-700/70 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span>
                      <span className="block font-medium">{l.name}</span>
                      <span className={`block text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{l.meta}</span>
                    </span>
                    <ExternalLink className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
interface PostCardProps {
  post: CommunityPost;
  darkMode: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  onUpvote: () => void;
  onUpvoteReply: (replyId: string) => void;
  replyDraft: string;
  onReplyDraftChange: (v: string) => void;
  onSubmitReply: () => void;
  card: string;
  input: string;
}

function PostCard({
  post, darkMode, expanded, onToggleExpand, onUpvote, onUpvoteReply,
  replyDraft, onReplyDraftChange, onSubmitReply, card, input,
}: PostCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className={`rounded-2xl overflow-hidden ${card} ${post.mine ? (darkMode ? 'ring-1 ring-blue-500/40' : 'ring-2 ring-blue-200') : ''}`}
    >
      <div className="flex">
        {/* Vote rail */}
        <div className={`flex flex-col items-center gap-1 p-3 ${darkMode ? 'bg-gray-900/40' : 'bg-gray-50/80'}`}>
          <motion.button
            onClick={onUpvote}
            className={`p-1.5 rounded-lg ${post.upvoted ? 'bg-orange-500 text-white' : darkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-200'}`}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>
          <span className={`text-sm font-bold ${post.upvoted ? 'text-orange-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {post.upvotes}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-500">
              {catIcon(post.category)} {catLabel(post.category)}
            </span>
            {post.mine && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/15 text-green-500">YOURS</span>
            )}
            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {post.avatar} {post.author} • {timeAgo(post.createdAt)}
            </span>
          </div>

          <h3 className={`font-bold mb-1.5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{post.title}</h3>
          <p className={`text-sm whitespace-pre-line ${expanded ? '' : 'line-clamp-3'} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {post.body}
          </p>

          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={onToggleExpand}
              className={`flex items-center gap-1.5 text-xs font-semibold ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <MessageCircle className="w-4 h-4" />
              {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
              <span className="text-blue-500">{expanded ? '▲ hide' : '▼ open'}</span>
            </button>
          </div>

          {/* Replies */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className={`mt-4 pt-4 space-y-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  {post.replies.map(r => (
                    <motion.div
                      key={r.id}
                      className={`flex gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700/40' : 'bg-gray-50'}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <span className="text-xl flex-shrink-0">{r.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs mb-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <strong className={r.mine ? 'text-green-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {r.author}{r.mine ? ' (you)' : ''}
                          </strong>{' '}
                          • {timeAgo(r.createdAt)}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{r.text}</p>
                      </div>
                      <button
                        onClick={() => onUpvoteReply(r.id)}
                        className={`self-start flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                          r.upvoted ? 'bg-orange-500/15 text-orange-500' : darkMode ? 'text-gray-500 hover:bg-gray-600' : 'text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        <ChevronUp className="w-3.5 h-3.5" /> {r.upvotes}
                      </button>
                    </motion.div>
                  ))}

                  {/* Reply composer */}
                  <div className="flex gap-2">
                    <input
                      value={replyDraft}
                      onChange={e => onReplyDraftChange(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') onSubmitReply(); }}
                      placeholder="Write a helpful reply… (+15 XP)"
                      maxLength={1000}
                      className={input}
                    />
                    <motion.button
                      onClick={onSubmitReply}
                      disabled={!replyDraft.trim()}
                      className={`px-4 rounded-xl flex-shrink-0 ${
                        replyDraft.trim()
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
                      }`}
                      whileTap={replyDraft.trim() ? { scale: 0.95 } : {}}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
