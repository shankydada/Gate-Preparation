import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Target, Lightbulb, TrendingUp, Minus, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { dailyTips, motivationalQuotes } from '../../data/gateData';

export default function DailyWidgets() {
  const { darkMode, user, getDailyGoalProgress, setDailyGoal } = useStore();

  const todayTip = useMemo(() => {
    const dayIndex = new Date().getDate() % dailyTips.length;
    return dailyTips[dayIndex];
  }, []);

  const todayQuote = useMemo(() => {
    const dayIndex = new Date().getDate() % motivationalQuotes.length;
    return motivationalQuotes[dayIndex];
  }, []);

  const goalProgress = getDailyGoalProgress();
  const today = new Date().toDateString();
  const completedToday = user.lastTopicDate === today ? user.topicsCompletedToday : 0;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Daily Goal */}
      <motion.div
        className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Today's Goal</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDailyGoal(Math.max(1, user.dailyGoal - 1))}
              className={`p-1.5 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Minus className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <span className={`w-8 text-center font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {user.dailyGoal}
            </span>
            <button
              onClick={() => setDailyGoal(Math.min(10, user.dailyGoal + 1))}
              className={`p-1.5 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Plus className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between mb-2">
          <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {completedToday}<span className={`text-lg ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>/{user.dailyGoal}</span>
          </span>
          <span className={`text-sm font-medium ${goalProgress >= 100 ? 'text-green-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {goalProgress >= 100 ? '🎉 Goal reached!' : 'topics today'}
          </span>
        </div>

        <div className={`h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${goalProgress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Daily Tip */}
      <motion.div
        className={`rounded-2xl p-6 ${
          darkMode
            ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20'
            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'
        }`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className={`p-2.5 rounded-xl ${darkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-5 h-5 text-yellow-500" />
          </motion.div>
          <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tip of the Day</h3>
        </div>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {todayTip}
        </p>
        <div className={`flex items-start gap-2 pt-3 border-t ${darkMode ? 'border-yellow-500/20' : 'border-yellow-200'}`}>
          <TrendingUp className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
          <p className={`text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            "{todayQuote}"
          </p>
        </div>
      </motion.div>
    </div>
  );
}
