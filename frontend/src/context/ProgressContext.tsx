import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { storage } from "@/src/utils/storage";
import { addDays, toDateKey, todayKey } from "@/src/utils/date";

const STORAGE_KEY = "progress_v1";
export const POINTS_PER_DAY = 10;

export interface CompletedEntry {
  points: number;
  completedAt: string;
}

type CompletedMap = Record<string, CompletedEntry>;

export interface BadgeDef {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
  earned: boolean;
}

interface ProgressContextValue {
  completed: CompletedMap;
  isReady: boolean;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  completedCount: number;
  isCompleted: (dateKey: string) => boolean;
  markComplete: (dateKey: string) => Promise<void>;
  badges: BadgeDef[];
  hasCertificate: boolean;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

function computeCurrentStreak(map: CompletedMap): number {
  let streak = 0;
  let cursor = new Date();
  // If today isn't done yet, start counting from yesterday so streak isn't broken.
  if (!map[toDateKey(cursor)]) {
    cursor = addDays(cursor, -1);
  }
  while (map[toDateKey(cursor)]) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function computeLongestStreak(map: CompletedMap): number {
  const keys = Object.keys(map).sort();
  if (keys.length === 0) return 0;
  let longest = 1;
  let run = 1;
  for (let i = 1; i < keys.length; i++) {
    const prev = new Date(keys[i - 1]);
    const cur = new Date(keys[i]);
    const diff = Math.round((cur.getTime() - prev.getTime()) / 86400000);
    if (diff === 1) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
  }
  return longest;
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<CompletedMap>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await storage.getItem<string>(STORAGE_KEY, "");
      if (raw) {
        try {
          setCompleted(JSON.parse(raw));
        } catch {
          setCompleted({});
        }
      }
      setIsReady(true);
    })();
  }, []);

  const persist = useCallback((map: CompletedMap) => {
    storage.setItem(STORAGE_KEY, JSON.stringify(map));
  }, []);

  const markComplete = useCallback(
    async (dateKey: string) => {
      setCompleted((prev) => {
        if (prev[dateKey]) return prev;
        const next = {
          ...prev,
          [dateKey]: {
            points: POINTS_PER_DAY,
            completedAt: new Date().toISOString(),
          },
        };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const isCompleted = useCallback(
    (dateKey: string) => Boolean(completed[dateKey]),
    [completed],
  );

  const totalPoints = useMemo(
    () => Object.values(completed).reduce((sum, e) => sum + e.points, 0),
    [completed],
  );
  const completedCount = useMemo(() => Object.keys(completed).length, [completed]);
  const currentStreak = useMemo(() => computeCurrentStreak(completed), [completed]);
  const longestStreak = useMemo(() => computeLongestStreak(completed), [completed]);

  const badges = useMemo<BadgeDef[]>(
    () => [
      {
        id: "first",
        titleKey: "badge_first",
        descKey: "badge_first_desc",
        icon: "sunrise",
        earned: completedCount >= 1,
      },
      {
        id: "faithful",
        titleKey: "badge_faithful",
        descKey: "badge_faithful_desc",
        icon: "feather",
        earned: longestStreak >= 3,
      },
      {
        id: "champion",
        titleKey: "badge_champion",
        descKey: "badge_champion_desc",
        icon: "award",
        earned: longestStreak >= 7,
      },
      {
        id: "devoted",
        titleKey: "badge_devoted",
        descKey: "badge_devoted_desc",
        icon: "star",
        earned: completedCount >= 15,
      },
      {
        id: "pillar",
        titleKey: "badge_pillar",
        descKey: "badge_pillar_desc",
        icon: "shield",
        earned: completedCount >= 30,
      },
    ],
    [completedCount, longestStreak],
  );

  const value = useMemo(
    () => ({
      completed,
      isReady,
      totalPoints,
      currentStreak,
      longestStreak,
      completedCount,
      isCompleted,
      markComplete,
      badges,
      hasCertificate: completedCount >= 30,
    }),
    [
      completed,
      isReady,
      totalPoints,
      currentStreak,
      longestStreak,
      completedCount,
      isCompleted,
      markComplete,
      badges,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
