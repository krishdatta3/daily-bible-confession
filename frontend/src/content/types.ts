export type ThemeKey =
  | "faith"
  | "blessing"
  | "healing"
  | "protection"
  | "victory"
  | "grace"
  | "love";

export interface Verse {
  ref: { hi: string; en: string };
  hi: string;
  en: string;
}

export interface DayVerse extends Verse {
  theme: ThemeKey;
}

export interface Bilingual {
  hi: string;
  en: string;
}

export interface DayContent {
  verses: DayVerse[];
  confession: Bilingual;
  prayer: Bilingual;
  encouragement: Bilingual;
  special?: Bilingual; // present on curated special days (title)
}
