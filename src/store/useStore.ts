import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { badges, subjects, dailyQuestPool, seedPosts, DailyQuestTemplate } from '../data/gateData';

export interface CommunityReply {
  id: string;
  author: string;
  avatar: string;
  text: string;
  upvotes: number;
  createdAt: number;
  mine?: boolean;
  upvoted?: boolean;
}

export interface CommunityPost {
  id: string;
  title: string;
  body: string;
  category: string;
  author: string;
  avatar: string;
  upvotes: number;
  createdAt: number;
  replies: CommunityReply[];
  mine?: boolean;
  upvoted?: boolean;
}

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
  // --- daily-habit & engagement fields ---
  studyLog: { [dateKey: string]: number }; // minutes studied per day (YYYY-MM-DD)
  focusSessions: number;
  questsDoneToday: string[];
  questsDate: string | null;
  questsCompletedTotal: number;
  postsCreated: number;
  repliesCreated: number;
  displayName: string | null;
}

interface AppState {
  user: UserProgress;
  activeSubject: string | null;
  activeSection: string | null;
  activeTopic: string | null;
  showConfetti: boolean;
  darkMode: boolean;
  communityPosts: CommunityPost[];

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
  logFocusSession: (minutes: number) => void;
  setCurrentPhase: (phase: number) => void;
  resetProgress: () => void;
  completeDailyChallenge: (score: number) => void;
  setDailyGoal: (goal: number) => void;
  visitPYQ: (paperId: string) => void;
  completeQuest: (questId: string) => void;

  // Community
  addCommunityPost: (title: string, body: string, category: string) => void;
  addCommunityReply: (postId: string, text: string) => void;
  togglePostUpvote: (postId: string) => void;
  toggleReplyUpvote: (postId: string, replyId: string) => void;

  // Computed
  getProgress: () => number;
  getSubjectProgress: (subjectId: string) => number;
  isTopicCompleted: (topicId: string) => boolean;
  isTopicBookmarked: (topicId: string) => boolean;
  getQuizScore: (quizId: string) => number | null;
  checkAndAwardBadges: () => string[];
  isDailyChallengeAvailable: () => boolean;
  getDailyGoalProgress: () => number;
  getDailyQuests: () => DailyQuestTemplate[];
  isQuestDone: (questId: string) => boolean;
  getMinutesStudiedToday: () => number;
}

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 500) + 1;
};

const dateKey = (d: Date = new Date()): string => d.toISOString().slice(0, 10);

const ANIMALS = ['🦉', '🐯', '🦊', '🐼', '🦅', '🐺', '🦈', '🐨', '🦁', '🐸', '🦜', '🐳'];
const NICKS = ['Aspirant', 'Coder', 'Riser', 'Ninja', 'Scholar', 'Warrior', 'Dreamer', 'Achiever'];

const genDisplayName = (): string => {
  const nick = NICKS[Math.floor(Math.random() * NICKS.length)];
  return `${nick}_${Math.floor(1000 + Math.random() * 9000)}`;
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
  visitedPYQs: [],
  studyLog: {},
  focusSessions: 0,
  questsDoneToday: [],
  questsDate: null,
  questsCompletedTotal: 0,
  postsCreated: 0,
  repliesCreated: 0,
  displayName: null
};

