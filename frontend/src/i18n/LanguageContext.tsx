import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { storage } from "@/src/utils/storage";

export type Lang = "hi" | "en";

const STORAGE_KEY = "app_language";

type Dict = Record<string, { hi: string; en: string }>;

const STRINGS: Dict = {
  app_name: { hi: "प्रतिदिन बाइबल अंगीकार", en: "Daily Bible Confession" },
  // Tabs
  tab_today: { hi: "आज", en: "Today" },
  tab_calendar: { hi: "कैलेंडर", en: "Calendar" },
  tab_progress: { hi: "प्रगति", en: "Progress" },
  tab_settings: { hi: "सेटिंग", en: "Settings" },
  // Today
  greeting_morning: { hi: "सुप्रभात", en: "Good Morning" },
  greeting_afternoon: { hi: "नमस्ते", en: "Good Afternoon" },
  greeting_evening: { hi: "शुभ संध्या", en: "Good Evening" },
  todays_confession: { hi: "आज का अंगीकार", en: "Today's Confession" },
  start_confession: { hi: "आज का अंगीकार शुरू करें", en: "Start Today's Confession" },
  reread_confession: { hi: "आज का अंगीकार दोबारा पढ़ें", en: "Re-read Today's Confession" },
  completed_today: { hi: "आज पूरा हुआ", en: "Completed Today" },
  seven_verses_note: { hi: "7 वचन · 1 प्रार्थना · 1 प्रोत्साहन", en: "7 Verses · 1 Prayer · 1 Encouragement" },
  this_week: { hi: "इस सप्ताह", en: "This Week" },
  streak: { hi: "लगातार दिन", en: "Day Streak" },
  faith_points: { hi: "विश्वास अंक", en: "Faith Points" },
  loading_blessing: { hi: "आज की आशीष लोड हो रही है...", en: "Loading today's blessing..." },
  // Reader
  verse_of: { hi: "वचन", en: "Verse" },
  next_verse: { hi: "अगला वचन", en: "Next Verse" },
  begin: { hi: "आरम्भ करें", en: "Begin" },
  amen_continue: { hi: "आमीन · आगे बढ़ें", en: "Amen · Continue" },
  todays_prayer: { hi: "आज की प्रार्थना", en: "Today's Prayer" },
  finish: { hi: "पूरा करें", en: "Complete" },
  declaration: { hi: "अंगीकार", en: "Declaration" },
  // Appreciation
  well_done: { hi: "बहुत अच्छा!", en: "Well Done!" },
  completed_msg: { hi: "आपने आज का अंगीकार पूरा किया।", en: "You have completed today's confession." },
  points_earned: { hi: "विश्वास अंक अर्जित", en: "Faith Points Earned" },
  day_streak_label: { hi: "दिन की लगातार श्रृंखला", en: "Day Streak" },
  badge_earned: { hi: "आज का बैज", en: "Daily Badge" },
  back_home: { hi: "घर वापस जाएँ", en: "Back to Home" },
  // Calendar
  legend_completed: { hi: "पूरा हुआ", en: "Completed" },
  legend_today: { hi: "आज", en: "Today" },
  legend_missed: { hi: "छूट गया", en: "Missed" },
  // Progress
  your_journey: { hi: "आपकी आत्मिक यात्रा", en: "Your Spiritual Journey" },
  total_points: { hi: "कुल विश्वास अंक", en: "Total Faith Points" },
  current_streak: { hi: "वर्तमान श्रृंखला", en: "Current Streak" },
  longest_streak: { hi: "सबसे लंबी श्रृंखला", en: "Longest Streak" },
  days_completed: { hi: "पूरे किए दिन", en: "Days Completed" },
  badges: { hi: "उपलब्धि बैज", en: "Achievement Badges" },
  certificate: { hi: "आत्मिक वृद्धि प्रमाणपत्र", en: "Spiritual Growth Certificate" },
  cert_locked: { hi: "एक माह में 30 दिन पूरे कर के अनलॉक करें", en: "Complete 30 days to unlock" },
  cert_unlocked: { hi: "आपने आत्मिक वृद्धि प्रमाणपत्र अर्जित किया!", en: "You've earned the Spiritual Growth Certificate!" },
  no_badges: { hi: "अभी कोई बैज नहीं। अंगीकार शुरू करें और बैज अनलॉक करें!", en: "No badges yet. Start reading to unlock badges!" },
  locked: { hi: "बंद", en: "Locked" },
  // Settings
  language: { hi: "भाषा", en: "Language" },
  theme: { hi: "थीम", en: "Theme" },
  theme_light: { hi: "उजला", en: "Light" },
  theme_dark: { hi: "गहरा", en: "Dark" },
  theme_system: { hi: "स्वतः", en: "System" },
  daily_reminder: { hi: "दैनिक स्मरण", en: "Daily Reminder" },
  reminder_time: { hi: "स्मरण का समय", en: "Reminder Time" },
  reminder_note: { hi: "यह सुविधा ऐप के बिल्ड होने पर असली फ़ोन पर काम करती है।", en: "This works on a real device after the app is built." },
  about: { hi: "ऐप के बारे में", en: "About" },
  about_text: { hi: "प्रतिदिन परमेश्वर के वचन का अंगीकार करें और विश्वास में बढ़ें।", en: "Confess God's Word daily and grow in faith." },
  // Badge names
  badge_first: { hi: "पहला कदम", en: "First Step" },
  badge_first_desc: { hi: "पहला अंगीकार पूरा किया", en: "Completed your first confession" },
  badge_faithful: { hi: "विश्वासयोग्य", en: "Faithful" },
  badge_faithful_desc: { hi: "लगातार 3 दिन", en: "3 day streak" },
  badge_champion: { hi: "साप्ताहिक विजेता", en: "Weekly Champion" },
  badge_champion_desc: { hi: "लगातार 7 दिन", en: "7 day streak" },
  badge_devoted: { hi: "समर्पित भक्त", en: "Devoted" },
  badge_devoted_desc: { hi: "15 दिन पूरे किए", en: "Completed 15 days" },
  badge_pillar: { hi: "विश्वास का स्तंभ", en: "Pillar of Faith" },
  badge_pillar_desc: { hi: "30 दिन पूरे किए", en: "Completed 30 days" },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof STRINGS) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hi");

  useEffect(() => {
    (async () => {
      const saved = await storage.getItem<string>(STORAGE_KEY, "hi");
      if (saved === "hi" || saved === "en") setLangState(saved);
    })();
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    storage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: keyof typeof STRINGS) => {
      const entry = STRINGS[key];
      if (!entry) return String(key);
      return entry[lang];
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
