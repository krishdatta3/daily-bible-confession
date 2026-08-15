import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme, ThemeMode } from "@/src/theme/ThemeContext";
import { useLanguage, Lang } from "@/src/i18n/LanguageContext";
import { fonts, radius, spacing } from "@/src/theme/colors";
import { storage } from "@/src/utils/storage";
import {
  REMINDER_ENABLED_KEY,
  REMINDER_TIME_KEY,
  cancelReminder,
  getReminderState,
  requestPermission,
  scheduleReminder,
} from "@/src/utils/notifications";

const TIME_OPTIONS = ["06:00", "07:00", "08:00", "20:00", "21:00"];

export default function SettingsScreen() {
  const { colors, isDark, mode, setMode } = useTheme();
  const { t, lang, setLang } = useLanguage();
  const insets = useSafeAreaInsets();

  const [reminderOn, setReminderOn] = useState(false);
  const [reminderTime, setReminderTime] = useState("08:00");

  useEffect(() => {
    (async () => {
      const s = await getReminderState();
      setReminderOn(s.enabled);
      setReminderTime(s.time);
    })();
  }, []);

  const applyReminder = async (enabled: boolean, time: string) => {
    const [h, m] = time.split(":").map((x) => parseInt(x, 10));
    if (enabled && Platform.OS !== "web") {
      const ok = await requestPermission();
      if (!ok) {
        setReminderOn(false);
        await storage.setItem(REMINDER_ENABLED_KEY, false);
        return;
      }
      await scheduleReminder(h, m, lang);
    } else if (!enabled) {
      await cancelReminder();
    }
    await storage.setItem(REMINDER_ENABLED_KEY, enabled);
    await storage.setItem(REMINDER_TIME_KEY, time);
  };

  const toggleReminder = async (val: boolean) => {
    Haptics.selectionAsync();
    setReminderOn(val);
    await applyReminder(val, reminderTime);
  };

  const pickTime = async (time: string) => {
    Haptics.selectionAsync();
    setReminderTime(time);
    if (reminderOn) await applyReminder(true, time);
  };

  const langOptions: { key: Lang; label: string }[] = [
    { key: "hi", label: "हिंदी" },
    { key: "en", label: "English" },
  ];
  const themeOptions: { key: ThemeMode; label: string }[] = [
    { key: "light", label: t("theme_light") },
    { key: "dark", label: t("theme_dark") },
    { key: "system", label: t("theme_system") },
  ];

  const Segmented = <T extends string>({
    options,
    value,
    onChange,
    testID,
  }: {
    options: { key: T; label: string }[];
    value: T;
    onChange: (v: T) => void;
    testID: string;
  }) => (
    <View
      testID={testID}
      style={[styles.segment, { backgroundColor: colors.surfaceSecondary }]}
    >
      {options.map((o) => {
        const active = o.key === value;
        return (
          <Pressable
            key={o.key}
            testID={`${testID}-${o.key}`}
            onPress={() => {
              Haptics.selectionAsync();
              onChange(o.key);
            }}
            style={[
              styles.segmentItem,
              active && { backgroundColor: colors.brandPrimary },
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                { color: active ? colors.onBrandPrimary : colors.onSurfaceSecondary },
              ]}
            >
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  const Row = ({ icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
    <View style={styles.rowBlock}>
      <View style={styles.rowHeader}>
        <View style={[styles.rowIcon, { backgroundColor: colors.brandTertiary }]}>
          <Feather name={icon} size={18} color={colors.onBrandTertiary} />
        </View>
        <Text style={[styles.rowTitle, { color: colors.onSurface }]}>{title}</Text>
      </View>
      {children}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + spacing.lg,
          paddingHorizontal: spacing.xl,
          paddingBottom: spacing["2xl"],
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: colors.onSurface }]}>{t("tab_settings")}</Text>

        <Row icon="globe" title={t("language")}>
          <Segmented options={langOptions} value={lang} onChange={setLang} testID="lang-segment" />
        </Row>

        <Row icon="moon" title={t("theme")}>
          <Segmented options={themeOptions} value={mode} onChange={setMode} testID="theme-segment" />
        </Row>

        <Row icon="bell" title={t("daily_reminder")}>
          <View style={[styles.switchRow, { backgroundColor: colors.surfaceSecondary }]}>
            <Text style={[styles.switchLabel, { color: colors.onSurface }]}>
              {t("daily_reminder")}
            </Text>
            <Switch
              testID="reminder-switch"
              value={reminderOn}
              onValueChange={toggleReminder}
              trackColor={{ true: colors.brandPrimary, false: colors.borderStrong }}
              thumbColor="#FFFFFF"
            />
          </View>
          {reminderOn && (
            <View style={styles.timeRow}>
              {TIME_OPTIONS.map((time) => {
                const active = time === reminderTime;
                return (
                  <Pressable
                    key={time}
                    testID={`reminder-time-${time}`}
                    onPress={() => pickTime(time)}
                    style={[
                      styles.timeChip,
                      {
                        backgroundColor: active ? colors.brandPrimary : colors.surfaceSecondary,
                        borderColor: active ? colors.brandPrimary : colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        { color: active ? colors.onBrandPrimary : colors.onSurface },
                      ]}
                    >
                      {time}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
          <Text style={[styles.note, { color: colors.onSurfaceSecondary }]}>
            {t("reminder_note")}
          </Text>
        </Row>

        <Row icon="info" title={t("about")}>
          <View style={[styles.aboutCard, { backgroundColor: colors.surfaceSecondary }]}>
            <Text style={[styles.aboutText, { color: colors.onSurfaceSecondary }]}>
              {t("about_text")}
            </Text>
          </View>
        </Row>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  title: { fontFamily: fonts.displayBold, fontSize: 26, marginBottom: spacing.xl },
  rowBlock: { marginBottom: spacing.xl },
  rowHeader: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTitle: { fontFamily: fonts.textBold, fontSize: 16 },
  segment: {
    flexDirection: "row",
    borderRadius: radius.md,
    padding: 4,
    gap: 4,
  },
  segmentItem: {
    flex: 1,
    height: 44,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentText: { fontFamily: fonts.textMedium, fontSize: 14 },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  switchLabel: { fontFamily: fonts.textMedium, fontSize: 15 },
  timeRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  timeChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  timeText: { fontFamily: fonts.textMedium, fontSize: 14 },
  note: { fontFamily: fonts.textRegular, fontSize: 12, marginTop: spacing.md, lineHeight: 18 },
  aboutCard: { borderRadius: radius.md, padding: spacing.lg },
  aboutText: { fontFamily: fonts.textRegular, fontSize: 14, lineHeight: 22 },
});
