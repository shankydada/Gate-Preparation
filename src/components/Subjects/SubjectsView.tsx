import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown,
  Clock, 
  Star,
  CheckCircle2,
  Circle,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Play,
  FileText,
  Wrench,
  Book
} from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { subjects, Resource } from '../../data/gateData';

export default function SubjectsView() {
  const { 
    darkMode, 
    activeSubject, 
    activeSection,
    setActiveSubject,
    setActiveSection,
    isTopicCompleted,
    isTopicBookmarked,
    completeTopic,
    uncompleteTopic,
    toggleBookmark,
    getSubjectProgress
  } = useStore();

  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video': return Play;
      case 'practice': return FileText;
      case 'notes': return Book;
      case 'book': return Book;
      case 'tool': return Wrench;
      default: return ExternalLink;
    }
  };

  const getResourceColor = (type: Resource['type']) => {
    switch (type) {
      case 'video': return 'text-red-500';
      case 'practice': return 'text-green-500';
      case 'notes': return 'text-blue-500';
      case 'book': return 'text-purple-500';
      case 'tool': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            All{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Subjects
            </span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Deep dive into each subject with curated resources and practice materials
          </p>
        </motion.div>

        {/* Subject Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Subject List */}
          <div className="lg:col-span-1 space-y-3">
            {subjects.map((subject, index) => {
              const progress = getSubjectProgress(subject.id);
              const isActive = activeSubject === subject.id;

              return (
                <motion.button
                  key={subject.id}
                  onClick={() => {
                    setActiveSubject(isActive ? null : subject.id);
                    setActiveSection(null);
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    isActive
                      ? `${subject.color} text-white shadow-lg`
                      : darkMode
                      ? 'bg-gray-800/80 hover:bg-gray-800 text-white border border-gray-700'
                      : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <h3 className="font-semibold">{subject.shortName}</h3>
                        <p className={`text-xs ${isActive ? 'text-white/80' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {subject.weightage}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-12 h-1.5 rounded-full ${isActive ? 'bg-white/30' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <motion.div 
                          className={`h-full rounded-full ${isActive ? 'bg-white' : 'bg-green-500'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${isActive ? 'text-white' : ''}`}>
                        {progress}%
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeSubject ? (
                <motion.div
                  key={activeSubject}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {(() => {
                    const subject = subjects.find(s => s.id === activeSubject);
                    if (!subject) return null;

                    return (
                      <>
                        {/* Subject Header */}
                        <div className={`p-6 rounded-2xl ${subject.color} text-white`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-4xl mb-4 block">{subject.icon}</span>
                              <h2 className="text-2xl font-bold mb-2">{subject.name}</h2>
                              <p className="text-white/80">{subject.description}</p>
                            </div>
                            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                              {subject.weightage} weightage
                            </span>
                          </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-4">
                          {subject.sections.map((section) => {
                            const isSectionActive = activeSection === section.id;

                            return (
                              <motion.div
                                key={section.id}
                                className={`rounded-xl overflow-hidden ${
                                  darkMode 
                                    ? 'bg-gray-800/80 border border-gray-700' 
                                    : 'bg-white border border-gray-200 shadow-sm'
                                }`}
                                layout
                              >
                                {/* Section Header */}
                                <button
                                  onClick={() => setActiveSection(isSectionActive ? null : section.id)}
                                  className={`w-full p-4 flex items-center justify-between ${
                                    darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {section.name}
                                  </h3>
                                  <div className="flex items-center gap-4">
                                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {section.topics.length} topics
                                    </span>
                                    <motion.div
                                      animate={{ rotate: isSectionActive ? 180 : 0 }}
                                    >
                                      <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </motion.div>
                                  </div>
                                </button>

                                {/* Topics */}
                                <AnimatePresence>
                                  {isSectionActive && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className={`p-4 pt-0 space-y-3`}>
                                        {section.topics.map((topic) => {
                                          const isCompleted = isTopicCompleted(topic.id);
                                          const isBookmarked = isTopicBookmarked(topic.id);
                                          const isExpanded = expandedTopics.includes(topic.id);

                                          return (
                                            <motion.div
                                              key={topic.id}
                                              className={`rounded-xl ${
                                                darkMode 
                                                  ? 'bg-gray-700/50 border border-gray-600' 
                                                  : 'bg-gray-50 border border-gray-200'
                                              }`}
                                              layout
                                            >
                                              {/* Topic Header */}
                                              <div className="p-4">
                                                <div className="flex items-start gap-4">
                                                  {/* Completion Toggle */}
                                                  <button
                                                    onClick={() => isCompleted ? uncompleteTopic(topic.id) : completeTopic(topic.id)}
                                                    className="mt-1"
                                                  >
                                                    {isCompleted ? (
                                                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                    ) : (
                                                      <Circle className={`w-6 h-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                                    )}
                                                  </button>

                                                  {/* Topic Info */}
                                                  <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                      <div>
                                                        <h4 className={`font-medium ${
                                                          isCompleted 
                                                            ? 'line-through text-gray-500' 
                                                            : darkMode ? 'text-white' : 'text-gray-900'
                                                        }`}>
                                                          {topic.name}
                                                        </h4>
                                                        <div className="flex items-center gap-3 mt-1">
                                                          <span className="flex items-center gap-1">
                                                            {[...Array(topic.importance)].map((_, i) => (
                                                              <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                            ))}
                                                          </span>
                                                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                            <Clock className="w-3 h-3 inline mr-1" />
                                                            {topic.estimatedHours}h
                                                          </span>
                                                        </div>
                                                      </div>

                                                      {/* Actions */}
                                                      <div className="flex items-center gap-2">
                                                        <button
                                                          onClick={() => toggleBookmark(topic.id)}
                                                          className="p-1.5 rounded-lg hover:bg-gray-600/50"
                                                        >
                                                          {isBookmarked ? (
                                                            <BookmarkCheck className="w-5 h-5 text-blue-500" />
                                                          ) : (
                                                            <Bookmark className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                                          )}
                                                        </button>
                                                        <button
                                                          onClick={() => toggleTopicExpand(topic.id)}
                                                          className={`p-1.5 rounded-lg ${
                                                            darkMode ? 'hover:bg-gray-600/50' : 'hover:bg-gray-200'
                                                          }`}
                                                        >
                                                          <motion.div
                                                            animate={{ rotate: isExpanded ? 90 : 0 }}
                                                          >
                                                            <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                                          </motion.div>
                                                        </button>
                                                      </div>
                                                    </div>

                                                    {/* Subtopics Preview */}
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                      {topic.subtopics.slice(0, 3).map((sub, i) => (
                                                        <span
                                                          key={i}
                                                          className={`px-2 py-1 rounded text-xs ${
                                                            darkMode 
                                                              ? 'bg-gray-600/50 text-gray-300' 
                                                              : 'bg-gray-200 text-gray-600'
                                                          }`}
                                                        >
                                                          {sub.length > 30 ? sub.slice(0, 30) + '...' : sub}
                                                        </span>
                                                      ))}
                                                      {topic.subtopics.length > 3 && (
                                                        <span className={`px-2 py-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                          +{topic.subtopics.length - 3} more
                                                        </span>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Expanded Content */}
                                              <AnimatePresence>
                                                {isExpanded && (
                                                  <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className={`border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                                                  >
                                                    <div className="p-4 space-y-4">
                                                      {/* All Subtopics */}
                                                      <div>
                                                        <h5 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                          Topics to Cover:
                                                        </h5>
                                                        <ul className="space-y-1">
                                                          {topic.subtopics.map((sub, i) => (
                                                            <li key={i} className={`text-sm flex items-start gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                              <span className="text-blue-500 mt-1">•</span>
                                                              {sub}
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      </div>

                                                      {/* Resources */}
                                                      <div>
                                                        <h5 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                          Learning Resources:
                                                        </h5>
                                                        <div className="grid sm:grid-cols-2 gap-2">
                                                          {topic.resources.map((resource, i) => {
                                                            const Icon = getResourceIcon(resource.type);
                                                            const color = getResourceColor(resource.type);

                                                            return (
                                                              <motion.a
                                                                key={i}
                                                                href={resource.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`flex items-center gap-3 p-3 rounded-lg ${
                                                                  darkMode 
                                                                    ? 'bg-gray-600/30 hover:bg-gray-600/50' 
                                                                    : 'bg-white hover:bg-gray-100 border border-gray-200'
                                                                } transition-colors`}
                                                                whileHover={{ scale: 1.02 }}
                                                              >
                                                                <Icon className={`w-5 h-5 ${color}`} />
                                                                <div className="flex-1 min-w-0">
                                                                  <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                    {resource.name}
                                                                  </p>
                                                                  <p className={`text-xs capitalize ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                    {resource.type}
                                                                  </p>
                                                                </div>
                                                                <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                                              </motion.a>
                                                            );
                                                          })}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </motion.div>
                                          );
                                        })}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })}
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex flex-col items-center justify-center h-96 rounded-2xl ${
                    darkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                  }`}
                >
                  <span className="text-6xl mb-4">📚</span>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Select a Subject
                  </h3>
                  <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Choose a subject from the left to view its sections and topics
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
