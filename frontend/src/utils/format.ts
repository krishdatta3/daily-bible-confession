import { Lang } from "@/src/i18n/LanguageContext";

const MONTHS: Record<Lang, string[]> = {
  hi: [
    "जनवरी",
    "फ़रवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितंबर",
    "अक्टूबर",
    "नवंबर",
    "दिसंबर",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const WEEKDAYS_SHORT: Record<Lang, string[]> = {
  hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const WEEKDAYS_LONG: Record<Lang, string[]> = {
  hi: [
    "रविवार",
    "सोमवार",
    "मंगलवार",
    "बुधवार",
    "गुरुवार",
    "शुक्रवार",
    "शनिवार",
  ],
  en: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

export function monthName(month: number, lang: Lang): string {
  return MONTHS[lang][month];
}

export function weekdayShort(lang: Lang): string[] {
  return WEEKDAYS_SHORT[lang];
}

export function formatLongDate(d: Date, lang: Lang): string {
  const wd = WEEKDAYS_LONG[lang][d.getDay()];
  const m = MONTHS[lang][d.getMonth()];
  if (lang === "hi") {
    return `${wd}, ${d.getDate()} ${m} ${d.getFullYear()}`;
  }
  return `${wd}, ${m} ${d.getDate()}, ${d.getFullYear()}`;
}

export function formatMonthYear(d: Date, lang: Lang): string {
  return `${MONTHS[lang][d.getMonth()]} ${d.getFullYear()}`;
}
