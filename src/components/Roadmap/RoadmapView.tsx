import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  ChevronRight,
  Star,
  Zap
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { phases } from '../../data/gateData';

interface RoadmapViewProps {
  onNavigate: (view: string) => void;
}

export default function RoadmapView({ onNavigate }: RoadmapViewProps) {
  const { darkMode, user, setCurrentPhase } = useStore();

  const getCurrentPhaseIndex = () => {
    // Simple calculation based on progress
    const progress = user.completedTopics.length;
    if (progress < 30) return 0;
    if (progress < 60) return 1;
    if (progress < 80) return 2;
    if (progress < 95) return 3;
    return 4;
  };

  const currentPhaseIndex = getCurrentPhaseIndex();

  return (
    <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your 18-Month{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Roadmap
            </span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            A structured path from beginner to GATE-ready. Follow the phases, complete topics, 
            and track your progress towards success.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-1 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-200'
          } transform md:-translate-x-1/2`}>
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"
              initial={{ height: 0 }}
              animate={{ height: `${(currentPhaseIndex + 1) * 20}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          {/* Phase Cards */}
          <div className="space-y-12">
            {phases.map((phase, index) => {
              const isComplete = index < currentPhaseIndex;
              const isCurrent = index === currentPhaseIndex;
              const isLocked = index > currentPhaseIndex;

              return (
                <motion.div
                  key={phase.id}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1">
                    <motion.div
                      className={`w-8 h-8 rounded-full border-4 ${
                        isComplete
                          ? 'bg-green-500 border-green-500'
                          : isCurrent
                          ? `bg-gradient-to-br ${phase.color} border-transparent`
                          : darkMode
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-white border-gray-300'
                      } flex items-center justify-center`}
                      animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : isCurrent ? (
                        <Zap className="w-4 h-4 text-white" />
                      ) : (
                        <Circle className={`w-4 h-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      )}
                    </motion.div>
                  </div>

                  {/* Empty Space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Phase Card */}
                  <motion.div
                    className={`ml-20 md:ml-0 md:w-1/2 p-6 rounded-2xl ${
                      isLocked
                        ? darkMode
                          ? 'bg-gray-900/50 border border-gray-800 opacity-50'
                          : 'bg-gray-100 border border-gray-200 opacity-50'
                        : darkMode
                        ? 'bg-gray-800/80 border border-gray-700'
                        : 'bg-white border border-gray-200 shadow-lg'
                    } ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}
                    whileHover={!isLocked ? { scale: 1.02, y: -5 } : {}}
                  >
                    {/* Phase Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                          isCurrent
                            ? `bg-gradient-to-r ${phase.color} text-white`
                            : darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {isCurrent && <Star className="w-3 h-3" />}
                          Phase {phase.id}
                        </span>
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {phase.name}
                        </h3>
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Clock className="w-4 h-4" />
                        {phase.duration}
                      </div>
                    </div>

                    {/* Phase Description */}
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {phase.description}
                    </p>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {phase.subjects.slice(0, 5).map((subject, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded-lg text-xs ${
                            darkMode
                              ? 'bg-gray-700/50 text-gray-300'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {subject}
                        </span>
                      ))}
                      {phase.subjects.length > 5 && (
                        <span className={`px-2 py-1 rounded-lg text-xs ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          +{phase.subjects.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Timeline */}
                    <div className={`flex items-center justify-between pt-4 border-t ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <span className={`text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {phase.months}
                      </span>
                      {!isLocked && (
                        <motion.button
                          onClick={() => {
                            setCurrentPhase(phase.id);
                            onNavigate('subjects');
                          }}
                          className={`flex items-center gap-1 text-sm font-medium ${
                            isCurrent
                              ? 'text-blue-500'
                              : darkMode
                              ? 'text-gray-400 hover:text-white'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          {isCurrent ? 'Continue Learning' : 'Review'}
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Tips */}
        <motion.div
          className={`mt-20 p-8 rounded-2xl ${
            darkMode
              ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20'
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            🎯 Golden Rules for Success
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '📚', tip: 'Consistency > Intensity — Study daily, even if just 2-3 hours' },
              { icon: '📝', tip: 'PYQs are KING — Solve 25+ years of previous questions' },
              { icon: '🎯', tip: "Don't skip General Aptitude — 15 free marks!" },
              { icon: '🔄', tip: 'Revise regularly — Forgetting curve is real' },
              { icon: '📊', tip: 'Mock tests from Month 7 — Build exam temperament' },
              { icon: '💪', tip: 'Stay positive — GATE is a marathon, not a sprint' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`p-4 rounded-xl ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <span className="text-2xl mr-3">{item.icon}</span>
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {item.tip}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            onClick={() => onNavigate('subjects')}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-5 h-5" />
            Start Learning Now
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
