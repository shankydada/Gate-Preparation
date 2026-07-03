import { motion } from 'framer-motion';
import { 
  Rocket, 
  BookOpen, 
  Trophy, 
  Users, 
  Clock, 
  Star,
  ChevronRight,
  Play
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import DailyChallenge from './DailyChallenge';
import DailyWidgets from './DailyWidgets';
import AnimatedCounter from '../Common/AnimatedCounter';

interface HeroSectionProps {
  onNavigate: (view: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { darkMode, getProgress, user } = useStore();

  const stats = [
    { label: 'Topics Covered', value: 200, suffix: '+', icon: BookOpen },
    { label: 'Video Resources', value: 500, suffix: '+', icon: Play },
    { label: 'Practice Questions', value: 10000, suffix: '+', icon: Star },
    { label: 'Success Rate', value: 95, suffix: '%', icon: Trophy },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`} />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        {/* Grid Pattern */}
        <div className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`} 
          style={{
            backgroundImage: `linear-gradient(${darkMode ? '#fff' : '#000'} 1px, transparent 1px),
                              linear-gradient(90deg, ${darkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                darkMode 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                <Rocket className="w-4 h-4" />
                GATE 2027 Preparation Starts Here
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Master{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                GATE CSE
              </span>
              {' '}with the Ultimate{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  Roadmap
                </span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <motion.path
                    d="M0,6 Q50,0 100,6 T200,6"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className={`text-lg sm:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Comprehensive 18-month preparation plan with 500+ video lectures, 
              10,000+ practice questions, gamified learning, and expert-curated resources. 
              Your journey to AIR 1 starts now!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => onNavigate('roadmap')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => onNavigate('subjects')}
                className={`px-8 py-4 font-semibold rounded-xl border-2 flex items-center gap-2 ${
                  darkMode 
                    ? 'border-gray-700 text-white hover:bg-gray-800' 
                    : 'border-gray-300 text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-5 h-5" />
                Explore Subjects
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="flex flex-wrap gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Users className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>50,000+</strong> aspirants
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>18 months</strong> to GATE 2027
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Main Card */}
            <div className={`relative p-8 rounded-3xl ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                : 'bg-white border border-gray-200 shadow-2xl'
            }`}>
              {/* Progress Ring */}
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke={darkMode ? '#374151' : '#e5e7eb'}
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 553' }}
                      animate={{ strokeDasharray: `${(getProgress() / 100) * 553} 553` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                      className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: 'spring' }}
                    >
                      {getProgress()}%
                    </motion.span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Complete
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Topics Done', value: user.completedTopics.length, color: 'text-green-500' },
                  { label: 'XP Earned', value: user.xp, color: 'text-yellow-500' },
                  { label: 'Day Streak', value: user.streak, color: 'text-orange-500' },
                  { label: 'Badges', value: user.earnedBadges.length, color: 'text-purple-500' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Daily Challenge */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <DailyChallenge />
        </motion.div>

        {/* Daily Widgets */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <DailyWidgets />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl ${
            darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-4 p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <stat.icon className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
