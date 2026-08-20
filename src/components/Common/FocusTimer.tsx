import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Timer, Play, Pause, RotateCcw, X, Flame, Coffee, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';

const FOCUS_PRESETS = [
  { label: '25 min', minutes: 25 },
  { label: '50 min', minutes: 50 },
];

export default function FocusTimer() {
  const { darkMode, user, logFocusSession, getMinutesStudiedToday } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState(25);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [justFinished, setJustFinished] = useState(false);
  const endTimeRef = useRef<number>(0);

  const minutesToday = getMinutesStudiedToday();

  useEffect(() => {
    if (!running) return;
    endTimeRef.current = Date.now() + secondsLeft * 1000;
    const tick = setInterval(() => {
      const left = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left <= 0) {
        clearInterval(tick);
        setRunning(false);
        setJustFinished(true);
        logFocusSession(preset);
      }
    }, 250);
    return () => clearInterval(tick);
  }, [running]); // eslint-disable-line react-hooks/exhaustive-deps

  const start = () => setRunning(true);
  const pause = () => setRunning(false);

  const reset = (mins = preset) => {
    setRunning(false);
    setJustFinished(false);
    setPreset(mins);
    setTotalSeconds(mins * 60);
    setSecondsLeft(mins * 60);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;

  return (
    <>
      {/* Compact card on home */}
      <motion.div
        className={`rounded-2xl p-6 flex items-center justify-between gap-4 ${
          darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className={`p-3 rounded-xl ${darkMode ? 'bg-cyan-500/15' : 'bg-cyan-100'}`}
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Timer className="w-6 h-6 text-cyan-500" />
          </motion.div>
          <div>
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Focus Timer</h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Pomodoro sessions bank XP & count toward your streak
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {minutesToday}<span className="text-sm font-medium"> min</span>
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>studied today</p>
          </div>
          <motion.button
            onClick={() => setIsOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4" />
            Focus
          </motion.button>
        </div>
      </motion.div>

      {/* Timer modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => { if (!running) { reset(); } setIsOpen(false); }} />
            <motion.div
              className={`relative w-full max-w-md rounded-3xl overflow-hidden p-8 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => { if (!running) reset(); setIsOpen(false); }}
                className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-5 h-5" />
              </button>

              {!justFinished ? (
                <>
                  <h3 className={`text-center text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Deep Focus Mode 🧘
                  </h3>
                  <p className={`text-center text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    One topic. No phone. Finish the session to bank +{Math.round(preset / 5) * 5} XP.
                  </p>

                  {/* Ring */}
                  <div className="relative w-56 h-56 mx-auto mb-6">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="112" cy="112" r="100" stroke={darkMode ? '#1f2937' : '#e5e7eb'} strokeWidth="10" fill="none" />
                      <motion.circle
                        cx="112" cy="112" r="100"
                        stroke="url(#focusGrad)" strokeWidth="10" fill="none" strokeLinecap="round"
                        strokeDasharray="628"
                        animate={{ strokeDashoffset: 628 - 628 * progress }}
                        transition={{ duration: 0.3 }}
                      />
                      <defs>
                        <linearGradient id="focusGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`font-mono text-5xl font-bold tabular-nums ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {mm}:{ss}
                      </span>
                      <span className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {running ? 'focusing…' : 'ready'}
                      </span>
                    </div>
                  </div>

                  {/* Presets */}
                  <div className="flex justify-center gap-2 mb-6">
                    {FOCUS_PRESETS.map((p) => (
                      <button
                        key={p.minutes}
                        disabled={running}
                        onClick={() => reset(p.minutes)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                          preset === p.minutes
                            ? 'bg-cyan-500 text-white'
                            : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                        } ${running ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-3">
                    {running ? (
                      <motion.button
                        onClick={pause}
                        className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-xl flex items-center gap-2"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      >
                        <Pause className="w-5 h-5" /> Pause
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={start}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/25"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-5 h-5" /> {secondsLeft < totalSeconds ? 'Resume' : 'Start Focus'}
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => reset()}
                      disabled={running}
                      className={`p-3 rounded-xl ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} ${running ? 'opacity-50' : ''}`}
                      whileHover={{ scale: running ? 1 : 1.05 }} whileTap={{ scale: running ? 1 : 0.95 }}
                      title="Reset"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <p className={`mt-5 text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    ⏳ Sessions today count toward badges & quests • {new Date().toDateString()}
                  </p>
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring' }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
                  >
                    <Zap className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Session Complete! 🎉
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                    +{Math.round(preset / 5) * 5} XP banked • +{preset} min logged
                  </p>
                  <p className={`text-sm mb-6 flex items-center justify-center gap-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    <Flame className="w-4 h-4" /> Streak protected — {user.streak} day{user.streak === 1 ? '' : 's'} strong
                  </p>
                  <div className="flex justify-center gap-3">
                    <motion.button
                      onClick={() => reset(preset)}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl flex items-center gap-2"
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                      <Coffee className="w-4 h-4" /> Another round
                    </motion.button>
                    <motion.button
                      onClick={() => { reset(); setIsOpen(false); }}
                      className={`px-6 py-3 font-semibold rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                      Done for now
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
