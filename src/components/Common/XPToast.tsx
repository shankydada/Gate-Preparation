import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Star, Trophy, TrendingUp } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Toast {
  id: number;
  type: 'xp' | 'level' | 'badge';
  message: string;
  value?: number;
}

export default function XPToast() {
  const { user, darkMode } = useStore();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const prevXP = useRef(user.xp);
  const prevLevel = useRef(user.level);
  const prevBadges = useRef(user.earnedBadges.length);
  const toastId = useRef(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip notifications on first render (page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevXP.current = user.xp;
      prevLevel.current = user.level;
      prevBadges.current = user.earnedBadges.length;
      return;
    }

    const newToasts: Toast[] = [];

    // Level up
    if (user.level > prevLevel.current) {
      newToasts.push({
        id: toastId.current++,
        type: 'level',
        message: `Level Up! You're now Level ${user.level}`,
      });
    }

    // Badge earned
    if (user.earnedBadges.length > prevBadges.current) {
      newToasts.push({
        id: toastId.current++,
        type: 'badge',
        message: 'New Achievement Unlocked!',
      });
    }

    // XP gained (only if no level up to avoid clutter)
    if (user.xp > prevXP.current && user.level === prevLevel.current) {
      newToasts.push({
        id: toastId.current++,
        type: 'xp',
        message: 'XP Earned',
        value: user.xp - prevXP.current,
      });
    }

    if (newToasts.length > 0) {
      setToasts((prev) => [...prev, ...newToasts]);
      newToasts.forEach((toast) => {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, 3000);
      });
    }

    prevXP.current = user.xp;
    prevLevel.current = user.level;
    prevBadges.current = user.earnedBadges.length;
  }, [user.xp, user.level, user.earnedBadges.length]);

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl ${
              toast.type === 'level'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                : toast.type === 'badge'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                : darkMode
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <motion.div
              animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {toast.type === 'level' ? (
                <TrendingUp className="w-6 h-6 text-white" />
              ) : toast.type === 'badge' ? (
                <Trophy className="w-6 h-6 text-white" />
              ) : (
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              )}
            </motion.div>
            <div>
              <p className={`text-sm font-semibold ${
                toast.type === 'xp' && !darkMode ? 'text-gray-900' : 'text-white'
              } ${toast.type === 'xp' && darkMode ? 'text-white' : ''}`}>
                {toast.message}
                {toast.value && (
                  <span className="ml-1 text-yellow-500 font-bold">+{toast.value}</span>
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
