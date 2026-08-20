import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { CalendarClock, ExternalLink } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { FIRST_EXAM_DATE_ISO, GATE_INFO } from '../../data/gate2027Official';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(): TimeLeft {
  const diff = Math.max(0, new Date(FIRST_EXAM_DATE_ISO).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const { darkMode } = useStore();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(computeTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const motivation = useMemo(() => {
    const d = timeLeft.days;
    if (d <= 0) return "It's here. Trust your preparation. Go crush it! 🏆";
    if (d <= 7) return 'Final week! Light revision, formula sheets, sleep well. 🧘';
    if (d <= 30) return 'Under a month left — mocks + PYQs every single day. 📈';
    if (d <= 100) return 'Double digits soon. Daily consistency wins now. 🔥';
    return 'Every topic you finish today is a mark saved in February. 💪';
  }, [timeLeft.days]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl p-6 ${
        darkMode
          ? 'bg-gradient-to-br from-red-950/60 via-gray-900 to-orange-950/40 border border-red-500/30'
          : 'bg-gradient-to-br from-red-50 via-white to-orange-50 border border-red-200 shadow-lg'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* pulsing glow */}
      <motion.div
        className="absolute -top-16 -right-16 w-48 h-48 bg-red-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <motion.div
            className={`p-3 rounded-xl ${darkMode ? 'bg-red-500/20' : 'bg-red-100'}`}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <CalendarClock className="w-7 h-7 text-red-500" />
          </motion.div>
          <div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              GATE 2027 begins in
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              6–21 February 2027 • {GATE_INFO.organizingShort}
            </p>
          </div>
        </div>

        {/* Ticking units */}
        <div className="flex items-center gap-2 sm:gap-3">
          {units.map((u) => (
            <div key={u.label} className="text-center">
              <motion.div
                key={`${u.label}-${u.label === 'Seconds' ? u.value : u.label === 'Minutes' && timeLeft.seconds === 0 ? u.value : 'static'}`}
                className={`w-16 sm:w-20 py-3 rounded-xl font-mono text-2xl sm:text-3xl font-bold tabular-nums ${
                  darkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                }`}
                initial={u.label === 'Seconds' ? { scale: 1.06 } : false}
                animate={u.label === 'Seconds' ? { scale: 1 } : undefined}
                transition={{ duration: 0.18 }}
              >
                {String(u.value).padStart(2, '0')}
              </motion.div>
              <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`relative mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t ${darkMode ? 'border-gray-800' : 'border-red-100'}`}>
        <p className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>
          {motivation}
        </p>
        <a
          href={GATE_INFO.datesPage}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-xs font-semibold ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
        >
          Official schedule — gate2027.iitm.ac.in
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}
