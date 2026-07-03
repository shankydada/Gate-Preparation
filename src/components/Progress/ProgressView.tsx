import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Flame, 
  Target,
  Clock,
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useStore } from '../../store/useStore';
import { subjects, badges } from '../../data/gateData';
import { getRank, getNextRank } from '../../data/ranks';

export default function ProgressView() {
  const { darkMode, user, getProgress, getSubjectProgress, resetProgress } = useStore();

  const totalProgress = getProgress();

  // Calculate estimated time to completion
  const avgTopicsPerDay = 0.5; // Assuming half a topic per day
  const remainingTopics = (() => {
    let total = 0;
    subjects.forEach(s => s.sections.forEach(sec => {
      total += sec.topics.length;
    }));
    return total - user.completedTopics.length;
  })();
  const daysToComplete = Math.ceil(remainingTopics / avgTopicsPerDay);

  return (
    <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Progress
            </span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your journey to GATE mastery
          </p>
        </motion.div>

        {/* Rank Banner */}
        {(() => {
          const rank = getRank(user.level);
          const nextRank = getNextRank(user.level);
          return (
            <motion.div
              className={`mb-12 p-6 rounded-2xl bg-gradient-to-r ${rank.color} relative overflow-hidden`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Animated background icons */}
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-4xl opacity-10"
                  style={{ left: `${i * 22}%`, top: `${(i % 2) * 40}%` }}
                  animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                >
                  {rank.icon}
                </motion.span>
              ))}
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <motion.span
                    className="text-5xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {rank.icon}
                  </motion.span>
                  <div>
                    <p className="text-white/80 text-sm">Your Current Rank</p>
                    <h2 className="text-3xl font-bold text-white">{rank.title}</h2>
                    <p className="text-white/90 text-sm">Level {user.level} • {user.xp} XP</p>
                  </div>
                </div>
                {nextRank && (
                  <div className="text-center sm:text-right bg-white/15 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-white/80 text-xs mb-1">Next Rank</p>
                    <p className="text-white font-bold text-lg">{nextRank.icon} {nextRank.title}</p>
                    <p className="text-white/80 text-xs mt-1">
                      Reach Level {nextRank.minLevel} ({(nextRank.minLevel * 500) - user.xp} XP to go)
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}

        {/* Main Stats */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Overall Progress */}
          <div className={`md:col-span-2 p-8 rounded-2xl ${
            darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center gap-8">
              <div className="w-32 h-32">
                <CircularProgressbar
                  value={totalProgress}
                  text={`${totalProgress}%`}
                  styles={buildStyles({
                    pathColor: `url(#progressGradient)`,
                    textColor: darkMode ? '#fff' : '#1f2937',
                    trailColor: darkMode ? '#374151' : '#e5e7eb',
                    textSize: '20px',
                  })}
                />
                <svg style={{ height: 0 }}>
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Overall Progress
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.completedTopics.length} topics completed
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ~{daysToComplete} days to complete at current pace
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <motion.div
            className={`p-6 rounded-2xl ${
              darkMode ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <Star className="w-8 h-8 text-yellow-500 mb-4" />
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {user.xp}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total XP</p>
            <div className={`mt-4 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(user.xp % 500) / 5}%` }}
              />
            </div>
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {500 - (user.xp % 500)} XP to Level {user.level + 1}
            </p>
          </motion.div>

          <motion.div
            className={`p-6 rounded-2xl ${
              darkMode ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30' : 'bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <Flame className={`w-8 h-8 mb-4 ${user.streak > 0 ? 'text-orange-500' : darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {user.streak}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Day Streak</p>
            <p className={`text-xs mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {user.streak >= 7 ? '🔥 On fire!' : 'Keep it going!'}
            </p>
          </motion.div>
        </motion.div>

        {/* Subject Progress */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Subject Progress
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => {
              const progress = getSubjectProgress(subject.id);
              
              return (
                <motion.div
                  key={subject.id}
                  className={`p-5 rounded-xl ${
                    darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {subject.shortName}
                      </h3>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {subject.weightage}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <motion.div
                      className={`h-full rounded-full ${subject.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-sm font-medium ${
                      progress === 100 ? 'text-green-500' : darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {progress}%
                    </span>
                    {progress === 100 && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Badges */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Achievements
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              {user.earnedBadges.length}/{badges.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {badges.map((badge, index) => {
              const isEarned = user.earnedBadges.includes(badge.id);
              
              return (
                <motion.div
                  key={badge.id}
                  className={`p-4 rounded-xl text-center ${
                    isEarned
                      ? darkMode
                        ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                        : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'
                      : darkMode
                      ? 'bg-gray-800/50 border border-gray-700 opacity-50'
                      : 'bg-gray-100 border border-gray-200 opacity-50'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={isEarned ? { scale: 1.05 } : {}}
                >
                  <span className="text-3xl block mb-2">{badge.icon}</span>
                  <h4 className={`font-medium text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {badge.name}
                  </h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {badge.description}
                  </p>
                  <p className={`text-xs mt-2 font-medium ${isEarned ? 'text-yellow-500' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    +{badge.xpReward} XP
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Level & Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className={`p-8 rounded-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20' 
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Your Stats
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Level {user.level}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Current Level
                </p>
              </div>
              
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <BookOpen className="w-8 h-8 text-green-500 mb-2" />
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.completedTopics.length}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Topics Completed
                </p>
              </div>
              
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <Target className="w-8 h-8 text-blue-500 mb-2" />
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Object.keys(user.quizScores).length}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Quizzes Taken
                </p>
              </div>
              
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <Star className="w-8 h-8 text-purple-500 mb-2" />
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.bookmarkedTopics.length}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Bookmarked
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Reset Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                resetProgress();
              }
            }}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
              darkMode 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
            }`}
          >
            Reset All Progress
          </button>
        </motion.div>
      </div>
    </div>
  );
}
