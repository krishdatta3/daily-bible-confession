// Local daily-reminder notifications (offline, scheduled on-device).
// Works best on a real build; in Expo Go scheduling may be limited.
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import { storage } from "@/src/utils/storage";

export const REMINDER_ENABLED_KEY = "reminder_enabled";
export const REMINDER_TIME_KEY = "reminder_time"; // "HH:MM"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const MESSAGES: Record<string, { title: string; body: string }> = {
  hi: {
    title: "आज का अंगीकार 🙏",
    body: "परमेश्वर के वचन का अंगीकार करने का समय है। आइए विश्वास में बढ़ें।",
  },
  en: {
    title: "Today's Confession 🙏",
    body: "It's time to confess God's Word. Let's grow in faith together.",
  },
};

export async function requestPermission(): Promise<boolean> {
  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted) return true;
  if (!settings.canAskAgain) return false;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

export async function cancelReminder(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // no-op
  }
}

export async function scheduleReminder(
  hour: number,
  minute: number,
  lang: "hi" | "en",
): Promise<boolean> {
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("daily-reminder", {
        name: "Daily Reminder",
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
    await cancelReminder();
    const msg = MESSAGES[lang];
    await Notifications.scheduleNotificationAsync({
      content: { title: msg.title, body: msg.body },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
    return true;
  } catch {
    return false;
  }
}

export async function getReminderState(): Promise<{
  enabled: boolean;
  time: string;
}> {
  const enabled = await storage.getItem<boolean>(REMINDER_ENABLED_KEY, false);
  const time = await storage.getItem<string>(REMINDER_TIME_KEY, "08:00");
  return { enabled: Boolean(enabled), time: time || "08:00" };
}
