import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { storage } from "@/src/utils/storage";
import { todayKey } from "@/src/utils/date";

const STORAGE_KEY = "journal_v1";

export type JournalType = "prayer" | "thanks";

export interface JournalEntry {
  id: string;
  dateKey: string;
  type: JournalType;
  text: string;
  createdAt: string;
}

interface JournalContextValue {
  entries: JournalEntry[];
  isReady: boolean;
  addEntry: (type: JournalType, text: string) => void;
  updateEntry: (id: string, text: string, type: JournalType) => void;
  deleteEntry: (id: string) => void;
}

const JournalContext = createContext<JournalContextValue | undefined>(undefined);

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await storage.getItem<string>(STORAGE_KEY, "");
      if (raw) {
        try {
          setEntries(JSON.parse(raw));
        } catch {
          setEntries([]);
        }
      }
      setIsReady(true);
    })();
  }, []);

  const persist = useCallback((list: JournalEntry[]) => {
    storage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, []);

  const addEntry = useCallback(
    (type: JournalType, text: string) => {
      setEntries((prev) => {
        const next: JournalEntry[] = [
          {
            id: genId(),
            dateKey: todayKey(),
            type,
            text: text.trim(),
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ];
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const updateEntry = useCallback(
    (id: string, text: string, type: JournalType) => {
      setEntries((prev) => {
        const next = prev.map((e) =>
          e.id === id ? { ...e, text: text.trim(), type } : e,
        );
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const deleteEntry = useCallback(
    (id: string) => {
      setEntries((prev) => {
        const next = prev.filter((e) => e.id !== id);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const value = useMemo(
    () => ({ entries, isReady, addEntry, updateEntry, deleteEntry }),
    [entries, isReady, addEntry, updateEntry, deleteEntry],
  );

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
}

export function useJournal(): JournalContextValue {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used within JournalProvider");
  return ctx;
}
