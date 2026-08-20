import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Activity } from 'lucide-react';
import { useStore } from '../../store/useStore';

const WEEKS = 20; // show last ~5 months

export default function StudyHeatmap() {
  const { darkMode, user, getMinutesStudiedToday } = useStore();

  const { weeks, totalMinutes, bestDay, activeDays } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Start from Monday of (WEEKS-1) weeks ago
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay() + 1 - (WEEKS - 1) * 7); // Monday

    const weeks: { date: Date; minutes: number; key: string }[][] = [];
    let total = 0;
    let best = { key: '', minutes: 0 };
    let active = 0;

    for (let w = 0; w < WEEKS; w++) {
      const week: { date: Date; minutes: number; key: string }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(start);
        date.setDate(start.getDate() + w * 7 + d);
        const key = date.toISOString().slice(0, 10);
        const minutes = user.studyLog[key] || 0;
        week.push({ date, minutes, key });
        total += minutes;
        if (minutes > 0) active++;
        if (minutes > best.minutes) best = { key, minutes };
      }
      weeks.push(week);
    }
    return { weeks, totalMinutes: total, bestDay: best, activeDays: active };
  }, [user.studyLog]);

  const colorFor = (minutes: number): string => {
    if (minutes <= 0) return darkMode ? 'bg-gray-800' : 'bg-gray-100';
    if (minutes < 30) return 'bg-emerald-900';
    if (minutes < 60) return 'bg-emerald-700';
    if (minutes < 120) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  const todayKey = new Date().toISOString().slice(0, 10);
  const minutesToday = getMinutesStudiedToday();

  return (
    <motion.section
      className={`mb-12 p-6 rounded-2xl ${
        darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15">
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Study Heatmap</h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Minutes logged with the Focus Timer — every green square is a day you didn't break the chain
            </p>
          </div>
        </div>
        <div className="flex gap-4 text-center">
          <div>
            <p className={`text-lg font-bold text-emerald-500`}>{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</p>
            <p className={`text-[10px] uppercase ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>total logged</p>
          </div>
          <div>
            <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activeDays}</p>
            <p className={`text-[10px] uppercase ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>active days</p>
          </div>
          <div>
            <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bestDay.minutes}m</p>
            <p className={`text-[10px] uppercase ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>best day</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day) => {
                const isToday = day.key === todayKey;
                const isFuture = day.date.getTime() > Date.now();
                return (
                  <motion.div
                    key={day.key}
                    className={`w-3.5 h-3.5 rounded-[4px] ${isFuture ? 'opacity-20 ' : ''}${colorFor(day.minutes)} ${
                      isToday ? 'ring-1 ring-emerald-400' : ''
                    }`}
                    title={`${day.date.toDateString()} — ${day.minutes} min`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: wi * 0.01 + (day.date.getDay() % 7) * 0.005 }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1.5 mt-3">
          <span className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Less</span>
          {['bg-gray-100 dark:bg-gray-800', 'bg-emerald-900', 'bg-emerald-700', 'bg-emerald-500', 'bg-emerald-400'].map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-[3px] ${i === 0 ? (darkMode ? 'bg-gray-800' : 'bg-gray-100') : c}`} />
          ))}
          <span className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>More</span>
        </div>
      </div>

      {minutesToday === 0 && (
        <p className={`mt-3 text-sm font-medium ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
          ⚠️ Today's square is still empty — run one 25-min Focus Session to light it up!
        </p>
      )}
    </motion.section>
  );
}
