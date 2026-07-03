import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Trophy,
  RotateCcw,
  Clock,
  Star,
  Zap,
  BookOpen
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { quizzes, subjects, Quiz } from '../../data/gateData';

export default function QuizView() {
  const { darkMode, submitQuiz, getQuizScore, user, addXP, setShowConfetti } = useStore();
  
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  // Get available topics for quiz
  const getTopicsWithQuiz = () => {
    const topicIds = new Set(quizzes.map(q => q.topicId));
    const topicsWithQuiz: { id: string; name: string; subjectName: string; subjectIcon: string }[] = [];

    subjects.forEach(subject => {
      subject.sections.forEach(section => {
        section.topics.forEach(topic => {
          if (topicIds.has(topic.id)) {
            topicsWithQuiz.push({
              id: topic.id,
              name: topic.name,
              subjectName: subject.shortName,
              subjectIcon: subject.icon
            });
          }
        });
      });
    });

    return topicsWithQuiz;
  };

  const topicsWithQuiz = getTopicsWithQuiz();

  // Start quiz
  const startQuiz = (topicId: string) => {
    const topicQuizzes = quizzes.filter(q => q.topicId === topicId);
    if (topicQuizzes.length > 0) {
      setCurrentQuiz(topicQuizzes);
      setSelectedTopic(topicId);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswers({});
      setQuizComplete(false);
      setScore(0);
      setTimeLeft(topicQuizzes.length * 60); // 1 minute per question
      setQuizStarted(true);
    }
  };

  // Start Mixed Challenge - random questions across all topics
  const startMixedChallenge = (difficulty?: 'easy' | 'medium' | 'hard') => {
    let pool = [...quizzes];
    if (difficulty) {
      pool = pool.filter(q => q.difficulty === difficulty);
    }
    // Shuffle and take 10
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 10);
    if (shuffled.length > 0) {
      setCurrentQuiz(shuffled);
      setSelectedTopic('mixed-challenge');
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswers({});
      setQuizComplete(false);
      setScore(0);
      setTimeLeft(shuffled.length * 60);
      setQuizStarted(true);
    }
  };

  // Timer
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizComplete) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, timeLeft, quizComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setAnswers({ ...answers, [currentQuestion]: answerIndex });
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] ?? null);
      setShowResult(answers[currentQuestion + 1] !== undefined);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    currentQuiz.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / currentQuiz.length) * 100);
    setScore(finalScore);
    setQuizComplete(true);
    
    if (selectedTopic === 'mixed-challenge') {
      // Award XP directly for mixed challenges
      const xpGain = finalScore === 100 ? 150 : finalScore >= 80 ? 80 : finalScore >= 60 ? 40 : 15;
      addXP(xpGain);
      if (finalScore === 100) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else if (selectedTopic) {
      submitQuiz(selectedTopic, finalScore);
    }
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setCurrentQuiz([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers({});
    setQuizComplete(false);
    setScore(0);
    setQuizStarted(false);
  };

  const currentQ = currentQuiz[currentQuestion];

  return (
    <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedTopic ? (
            /* Topic Selection */
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Practice{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    Quiz
                  </span>
                </h1>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Test your knowledge on specific topics and earn XP!
                </p>
              </div>

              {/* Stats */}
              <div className={`grid grid-cols-3 gap-4 mb-8 p-6 rounded-2xl ${
                darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-500">{Object.keys(user.quizScores).length}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Quizzes Taken</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-500">
                    {Object.values(user.quizScores).length > 0 
                      ? Math.round(Object.values(user.quizScores).reduce((a, b) => a + b, 0) / Object.values(user.quizScores).length)
                      : 0}%
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-500">
                    {Object.values(user.quizScores).filter(s => s === 100).length}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Perfect Scores</p>
                </div>
              </div>

              {/* Mixed Challenge Section */}
              <div className="mb-8">
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ⚡ Mixed Challenges
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.button
                    onClick={() => startMixedChallenge()}
                    className="p-5 rounded-xl text-left bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg"
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-2xl mb-2 block">🎲</span>
                    <h3 className="font-bold">Random Mix</h3>
                    <p className="text-sm text-white/80">10 random questions</p>
                  </motion.button>

                  <motion.button
                    onClick={() => startMixedChallenge('easy')}
                    className="p-5 rounded-xl text-left bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg"
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-2xl mb-2 block">🟢</span>
                    <h3 className="font-bold">Easy Mode</h3>
                    <p className="text-sm text-white/80">Build confidence</p>
                  </motion.button>

                  <motion.button
                    onClick={() => startMixedChallenge('medium')}
                    className="p-5 rounded-xl text-left bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-lg"
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-2xl mb-2 block">🟡</span>
                    <h3 className="font-bold">Medium Mode</h3>
                    <p className="text-sm text-white/80">Test yourself</p>
                  </motion.button>

                  <motion.button
                    onClick={() => startMixedChallenge('hard')}
                    className="p-5 rounded-xl text-left bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg"
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-2xl mb-2 block">🔴</span>
                    <h3 className="font-bold">Hard Mode</h3>
                    <p className="text-sm text-white/80">Master level</p>
                  </motion.button>
                </div>
              </div>

              {/* Topics Grid */}
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📚 Topic-wise Quizzes
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {topicsWithQuiz.map((topic) => {
                  const previousScore = getQuizScore(topic.id);
                  const topicQuizzes = quizzes.filter(q => q.topicId === topic.id);

                  return (
                    <motion.button
                      key={topic.id}
                      onClick={() => startQuiz(topic.id)}
                      className={`p-6 rounded-xl text-left transition-all ${
                        darkMode 
                          ? 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700' 
                          : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                      }`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{topic.subjectIcon}</span>
                        {previousScore !== null && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            previousScore >= 80 
                              ? 'bg-green-500/20 text-green-500' 
                              : previousScore >= 60 
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}>
                            Best: {previousScore}%
                          </span>
                        )}
                      </div>
                      <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {topic.name}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {topic.subjectName} • {topicQuizzes.length} questions
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          +50-100 XP
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : quizComplete ? (
            /* Results */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.div
                className={`p-8 rounded-3xl ${
                  darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
                }`}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                {/* Score Circle */}
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke={darkMode ? '#374151' : '#e5e7eb'}
                      strokeWidth="12"
                      fill="none"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke={score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444'}
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 440' }}
                      animate={{ strokeDasharray: `${(score / 100) * 440} 440` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                      className={`text-4xl font-bold ${
                        score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: 'spring' }}
                    >
                      {score}%
                    </motion.span>
                  </div>
                </div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  {score === 100 ? (
                    <>
                      <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                      <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Perfect Score! 🎉
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        You mastered this topic! +100 XP earned
                      </p>
                    </>
                  ) : score >= 80 ? (
                    <>
                      <Star className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Excellent! 🌟
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Great job! +50 XP earned
                      </p>
                    </>
                  ) : score >= 60 ? (
                    <>
                      <BookOpen className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                      <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Good Effort! 📚
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Keep practicing! +25 XP earned
                      </p>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Keep Learning! 💪
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Review the topic and try again
                      </p>
                    </>
                  )}
                </motion.div>

                {/* Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-4 mt-8 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <p className="text-2xl font-bold text-green-500">
                      {Object.values(answers).filter((a, i) => a === currentQuiz[i]?.correctAnswer).length}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Correct</p>
                  </div>
                  <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <p className="text-2xl font-bold text-red-500">
                      {currentQuiz.length - Object.values(answers).filter((a, i) => a === currentQuiz[i]?.correctAnswer).length}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wrong</p>
                  </div>
                  <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <p className="text-2xl font-bold text-blue-500">{currentQuiz.length}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total</p>
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div 
                  className="flex gap-4 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <motion.button
                    onClick={() => selectedTopic === 'mixed-challenge' ? startMixedChallenge() : startQuiz(selectedTopic!)}
                    className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
                      darkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    Retry
                  </motion.button>
                  <motion.button
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    More Quizzes
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            /* Quiz Questions */
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className={`flex items-center justify-between mb-6 p-4 rounded-xl ${
                darkMode ? 'bg-gray-800/80' : 'bg-white shadow-sm'
              }`}>
                <button
                  onClick={resetQuiz}
                  className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  ← Back to Topics
                </button>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                    timeLeft < 60 
                      ? 'bg-red-500/20 text-red-500' 
                      : darkMode 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    <Clock className="w-4 h-4" />
                    {formatTime(timeLeft)}
                  </div>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentQuestion + 1}/{currentQuiz.length}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className={`w-full h-2 rounded-full mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / currentQuiz.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              {currentQ && (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-8 rounded-2xl ${
                    darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentQ.difficulty === 'easy' 
                        ? 'bg-green-500/20 text-green-500'
                        : currentQ.difficulty === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {currentQ.difficulty}
                    </span>
                  </div>

                  <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentQ.question}
                  </h2>

                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = showResult && index === currentQ.correctAnswer;
                      const isWrong = showResult && isSelected && index !== currentQ.correctAnswer;

                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          disabled={showResult}
                          className={`w-full p-4 rounded-xl text-left flex items-center gap-4 transition-all ${
                            isCorrect
                              ? 'bg-green-500/20 border-2 border-green-500'
                              : isWrong
                              ? 'bg-red-500/20 border-2 border-red-500'
                              : isSelected
                              ? darkMode
                                ? 'bg-blue-500/20 border-2 border-blue-500'
                                : 'bg-blue-50 border-2 border-blue-500'
                              : darkMode
                              ? 'bg-gray-700/50 border-2 border-transparent hover:border-gray-600'
                              : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                          }`}
                          whileHover={!showResult ? { scale: 1.01 } : {}}
                          whileTap={!showResult ? { scale: 0.99 } : {}}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            isCorrect
                              ? 'bg-green-500 text-white'
                              : isWrong
                              ? 'bg-red-500 text-white'
                              : isSelected
                              ? 'bg-blue-500 text-white'
                              : darkMode
                              ? 'bg-gray-600 text-gray-300'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className={`flex-1 ${
                            isCorrect || isWrong
                              ? isCorrect ? 'text-green-500' : 'text-red-500'
                              : darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {option}
                          </span>
                          {showResult && isCorrect && (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          )}
                          {showResult && isWrong && (
                            <XCircle className="w-6 h-6 text-red-500" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`mt-6 p-4 rounded-xl ${
                          darkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                        }`}
                      >
                        <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                          <strong>Explanation:</strong> {currentQ.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Next Button */}
                  {showResult && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleNext}
                      className="w-full mt-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {currentQuestion === currentQuiz.length - 1 ? 'See Results' : 'Next Question'}
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
