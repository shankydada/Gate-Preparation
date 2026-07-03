import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Star, Target, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

export default function WelcomeModal() {
  const { darkMode, user } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Show welcome modal only for new users
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome && user.completedTopics.length === 0) {
      setIsOpen(true);
    }
  }, [user.completedTopics.length]);

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
  };

  const steps = [
    {
      icon: Rocket,
      title: "Welcome to GATE 2027 Mastery! 🎉",
      description: "Your comprehensive platform for conquering GATE CSE 2027. Let's take a quick tour!",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Follow the Roadmap",
      description: "We've created an 18-month structured plan covering all 11 subjects. Follow the phases to stay on track.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Star,
      title: "Earn XP & Badges",
      description: "Complete topics, take quizzes, and maintain streaks to earn XP. Level up and unlock achievements!",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Trophy,
      title: "Track Your Progress",
      description: "Monitor your progress across all subjects. Your journey to AIR 1 starts now! 🚀",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const step = steps[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full max-w-lg rounded-3xl overflow-hidden ${
              darkMode ? 'bg-gray-900' : 'bg-white'
            }`}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className={`absolute top-4 right-4 p-2 rounded-full z-10 ${
                darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className={`p-8 bg-gradient-to-r ${step.color}`}>
              <motion.div
                key={currentStep}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center"
              >
                <step.icon className="w-10 h-10 text-white" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className={`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {step.title}
                </h2>
                <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.description}
                </p>
              </motion.div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentStep
                        ? 'bg-blue-500 w-8'
                        : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8">
                {currentStep > 0 && (
                  <motion.button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className={`flex-1 py-3 rounded-xl font-medium ${
                      darkMode 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                )}
                <motion.button
                  onClick={() => {
                    if (currentStep < steps.length - 1) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      handleClose();
                    }
                  }}
                  className={`flex-1 py-3 rounded-xl font-medium text-white bg-gradient-to-r ${step.color}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentStep < steps.length - 1 ? 'Next' : "Let's Go! 🚀"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