// Hydrate seed community threads with runtime timestamps
const hydrateSeedPosts = (): CommunityPost[] => {
  const now = Date.now();
  return seedPosts.map((p, i) => ({
    id: `seed-${i}`,
    title: p.title,
    body: p.body,
    category: p.category,
    author: p.author,
    avatar: p.avatar,
    upvotes: p.upvotes,
    createdAt: now - p.offsetDays * 86400000,
    replies: p.replies.map((r, j) => ({
      id: `seed-${i}-r${j}`,
      author: r.author,
      avatar: r.avatar,
      text: r.text,
      upvotes: r.upvotes,
      createdAt: now - r.offsetHours * 3600000
    }))
  }));
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
      communityPosts: hydrateSeedPosts(),

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
          // auto-complete topic quests
          const newDone = get().user.topicsCompletedToday;
          get().getDailyQuests().forEach(q => {
            if (q.type === 'topic') {
              const need = q.id === 'q_topic2' ? 2 : 1;
              if (newDone >= need && !get().isQuestDone(q.id)) get().completeQuest(q.id);
            }
          });
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
          if (score >= 60) {
            get().getDailyQuests().forEach(q => {
              if (q.type === 'quiz' && !get().isQuestDone(q.id)) get().completeQuest(q.id);
            });
          }
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
        // bookmark quest auto-check
        if (get().user.bookmarkedTopics.length >= 2) {
          get().getDailyQuests().forEach(q => {
            if (q.type === 'bookmark' && !get().isQuestDone(q.id)) get().completeQuest(q.id);
          });
        }
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
        const key = dateKey();
        set((state) => ({
          user: {
            ...state.user,
            totalStudyTime: state.user.totalStudyTime + minutes,
            studyLog: {
              ...state.user.studyLog,
              [key]: (state.user.studyLog[key] || 0) + minutes
            }
          }
        }));
        get().checkAndAwardBadges();
      },

      logFocusSession: (minutes) => {
        set((state) => ({
          user: {
            ...state.user,
            focusSessions: state.user.focusSessions + 1
          }
        }));
        get().addStudyTime(minutes);
        get().addXP(Math.max(5, Math.round(minutes / 5) * 5));
        get().updateStreak();
        get().checkAndAwardBadges();
        get().getDailyQuests().forEach(q => {
          if (q.type === 'focus' && !get().isQuestDone(q.id)) get().completeQuest(q.id);
        });
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
        get().getDailyQuests().forEach(q => {
          if (q.type === 'challenge' && !get().isQuestDone(q.id)) get().completeQuest(q.id);
        });
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
          get().getDailyQuests().forEach(q => {
            if (q.type === 'pyq' && !get().isQuestDone(q.id)) get().completeQuest(q.id);
          });
        }
      },

      // ---------- Daily Quests ----------
      getDailyQuests: () => {
        // Deterministic 3 quests per calendar day
        const today = new Date().toDateString();
        const seed = today.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
        const indices = new Set<number>();
        let s = seed >>> 0;
        let attempts = 0;
        while (indices.size < 3 && attempts < 64) {
          indices.add(s % dailyQuestPool.length);
          s = (s * 1103515245 + 12345) >>> 0;
          attempts++;
        }
        // Fallback safety: fill sequentially if RNG collided heavily
        for (let i = 0; indices.size < 3 && i < dailyQuestPool.length; i++) indices.add(i);
        return [...indices].map(i => dailyQuestPool[i]);
      },

      isQuestDone: (questId) => {
        const state = get();
        const today = new Date().toDateString();
        return state.user.questsDate === today && state.user.questsDoneToday.includes(questId);
      },

      completeQuest: (questId) => {
        const state = get();
        const today = new Date().toDateString();
        const quest = dailyQuestPool.find(q => q.id === questId);
        if (!quest) return;
        if (state.user.questsDate === today && state.user.questsDoneToday.includes(questId)) return;

        const doneToday = state.user.questsDate === today ? state.user.questsDoneToday : [];
        const newXP = state.user.xp + quest.xp;
        set({
          user: {
            ...state.user,
            questsDate: today,
            questsDoneToday: [...doneToday, questId],
            questsCompletedTotal: state.user.questsCompletedTotal + 1,
            xp: newXP,
            level: calculateLevel(newXP)
          }
        });
        get().updateStreak();
        get().checkAndAwardBadges();
      },

      getMinutesStudiedToday: () => {
        return get().user.studyLog[dateKey()] || 0;
      },

      // ---------- Community ----------
      addCommunityPost: (title, body, category) => {
        const state = get();
        const displayName = state.user.displayName || genDisplayName();
        const avatar = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
        const post: CommunityPost = {
          id: `user-${Date.now()}`,
          title,
          body,
          category,
          author: displayName,
          avatar,
          upvotes: 1,
          createdAt: Date.now(),
          replies: [],
          mine: true,
          upvoted: true
        };
        const newXP = state.user.xp + 25;
        set({
          communityPosts: [post, ...state.communityPosts],
          user: {
            ...state.user,
            displayName,
            postsCreated: state.user.postsCreated + 1,
            xp: newXP,
            level: calculateLevel(newXP)
          }
        });
        get().updateStreak();
        get().checkAndAwardBadges();
        get().getDailyQuests().forEach(q => {
          if (q.type === 'community' && !get().isQuestDone(q.id)) get().completeQuest(q.id);
        });
      },

      addCommunityReply: (postId, text) => {
        const state = get();
        const displayName = state.user.displayName || genDisplayName();
        const avatar = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
        const reply: CommunityReply = {
          id: `reply-${Date.now()}`,
          author: displayName,
          avatar,
          text,
          upvotes: 1,
          createdAt: Date.now(),
          mine: true,
          upvoted: true
        };
        const newXP = state.user.xp + 15;
        set({
          communityPosts: state.communityPosts.map(p =>
            p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
          ),
          user: {
            ...state.user,
            displayName,
            repliesCreated: state.user.repliesCreated + 1,
            xp: newXP,
            level: calculateLevel(newXP)
          }
        });
        get().updateStreak();
        get().checkAndAwardBadges();
        get().getDailyQuests().forEach(q => {
          if (q.type === 'community' && !get().isQuestDone(q.id)) get().completeQuest(q.id);
        });
      },

      togglePostUpvote: (postId) => {
        set((state) => ({
          communityPosts: state.communityPosts.map(p =>
            p.id === postId
              ? { ...p, upvoted: !p.upvoted, upvotes: p.upvotes + (p.upvoted ? -1 : 1) }
              : p
          )
        }));
      },

      toggleReplyUpvote: (postId, replyId) => {
        set((state) => ({
          communityPosts: state.communityPosts.map(p =>
            p.id === postId
              ? {
                  ...p,
                  replies: p.replies.map(r =>
                    r.id === replyId
                      ? { ...r, upvoted: !r.upvoted, upvotes: r.upvotes + (r.upvoted ? -1 : 1) }
                      : r
                  )
                }
              : p
          )
        }));
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
            case 'first_post':
              earned = state.user.postsCreated >= 1;
              break;
            case '5_replies':
              earned = state.user.repliesCreated >= 5;
              break;
            case '5_focus_sessions':
              earned = state.user.focusSessions >= 5;
              break;
            case '10_quests':
              earned = state.user.questsCompletedTotal >= 10;
              break;
            case '1200_minutes':
              earned = state.user.totalStudyTime >= 1200;
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
      version: 2,
      migrate: (persisted: unknown) => {
        // Backfill new user fields for existing users
        const persistedState = persisted as { user?: Partial<UserProgress> } | undefined;
        if (persistedState && persistedState.user) {
          persistedState.user = { ...initialUserState, ...persistedState.user };
        }
        return persistedState as AppState;
      },
      partialize: (state) => ({
        user: state.user,
        darkMode: state.darkMode,
        communityPosts: state.communityPosts
      })
    }
  )
);
