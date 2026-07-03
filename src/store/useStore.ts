import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { badges, subjects } from '../data/gateData';

interface UserProgress {
  completedTopics: string[];
  quizScores: { [quizId: string]: number };
  xp: number;
  level: number;
  streak: number;
  lastStudyDate: string | null;
  earnedBadges: string[];
  bookmarkedTopics: string[];
  currentPhase: number;
  totalStudyTime: number; // in minutes
  dailyChallengeDate: string | null;
  dailyChallengeScore: number;
  dailyGoal: number; // topics per day goal
  topicsCompletedToday: number;
  lastTopicDate: string | null;
  totalQuizzesTaken: number;
  perfectQuizzes: number;
  visitedPYQs: string[];
}

interface AppState {
  user: UserProgress;
  activeSubject: string | null;
  activeSection: string | null;
  activeTopic: string | null;
  showConfetti: boolean;
  darkMode: boolean;
  
  // Actions
  setActiveSubject: (id: string | null) => void;
  setActiveSection: (id: string | null) => void;
  setActiveTopic: (id: string | null) => void;
  completeTopic: (topicId: string) => void;
  uncompleteTopic: (topicId: string) => void;
  submitQuiz: (quizId: string, score: number) => void;
  toggleBookmark: (topicId: string) => void;
  updateStreak: () => void;
  addXP: (amount: number) => void;
  setShowConfetti: (show: boolean) => void;
  toggleDarkMode: () => void;
  addStudyTime: (minutes: number) => void;
  setCurrentPhase: (phase: number) => void;
  resetProgress: () => void;
  completeDailyChallenge: (score: number) => void;
  setDailyGoal: (goal: number) => void;
  visitPYQ: (paperId: string) => void;
  
  // Computed
  getProgress: () => number;
  getSubjectProgress: (subjectId: string) => number;
  isTopicCompleted: (topicId: string) => boolean;
  isTopicBookmarked: (topicId: string) => boolean;
  getQuizScore: (quizId: string) => number | null;
  checkAndAwardBadges: () => string[];
  isDailyChallengeAvailable: () => boolean;
  getDailyGoalProgress: () => number;
}

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 500) + 1;
};

