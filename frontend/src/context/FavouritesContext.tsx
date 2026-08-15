import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { storage } from "@/src/utils/storage";
import { DayVerse } from "@/src/content/types";

const STORAGE_KEY = "favourites_v1";

export interface FavVerse {
  id: string;
  ref: { hi: string; en: string };
  hi: string;
  en: string;
  theme: DayVerse["theme"];
}

interface FavContextValue {
  favourites: FavVerse[];
  isReady: boolean;
  isFav: (id: string) => boolean;
  toggleFav: (verse: DayVerse) => boolean; // returns new state (true = added)
  removeFav: (id: string) => void;
}

const FavContext = createContext<FavContextValue | undefined>(undefined);

export function favId(verse: { ref: { en: string }; en: string }): string {
  return `${verse.ref.en}|${verse.en.slice(0, 24)}`;
}

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = useState<FavVerse[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await storage.getItem<string>(STORAGE_KEY, "");
      if (raw) {
        try {
          setFavourites(JSON.parse(raw));
        } catch {
          setFavourites([]);
        }
      }
      setIsReady(true);
    })();
  }, []);

  const persist = useCallback((list: FavVerse[]) => {
    storage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, []);

  const isFav = useCallback(
    (id: string) => favourites.some((f) => f.id === id),
    [favourites],
  );

  const toggleFav = useCallback(
    (verse: DayVerse) => {
      const id = favId(verse);
      let added = false;
      setFavourites((prev) => {
        if (prev.some((f) => f.id === id)) {
          const next = prev.filter((f) => f.id !== id);
          persist(next);
          return next;
        }
        added = true;
        const next: FavVerse[] = [
          { id, ref: verse.ref, hi: verse.hi, en: verse.en, theme: verse.theme },
          ...prev,
        ];
        persist(next);
        return next;
      });
      return added;
    },
    [persist],
  );

  const removeFav = useCallback(
    (id: string) => {
      setFavourites((prev) => {
        const next = prev.filter((f) => f.id !== id);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const value = useMemo(
    () => ({ favourites, isReady, isFav, toggleFav, removeFav }),
    [favourites, isReady, isFav, toggleFav, removeFav],
  );

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export function useFavourites(): FavContextValue {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
}
