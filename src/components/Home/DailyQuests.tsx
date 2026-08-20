import { motion } from 'framer-motion';
import { Map, CheckCircle2, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface DailyQuestsProps {
  onNavigate?: (view: string) => void;
}

export default function DailyQuests({ onNavigate }: DailyQuestsProps) {
  const { darkMode, getDailyQuests, isQuestDone, user } = useStore();
  const quests = getDailyQuests();
  const doneCount = quests.filter(q => isQuestDone(q.id)).length;
  const allDone = doneCount === quests.length;

  return (
    <motion.div
      className={`rounded-2xl p-6 ${
        darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2.5 rounded-xl bg-indigo-500/15"
            animate={allDone ? {} : { rotate: [0, -6, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Map className="w-5 h-5 text-indigo-500" />
          </motion.div>
          <div>
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Today's Quests</h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              New quests every day — finish all 3 to protect your streak
            </p>
          </div>
        </div>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
          allDone ? 'bg-green-500/15 text-green-500' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          {doneCount}/{quests.length} {allDone && '🎉'}
        </span>
      </div>

      {/* Progress bar */}
      <div className={`h-2 rounded-full mb-5 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${(doneCount / quests.length) * 100}%` }}
          transition={{ duration: 0.7 }}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {quests.map((quest, i) => {
          const done = isQuestDone(quest.id);
          return (
            <motion.div
              key={quest.id}
              className={`relative p-4 rounded-xl transition-all ${
                done
                  ? darkMode
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-green-50 border border-green-200'
                  : darkMode
                  ? 'bg-gray-700/40 border border-gray-600 hover:border-indigo-500/50'
                  : 'bg-gray-50 border border-gray-200 hover:border-indigo-300'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{quest.icon}</span>
                {done ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </motion.div>
                ) : (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500">
                    +{quest.xp} XP
                  </span>
                )}
              </div>
              <h4 className={`text-sm font-bold mb-1 ${
                done ? (darkMode ? 'text-green-400' : 'text-green-700') : darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {quest.title}
              </h4>
              <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {quest.description}
              </p>
              {!done && quest.actionView && onNavigate && (
                <button
                  onClick={() => onNavigate(quest.actionView!)}
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                  }`}
                >
                  Do it now <ChevronRight className="w-3 h-3" />
                </button>
              )}
              {done && (
                <span className="text-xs font-semibold text-green-500">Completed — XP banked!</span>
              )}
            </motion.div>
          );
        })}
      </div>

      {allDone && (
        <motion.p
          className={`mt-4 text-center text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          All quests done for today — {user.questsCompletedTotal} quests conquered lifetime. See you tomorrow, warrior! ⚔️
        </motion.p>
      )}
    </motion.div>
  );
}
