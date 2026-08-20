import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Landmark,
  CalendarDays,
  FileSpreadsheet,
  GitCommitHorizontal,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  PlusCircle,
  MinusCircle,
  BadgeCheck,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import {
  GATE_INFO,
  IMPORTANT_DATES,
  EXAM_PATTERN,
  SYLLABUS_CHANGES,
  OFFICIAL_LINKS,
} from '../../data/gate2027Official';

const statusStyle: Record<string, { pill: string; label: string }> = {
  clarified: { pill: 'bg-blue-500/20 text-blue-500', label: 'Clarified' },
  refined: { pill: 'bg-purple-500/20 text-purple-500', label: 'Refined' },
  reduced: { pill: 'bg-orange-500/20 text-orange-500', label: 'Reduced' },
  unchanged: { pill: 'bg-green-500/20 text-green-500', label: 'Unchanged' },
};

const kindDot: Record<string, string> = {
  registration: 'bg-blue-500',
  'admit-card': 'bg-yellow-500',
  exam: 'bg-red-500',
  result: 'bg-green-500',
  info: 'bg-gray-500',
};

export default function OfficialInfo() {
  const { darkMode } = useStore();
  const [openChange, setOpenChange] = useState<string | null>(SYLLABUS_CHANGES[0].subjectId || 'unchanged');

  const card = darkMode
    ? 'bg-gray-800/80 border border-gray-700'
    : 'bg-white border border-gray-200 shadow-sm';

  return (
    <section className="space-y-8">
      {/* Section header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Synced with the official website — gate2027.iitm.ac.in
        </span>
        <h2 className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          GATE 2027: The{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
            Official Facts
          </span>
        </h2>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Conducted by {GATE_INFO.organizingInstitute} • {GATE_INFO.totalTestPapers} test papers • score valid for {GATE_INFO.scoreValidity}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Important dates timeline */}
        <motion.div className={`rounded-2xl p-6 ${card}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-blue-500/15">
              <CalendarDays className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Important Dates (Official)</h3>
          </div>
          <div className="space-y-0">
            {IMPORTANT_DATES.map((d, i) => (
              <motion.div
                key={d.label}
                className="relative pl-7 pb-4 last:pb-0"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {i < IMPORTANT_DATES.length - 1 && (
                  <div className={`absolute left-[5px] top-3.5 bottom-0 w-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                )}
                <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${kindDot[d.kind]} ring-4 ${darkMode ? 'ring-gray-800' : 'ring-white'}`} />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{d.label}</p>
                    {d.note && <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{d.note}</p>}
                  </div>
                  <span className={`text-xs font-bold whitespace-nowrap px-2 py-1 rounded-lg ${d.kind === 'exam' ? 'bg-red-500/15 text-red-500' : darkMode ? 'bg-gray-700/70 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    {d.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className={`mt-5 p-3 rounded-xl text-xs flex items-start gap-2 ${darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-50 text-yellow-800'}`}>
            <BadgeCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>DigiLocker is mandatory</strong> for Indian nationals registering for GATE 2027. Also new: <strong>Robotics &amp; Automation (RA)</strong> paper — 30 papers total. Dates are liable to change — always verify on the official site.
            </span>
          </div>
        </motion.div>

        {/* Exam pattern */}
        <motion.div className={`rounded-2xl p-6 ${card}`} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-purple-500/15">
              <FileSpreadsheet className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Exam Pattern (CS Paper)</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { v: String(EXAM_PATTERN.totalQuestions), l: 'Questions' },
              { v: String(EXAM_PATTERN.totalMarks), l: 'Marks' },
              { v: EXAM_PATTERN.duration, l: 'Duration' },
            ].map((s) => (
              <div key={s.l} className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.v}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.l}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 mb-5">
            {EXAM_PATTERN.sections.map((s) => (
              <div key={s.name} className={`flex items-center justify-between p-3 rounded-xl text-sm ${darkMode ? 'bg-gray-700/40' : 'bg-gray-50'}`}>
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>{s.name}</span>
                <span className="font-bold text-purple-500">{s.marks} marks</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {EXAM_PATTERN.questionTypes.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-500">{t}</span>
            ))}
          </div>
          <ul className={`space-y-1.5 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {EXAM_PATTERN.negativeMarking.map((n) => (
              <li key={n} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>{n}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Syllabus change tracker */}
      <motion.div className={`rounded-2xl p-6 ${card}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-orange-500/15">
            <GitCommitHorizontal className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Syllabus Changelog — GATE 2026 → 2027
            </h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              IIT Madras revised 3 of 10 technical sections. This app's syllabus & resources below are already updated to match.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {SYLLABUS_CHANGES.map((change, i) => {
            const isOpen = openChange === (change.subjectId || `u-${i}`);
            const style = statusStyle[change.status];
            return (
              <motion.div
                key={change.subject}
                className={`rounded-xl overflow-hidden border ${darkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50/60'}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenChange(isOpen ? null : change.subjectId || `u-${i}`)}
                  className="w-full flex items-center justify-between gap-3 p-4"
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${style.pill}`}>
                      {style.label}
                    </span>
                    <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{change.subject}</span>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-4 pb-4 space-y-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <p className={`pt-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{change.summary}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {change.added.length > 0 && (
                            <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-500/5' : 'bg-green-50'}`}>
                              <p className="text-xs font-bold text-green-600 mb-2">NOW EXPLICIT / ADDED</p>
                              <ul className="space-y-1.5">
                                {change.added.map((a) => (
                                  <li key={a} className={`flex items-start gap-2 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <PlusCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />{a}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {change.removed.length > 0 && (
                            <div className={`p-3 rounded-lg ${darkMode ? 'bg-red-500/5' : 'bg-red-50'}`}>
                              <p className="text-xs font-bold text-red-500 mb-2">NO LONGER EXPLICIT</p>
                              <ul className="space-y-1.5">
                                {change.removed.map((r) => (
                                  <li key={r} className={`flex items-start gap-2 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <MinusCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />{r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Official links grid */}
      <motion.div
        className={`rounded-2xl p-6 ${darkMode ? 'bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Landmark className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Official GATE 2027 Links (IIT Madras)</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {OFFICIAL_LINKS.map((l) => (
            <motion.a
              key={l.name}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between gap-2 p-3 rounded-xl text-sm font-medium transition-colors ${
                darkMode ? 'bg-gray-800/70 hover:bg-gray-800 text-gray-200' : 'bg-white hover:bg-emerald-100/60 text-gray-800 border border-emerald-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="truncate">{l.name}</span>
              <span className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">{l.tag}</span>
                <ExternalLink className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </span>
            </motion.a>
          ))}
        </div>
        <p className={`mt-4 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Helpdesk: {GATE_INFO.helpdesk.email} • {GATE_INFO.helpdesk.phone}
        </p>
      </motion.div>
    </section>
  );
}
