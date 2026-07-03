import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Star, 
  Moon, 
  Sun, 
  Menu, 
  X,
  BookOpen,
  Target
} from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { getRank } from '../../data/ranks';

interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const { user, darkMode, toggleDarkMode, getProgress } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const rank = getRank(user.level);

  const navItems = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'roadmap', label: 'Roadmap', icon: Target },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: Star },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: Trophy },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-[8px] font-bold text-white">27</span>
              </motion.div>
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                GATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Mastery</span>
              </h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your path to success</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-gray-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center gap-4">
            {/* Rank & Level */}
            <motion.div 
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${rank.color}`}
              whileHover={{ scale: 1.05 }}
              title={`${rank.title} • Level ${user.level}`}
            >
              <span className="text-base">{rank.icon}</span>
              <span className="text-sm font-semibold text-white">
                Lvl {user.level}
              </span>
              <span className="text-xs text-white/80">
                {user.xp} XP
              </span>
            </motion.div>

            {/* Streak */}
            <motion.div 
              className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
              whileHover={{ scale: 1.05 }}
            >
              <Flame className={`w-4 h-4 ${user.streak > 0 ? 'text-orange-500' : darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {user.streak}
              </span>
            </motion.div>

            {/* Progress */}
            <motion.div 
              className="hidden lg:flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-20 h-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgress()}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {getProgress()}%
              </span>
            </motion.div>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-500' : 'bg-gray-100 text-gray-600'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              ) : (
                <Menu className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-gray-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </motion.button>
            ))}

            {/* Mobile Stats */}
            <div className={`flex items-center justify-around pt-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Lvl {user.level}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className={`w-5 h-5 ${user.streak > 0 ? 'text-orange-500' : 'text-gray-500'}`} />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.streak} day streak
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