const initialUserState: UserProgress = {
  completedTopics: [],
  quizScores: {},
  xp: 0,
  level: 1,
  streak: 0,
  lastStudyDate: null,
  earnedBadges: [],
  bookmarkedTopics: [],
  currentPhase: 1,
  totalStudyTime: 0,
  dailyChallengeDate: null,
  dailyChallengeScore: 0,
  dailyGoal: 2,
  topicsCompletedToday: 0,
  lastTopicDate: null,
  totalQuizzesTaken: 0,
  perfectQuizzes: 0,
  visitedPYQs: []
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: initialUserState,
      activeSubject: null,
      activeSection: null,
      activeTopic: null,
      showConfetti: false,
      darkMode: true,

      setActiveSubject: (id) => set({ activeSubject: id, activeSection: null, activeTopic: null }),
      setActiveSection: (id) => set({ activeSection: id, activeTopic: null }),
      setActiveTopic: (id) => set({ activeTopic: id }),

      completeTopic: (topicId) => {
        const state = get();
        if (!state.user.completedTopics.includes(topicId)) {
          const newXP = state.user.xp + 50;
          const today = new Date().toDateString();
          const isSameDay = state.user.lastTopicDate === today;
          set({
            user: {
              ...state.user,
              completedTopics: [...state.user.completedTopics, topicId],
              xp: newXP,
              level: calculateLevel(newXP),
              topicsCompletedToday: isSameDay ? state.user.topicsCompletedToday + 1 : 1,
              lastTopicDate: today
            }
          });
          get().updateStreak();
          get().checkAndAwardBadges();
        }
      },

      uncompleteTopic: (topicId) => {
        set((state) => ({
          user: {
            ...state.user,
            completedTopics: state.user.completedTopics.filter(id => id !== topicId)
          }
        }));
      },

      submitQuiz: (quizId, score) => {
        const state = get();
        const isNewHighScore = !state.user.quizScores[quizId] || state.user.quizScores[quizId] < score;
        const xpGain = score === 100 ? 100 : score >= 80 ? 50 : score >= 60 ? 25 : 10;
        
        const isFirstAttempt = !state.user.quizScores[quizId];
        if (isNewHighScore) {
          const newXP = state.user.xp + xpGain;
          set({
            user: {
              ...state.user,
              quizScores: { ...state.user.quizScores, [quizId]: score },
              xp: newXP,
              level: calculateLevel(newXP),
              totalQuizzesTaken: isFirstAttempt ? state.user.totalQuizzesTaken + 1 : state.user.totalQuizzesTaken,
              perfectQuizzes: score === 100 && (state.user.quizScores[quizId] ?? 0) < 100 
                ? state.user.perfectQuizzes + 1 
                : state.user.perfectQuizzes
            }
          });
          
          if (score === 100) {
            set({ showConfetti: true });
            setTimeout(() => set({ showConfetti: false }), 3000);
          }
          
          get().updateStreak();
          get().checkAndAwardBadges();
        }
      },

      toggleBookmark: (topicId) => {
        set((state) => ({
          user: {
            ...state.user,
            bookmarkedTopics: state.user.bookmarkedTopics.includes(topicId)
              ? state.user.bookmarkedTopics.filter(id => id !== topicId)
              : [...state.user.bookmarkedTopics, topicId]
          }
        }));
      },

      updateStreak: () => {
        const today = new Date().toDateString();
        const state = get();
        const lastDate = state.user.lastStudyDate;

        if (lastDate === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const newStreak = lastDate === yesterday.toDateString() 
          ? state.user.streak + 1 
          : 1;

        set({
          user: {
            ...state.user,
            streak: newStreak,
            lastStudyDate: today
          }
        });
      },

      addXP: (amount) => {
        set((state) => {
          const newXP = state.user.xp + amount;
          return {
            user: {
              ...state.user,
              xp: newXP,
              level: calculateLevel(newXP)
            }
          };
        });
      },

      setShowConfetti: (show) => set({ showConfetti: show }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      addStudyTime: (minutes) => {
        set((state) => ({
          user: {
            ...state.user,
            totalStudyTime: state.user.totalStudyTime + minutes
          }
        }));
      },

      setCurrentPhase: (phase) => {
        set((state) => ({
          user: {
            ...state.user,
            currentPhase: phase
          }
        }));
      },

      resetProgress: () => {
        set({ user: initialUserState });
      },

      completeDailyChallenge: (score) => {
        const state = get();
        const today = new Date().toDateString();
        if (state.user.dailyChallengeDate === today) return;
        
        const xpGain = 100 + Math.round(score); // Bonus XP for daily challenge
        const newXP = state.user.xp + xpGain;
        set({
          user: {
            ...state.user,
            dailyChallengeDate: today,
            dailyChallengeScore: score,
            xp: newXP,
            level: calculateLevel(newXP)
          }
        });
        get().updateStreak();
        
        if (score === 100) {
          set({ showConfetti: true });
          setTimeout(() => set({ showConfetti: false }), 3000);
        }
        get().checkAndAwardBadges();
      },

      setDailyGoal: (goal) => {
        set((state) => ({
          user: { ...state.user, dailyGoal: goal }
        }));
      },

      visitPYQ: (paperId) => {
        const state = get();
        if (!state.user.visitedPYQs.includes(paperId)) {
          const newXP = state.user.xp + 20;
          set({
            user: {
              ...state.user,
              visitedPYQs: [...state.user.visitedPYQs, paperId],
              xp: newXP,
              level: calculateLevel(newXP)
            }
          });
          get().updateStreak();
        }
      },

      isDailyChallengeAvailable: () => {
        const today = new Date().toDateString();
        return get().user.dailyChallengeDate !== today;
      },

      getDailyGoalProgress: () => {
        const state = get();
        const today = new Date().toDateString();
        const completedToday = state.user.lastTopicDate === today ? state.user.topicsCompletedToday : 0;
        return Math.min(100, Math.round((completedToday / state.user.dailyGoal) * 100));
      },

      getProgress: () => {
        const state = get();
        let totalTopics = 0;
        subjects.forEach(subject => {
          subject.sections.forEach(section => {
            totalTopics += section.topics.length;
          });
        });
        return totalTopics > 0 
          ? Math.round((state.user.completedTopics.length / totalTopics) * 100) 
          : 0;
      },

      getSubjectProgress: (subjectId) => {
        const state = get();
        const subject = subjects.find(s => s.id === subjectId);
        if (!subject) return 0;

        let total = 0;
        let completed = 0;
        subject.sections.forEach(section => {
          section.topics.forEach(topic => {
            total++;
            if (state.user.completedTopics.includes(topic.id)) {
              completed++;
            }
          });
        });

        return total > 0 ? Math.round((completed / total) * 100) : 0;
      },

      isTopicCompleted: (topicId) => get().user.completedTopics.includes(topicId),

      isTopicBookmarked: (topicId) => get().user.bookmarkedTopics.includes(topicId),

      getQuizScore: (quizId) => get().user.quizScores[quizId] ?? null,

      checkAndAwardBadges: () => {
        const state = get();
        const newBadges: string[] = [];

        badges.forEach(badge => {
          if (state.user.earnedBadges.includes(badge.id)) return;

          let earned = false;

          switch (badge.requirement) {
            case 'complete_1_topic':
              earned = state.user.completedTopics.length >= 1;
              break;
            case 'perfect_quiz':
              earned = Object.values(state.user.quizScores).some(score => score === 100);
              break;
            case '7_day_streak':
              earned = state.user.streak >= 7;
              break;
            case '30_day_streak':
              earned = state.user.streak >= 30;
              break;
            case '50_percent':
              earned = state.getProgress() >= 50;
              break;
            case '100_percent':
              earned = state.getProgress() >= 100;
              break;
            case '10_quiz_streak':
              const scores = Object.values(state.user.quizScores);
              let streak = 0;
              for (const score of scores) {
                if (score >= 60) streak++;
                else streak = 0;
                if (streak >= 10) break;
              }
              earned = streak >= 10;
              break;
            case 'daily_challenge':
              earned = state.user.dailyChallengeDate !== null;
              break;
            case '10_quizzes':
              earned = state.user.totalQuizzesTaken >= 10;
              break;
            case '25_quizzes':
              earned = state.user.totalQuizzesTaken >= 25;
              break;
            case '5_pyqs':
              earned = state.user.visitedPYQs.length >= 5;
              break;
            case 'level_5':
              earned = state.user.level >= 5;
              break;
            case 'level_10':
              earned = state.user.level >= 10;
              break;
            case '25_topics':
              earned = state.user.completedTopics.length >= 25;
              break;
            case '14_day_streak':
              earned = state.user.streak >= 14;
              break;
            case '5_perfect':
              earned = state.user.perfectQuizzes >= 5;
              break;
          }

          if (earned) {
            newBadges.push(badge.id);
          }
        });

        if (newBadges.length > 0) {
          set({
            user: {
              ...state.user,
              earnedBadges: [...state.user.earnedBadges, ...newBadges]
            },
            showConfetti: true
          });
          setTimeout(() => set({ showConfetti: false }), 3000);
        }

        return newBadges;
      }
    }),
    {
      name: 'gate-mastery-storage',
      partialize: (state) => ({ 
        user: state.user, 
        darkMode: state.darkMode 
      })
    }
  )
);
