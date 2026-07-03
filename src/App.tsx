import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useStore } from './store/useStore';

// Components
import Navbar from './components/Layout/Navbar';
import HeroSection from './components/Home/HeroSection';
import RoadmapView from './components/Roadmap/RoadmapView';
import SubjectsView from './components/Subjects/SubjectsView';
import QuizView from './components/Quiz/QuizView';
import ResourcesView from './components/Resources/ResourcesView';
import ProgressView from './components/Progress/ProgressView';
import WelcomeModal from './components/Welcome/WelcomeModal';
import XPToast from './components/Common/XPToast';

type ViewType = 'home' | 'roadmap' | 'subjects' | 'quiz' | 'resources' | 'progress';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const { showConfetti, darkMode, updateStreak } = useStore();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Track window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update streak on app load
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const navigateTo = (view: string) => {
    setCurrentView(view as ViewType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HeroSection onNavigate={navigateTo} />;
      case 'roadmap':
        return <RoadmapView onNavigate={navigateTo} />;
      case 'subjects':
        return <SubjectsView />;
      case 'quiz':
        return <QuizView />;
      case 'resources':
        return <ResourcesView />;
      case 'progress':
        return <ProgressView />;
      default:
        return <HeroSection onNavigate={navigateTo} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      {/* Welcome Modal for New Users */}
      <WelcomeModal />

      {/* XP Notification Toasts */}
      <XPToast />

      {/* Navigation */}
      <Navbar onNavigate={navigateTo} currentView={currentView} />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    GATE 2027 Mastery
                  </h3>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 max-w-md`}>
                Your comprehensive guide to conquering GATE CSE 2027. 
                500+ video resources, 10,000+ practice questions, and a gamified learning experience.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://gateoverflow.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  GATE Overflow
                </a>
                <a 
                  href="https://www.geeksforgeeks.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  GeeksforGeeks
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { label: 'Roadmap', view: 'roadmap' },
                  { label: 'Subjects', view: 'subjects' },
                  { label: 'Quiz', view: 'quiz' },
                  { label: 'Resources', view: 'resources' },
                ].map(link => (
                  <li key={link.view}>
                    <button
                      onClick={() => navigateTo(link.view)}
                      className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Study Tips */}
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pro Tips 🔥
              </h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>• Study daily, even if just 2-3 hours</li>
                <li>• Solve PYQs from GATE Overflow</li>
                <li>• Take mock tests regularly</li>
                <li>• Focus on high-weightage topics</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                © 2026 GATE 2027 Mastery. Built for GATE aspirants, by GATE aspirants.
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                📚 Made with ❤️ for the GATE community
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
