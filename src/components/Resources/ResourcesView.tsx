import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  ExternalLink, 
  PlayCircle, 
  BookOpen, 
  Globe, 
  Star,
  ChevronRight,
  FileText,
  ClipboardList,
  Calculator,
  Lock,
  Unlock,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { 
  youtubeChannels, 
  essentialTools, 
  books, 
  pyqPapers, 
  mockTests, 
  formulaSheets 
} from '../../data/gateData';

type TabType = 'channels' | 'tools' | 'books' | 'pyqs' | 'mocks' | 'formulas';

export default function ResourcesView() {
  const { darkMode, user, visitPYQ } = useStore();
  const [activeTab, setActiveTab] = useState<TabType>('channels');
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'channels', label: 'YouTube', icon: PlayCircle },
    { id: 'tools', label: 'Tools', icon: Globe },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'pyqs', label: 'PYQs', icon: FileText },
    { id: 'mocks', label: 'Mock Tests', icon: ClipboardList },
    { id: 'formulas', label: 'Formula Sheets', icon: Calculator },
  ];

  return (
    <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Essential{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Resources
            </span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Everything you need — videos, PYQs, mock tests, formula sheets, tools, and books
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* YouTube Channels */}
          {activeTab === 'channels' && (
            <motion.div
              key="channels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {youtubeChannels.map((channel, index) => (
                <motion.a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-5 rounded-xl transition-all ${
                    darkMode 
                      ? 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {[...Array(channel.importance)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {channel.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {channel.specialty}
                  </p>
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Tools */}
          {activeTab === 'tools' && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {essentialTools.map((tool, index) => (
                  <motion.a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-5 rounded-xl transition-all ${
                      darkMode 
                        ? 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700' 
                        : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {[...Array(tool.importance)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {tool.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {tool.purpose}
                    </p>
                  </motion.a>
                ))}
              </div>

              <motion.div
                className={`mt-6 p-6 rounded-xl ${
                  darkMode 
                    ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20' 
                    : 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className={`text-lg font-medium ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  🔥 Pro Tip: Bookmark <strong>gateoverflow.in</strong> — every PYQ is discussed with 
                  community explanations. Spend 2-3 hours daily on it!
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Books */}
          {activeTab === 'books' && (
            <motion.div
              key="books"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {books.map((book, index) => (
                <motion.a
                  key={book.name}
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-5 rounded-xl flex items-center gap-4 transition-all ${
                    darkMode 
                      ? 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
                  }`}>
                    <BookOpen className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {book.subject}
                    </span>
                    <h3 className={`font-semibold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {book.name}
                    </h3>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* PYQs */}
          {activeTab === 'pyqs' && (
            <motion.div
              key="pyqs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
              }`}>
                <FileText className="w-6 h-6 text-blue-500" />
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  <strong>PYQs are KING!</strong> Solve 25+ years of previous questions. 
                  Click to open each paper on GATE Overflow (+20 XP per paper explored).
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pyqPapers.map((paper, index) => {
                  const paperId = `${paper.year}${paper.set || ''}`;
                  const isVisited = user.visitedPYQs.includes(paperId);

                  return (
                    <motion.a
                      key={paperId}
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => visitPYQ(paperId)}
                      className={`p-5 rounded-xl transition-all relative ${
                        isVisited
                          ? darkMode
                            ? 'bg-green-500/10 border border-green-500/30'
                            : 'bg-green-50 border border-green-200'
                          : darkMode
                          ? 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700'
                          : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                    >
                      {isVisited && (
                        <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-green-500" />
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                          darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {String(paper.year).slice(2)}
                        </div>
                        <div>
                          <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            GATE {paper.year}
                          </h3>
                          {paper.set && (
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {paper.set}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {paper.questions} questions
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-500 font-medium">
                          +20 XP
                        </span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Mock Tests */}
          {activeTab === 'mocks' && (
            <motion.div
              key="mocks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {mockTests.map((test, index) => (
                <motion.a
                  key={test.id}
                  href={test.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-5 rounded-xl transition-all ${
                    darkMode 
                      ? 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                      test.free 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-orange-500/20 text-orange-500'
                    }`}>
                      {test.free ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      {test.free ? 'Free' : 'Paid'}
                    </span>
                  </div>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {test.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    by {test.provider} • {test.type} tests
                  </p>
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Formula Sheets */}
          {activeTab === 'formulas' && (
            <motion.div
              key="formulas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {formulaSheets.map((sheet, index) => {
                const isExpanded = expandedFormula === sheet.id;
                return (
                  <motion.div
                    key={sheet.id}
                    className={`rounded-xl overflow-hidden ${
                      darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <button
                      onClick={() => setExpandedFormula(isExpanded ? null : sheet.id)}
                      className={`w-full p-5 flex items-center justify-between ${
                        darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{sheet.icon}</span>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {sheet.subject}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {sheet.formulas.length} formulas
                        </span>
                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                          <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 space-y-3">
                            {sheet.formulas.map((f, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                              >
                                <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                  {f.name}
                                </p>
                                <p className={`text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {f.formula}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Links */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={`p-8 rounded-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20' 
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              📚 Quick Practice Links
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'GATE Overflow PYQs', url: 'https://gateoverflow.in/gate', color: 'from-blue-500 to-cyan-500' },
                { name: 'LeetCode Problems', url: 'https://leetcode.com/problemset/', color: 'from-orange-500 to-red-500' },
                { name: 'HackerRank SQL', url: 'https://www.hackerrank.com/domains/sql', color: 'from-green-500 to-emerald-500' },
                { name: 'VisuAlgo', url: 'https://visualgo.net/en', color: 'from-purple-500 to-pink-500' },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl bg-gradient-to-r ${link.color} text-white font-medium text-center shadow-lg`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
