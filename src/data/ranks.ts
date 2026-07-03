// Rank system based on user level

export interface Rank {
  minLevel: number;
  title: string;
  icon: string;
  color: string;
}

export const ranks: Rank[] = [
  { minLevel: 1, title: "Novice", icon: "🌱", color: "from-gray-400 to-gray-500" },
  { minLevel: 3, title: "Apprentice", icon: "📖", color: "from-green-400 to-green-500" },
  { minLevel: 5, title: "Scholar", icon: "🎓", color: "from-blue-400 to-blue-500" },
  { minLevel: 8, title: "Expert", icon: "⚡", color: "from-cyan-400 to-cyan-500" },
  { minLevel: 12, title: "Master", icon: "🏆", color: "from-purple-400 to-purple-500" },
  { minLevel: 16, title: "Grandmaster", icon: "👑", color: "from-yellow-400 to-orange-500" },
  { minLevel: 20, title: "GATE Legend", icon: "🔥", color: "from-red-500 to-pink-600" },
];

export function getRank(level: number): Rank {
  let rank = ranks[0];
  for (const r of ranks) {
    if (level >= r.minLevel) {
      rank = r;
    }
  }
  return rank;
}

export function getNextRank(level: number): Rank | null {
  for (const r of ranks) {
    if (r.minLevel > level) {
      return r;
    }
  }
  return null;
}
