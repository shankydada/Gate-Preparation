import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Swords, CheckCircle2, XCircle, Sparkles, Clock, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { quizzes } from '../../data/gateData';

export default function DailyChallenge() {
  const { darkMode, user, isDailyChallengeAvailable, completeDailyChallenge } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const available = isDailyChallengeAvailable();

  // Deterministic daily set of 5 questions based on date
  const dailyQuestions = useMemo(() => {
    const seed = new Date().toDateString().split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const shuffled = [...quizzes].sort((a, b) => {
      const ha = (a.id.charCodeAt(1) * seed) % 97;
      const hb = (b.id.charCodeAt(1) * seed) % 97;
      return ha - hb;
    });
    return shuffled.slice(0, 5);
  }, []);

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setAnswers({ ...answers, [currentQ]: idx });
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQ < dailyQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      let correct = 0;
      dailyQuestions.forEach((q, i) => {
        if (answers[i] === q.correctAnswer) correct++;
      });
      const score = Math.round((correct / dailyQuestions.length) * 100);
      setFinalScore(score);
      setCompleted(true);
      completeDailyChallenge(score);
    }
  };

  const reset = () => {
    setIsOpen(false);
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setShowResult(false);
    setCompleted(false);
  };

  const q = dailyQuestions[currentQ];

  return (
    <>
      {/* Challenge Card */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl p-6 ${
          available
            ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500'
            : darkMode
            ? 'bg-gray-800/80 border border-gray-700'
            : 'bg-white border border-gray-200 shadow-lg'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Animated sparkles background */}
        {available && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotate: [0, 180] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-white/40" />
              </motion.div>
            ))}
          </>
        )}

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className={`p-3 rounded-xl ${available ? 'bg-white/20' : darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              animate={available ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Swords className={`w-7 h-7 ${available ? 'text-white' : darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </motion.div>
            <div>
              <h3 className={`text-lg font-bold ${available ? 'text-white' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                Daily Challenge
              </h3>
              <p className={`text-sm ${available ? 'text-white/80' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {available ? '5 questions • +100 bonus XP' : `Completed! Score: ${user.dailyChallengeScore}%`}
              </p>
            </div>
          </div>

          {available ? (
            <motion.button
              onClick={() => setIsOpen(true)}
              className="px-5 py-2.5 bg-white text-purple-600 font-semibold rounded-xl flex items-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-4 h-4" />
              Start
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                Done
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Challenge Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={reset} />

            <motion.div
              className={`relative w-full max-w-lg rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {!completed ? (
                <>
                  {/* Header */}
                  <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Swords className="w-5 h-5" />
                        <span className="font-semibold">Daily Challenge</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{currentQ + 1}/{dailyQuestions.length}</span>
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-white/20 rounded-full">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        animate={{ width: `${((currentQ + 1) / dailyQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  {q && (
                    <div className="p-6">
                      <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {q.question}
                      </h3>
                      <div className="space-y-3">
                        {q.options.map((opt, i) => {
                          const isCorrect = showResult && i === q.correctAnswer;
                          const isWrong = showResult && selected === i && i !== q.correctAnswer;
                          return (
                            <motion.button
                              key={i}
                              onClick={() => handleAnswer(i)}
                              disabled={showResult}
                              className={`w-full p-3.5 rounded-xl text-left flex items-center gap-3 transition-all ${
                                isCorrect
                                  ? 'bg-green-500/20 border-2 border-green-500'
                                  : isWrong
                                  ? 'bg-red-500/20 border-2 border-red-500'
                                  : darkMode
                                  ? 'bg-gray-800 border-2 border-transparent hover:border-gray-600'
                                  : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                              }`}
                              whileHover={!showResult ? { scale: 1.01 } : {}}
                            >
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                                isCorrect ? 'bg-green-500 text-white' : isWrong ? 'bg-red-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                              }`}>
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span className={`flex-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{opt}</span>
                              {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                              {isWrong && <XCircle className="w-5 h-5 text-red-500" />}
                            </motion.button>
                          );
                        })}
                      </div>

                      {showResult && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-4 p-3 rounded-xl text-sm ${darkMode ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                          {q.explanation}
                        </motion.div>
                      )}

                      {showResult && (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={handleNext}
                          className="w-full mt-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl"
                        >
                          {currentQ === dailyQuestions.length - 1 ? 'Finish Challenge' : 'Next'}
                        </motion.button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                /* Results */
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring' }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
                  >
                    <Swords className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Challenge Complete! 🎉
                  </h2>
                  <p className={`text-4xl font-bold my-4 ${finalScore >= 80 ? 'text-green-500' : finalScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {finalScore}%
                  </p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    +{100 + finalScore} XP earned!
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-6`}>
                    Come back tomorrow for a new challenge!
                  </p>
                  <motion.button
                    onClick={reset}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Awesome!
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
