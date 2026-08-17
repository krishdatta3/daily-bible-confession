import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/theme/ThemeContext";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { useProgress } from "@/src/context/ProgressContext";
import { fonts, radius, spacing } from "@/src/theme/colors";
import { IMAGES } from "@/src/theme/images";
import { addDays, todayKey, toDateKey } from "@/src/utils/date";
import { formatLongDate, weekdayShort } from "@/src/utils/format";

export default function TodayScreen() {
  const { colors, isDark } = useTheme();
  const { t, lang } = useLanguage();
  const { isCompleted, currentStreak, totalPoints } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const today = new Date();
  const key = todayKey();
  const doneToday = isCompleted(key);

  const hour = today.getHours();
  const greetingKey =
    hour < 12 ? "greeting_morning" : hour < 17 ? "greeting_afternoon" : "greeting_evening";

  // last 7 days (oldest -> today)
  const week = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  const wd = weekdayShort(lang);

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
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.greeting, { color: colors.onSurfaceSecondary }]}>
              {t(greetingKey)}
            </Text>
            <Text style={[styles.date, { color: colors.onSurface }]}>
              {formatLongDate(today, lang)}
            </Text>
          </View>
          <Pressable
            testID="open-favourites-button"
            onPress={() => {
              Haptics.selectionAsync();
              router.push("/favourites");
            }}
            style={[styles.favBtn, { backgroundColor: colors.surfaceSecondary }]}
          >
            <Feather name="bookmark" size={22} color={colors.brandPrimary} />
          </Pressable>
        </View>

        {/* Hero card */}
        <View style={[styles.hero, { borderColor: colors.border }]} testID="today-hero-card">
          <Image
            source={{ uri: IMAGES.homeHero }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={400}
          />
          <LinearGradient
            colors={["rgba(28,25,23,0.1)", "rgba(28,25,23,0.55)", "rgba(28,25,23,0.9)"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroContent}>
            {doneToday && (
              <View style={[styles.doneChip, { backgroundColor: colors.brandPrimary }]}>
                <Feather name="check" size={13} color={colors.onBrandPrimary} />
                <Text style={[styles.doneChipText, { color: colors.onBrandPrimary }]}>
                  {t("completed_today")}
                </Text>
              </View>
            )}
            <Text style={styles.heroTitle}>{t("todays_confession")}</Text>
            <Text style={styles.heroSub}>{t("seven_verses_note")}</Text>
            <Pressable
              testID="start-confession-button"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push({ pathname: "/reader/[date]", params: { date: key } });
              }}
              style={({ pressed }) => [
                styles.cta,
                { backgroundColor: colors.brandPrimary, opacity: pressed ? 0.9 : 1 },
              ]}
            >
              <Feather
                name={doneToday ? "rotate-ccw" : "play"}
                size={18}
                color={colors.onBrandPrimary}
              />
              <Text style={[styles.ctaText, { color: colors.onBrandPrimary }]}>
                {doneToday ? t("reread_confession") : t("start_confession")}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Week tracker */}
        <Text style={[styles.sectionLabel, { color: colors.onSurfaceSecondary }]}>
          {t("this_week")}
        </Text>
        <View style={styles.weekRow} testID="week-tracker">
          {week.map((d, i) => {
            const done = isCompleted(toDateKey(d));
            const isToday = toDateKey(d) === key;
            return (
              <View key={i} style={styles.weekItem}>
                <Text style={[styles.weekDay, { color: colors.onSurfaceSecondary }]}>
                  {wd[d.getDay()]}
                </Text>
                <View
                  style={[
                    styles.weekDot,
                    {
                      backgroundColor: done ? colors.brandPrimary : colors.surfaceSecondary,
                      borderColor: isToday ? colors.brandPrimary : colors.border,
                      borderWidth: isToday ? 2 : 1,
                    },
                  ]}
                >
                  {done ? (
                    <Feather name="check" size={14} color={colors.onBrandPrimary} />
                  ) : (
                    <Text style={[styles.weekNum, { color: colors.onSurfaceSecondary }]}>
                      {d.getDate()}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.surfaceSecondary }]} testID="stat-streak">
            <Feather name="zap" size={20} color={colors.brandPrimary} />
            <Text style={[styles.statValue, { color: colors.onSurface }]}>{currentStreak}</Text>
            <Text style={[styles.statLabel, { color: colors.onSurfaceSecondary }]}>
              {t("streak")}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surfaceSecondary }]} testID="stat-points">
            <Feather name="star" size={20} color={colors.brandPrimary} />
            <Text style={[styles.statValue, { color: colors.onSurface }]}>{totalPoints}</Text>
            <Text style={[styles.statLabel, { color: colors.onSurfaceSecondary }]}>
              {t("faith_points")}
            </Text>
          </View>
        </View>

        {/* AI spiritual help */}
        <Text style={[styles.sectionLabel, { color: colors.onSurfaceSecondary }]}>
          {t("ai_help")}
        </Text>
        <Pressable
          testID="ai-generate-card"
          onPress={() => {
            Haptics.selectionAsync();
            router.push("/generate");
          }}
          style={[styles.aiCard, { backgroundColor: colors.surfaceSecondary }]}
        >
          <View style={[styles.aiIcon, { backgroundColor: colors.brandTertiary }]}>
            <Feather name="feather" size={20} color={colors.onBrandTertiary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.aiTitle, { color: colors.onSurface }]}>{t("gen_card_title")}</Text>
            <Text style={[styles.aiDesc, { color: colors.onSurfaceSecondary }]}>{t("gen_card_desc")}</Text>
          </View>
          <Feather name="chevron-right" size={22} color={colors.onSurfaceSecondary} />
        </Pressable>
        <Pressable
          testID="ai-assistant-card"
          onPress={() => {
            Haptics.selectionAsync();
            router.push("/assistant");
          }}
          style={[styles.aiCard, { backgroundColor: colors.surfaceSecondary, marginTop: spacing.md }]}
        >
          <View style={[styles.aiIcon, { backgroundColor: colors.brandTertiary }]}>
            <Feather name="message-circle" size={20} color={colors.onBrandTertiary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.aiTitle, { color: colors.onSurface }]}>{t("assistant_card_title")}</Text>
            <Text style={[styles.aiDesc, { color: colors.onSurfaceSecondary }]}>{t("assistant_card_desc")}</Text>
          </View>
          <Feather name="chevron-right" size={22} color={colors.onSurfaceSecondary} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  headerRow: { flexDirection: "row", alignItems: "flex-start" },
  favBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  greeting: { fontFamily: fonts.textMedium, fontSize: 14 },
  date: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
    lineHeight: 34,
  },
  hero: {
    height: 300,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.xl,
  },
  doneChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  doneChipText: { fontFamily: fonts.textBold, fontSize: 12 },
  heroTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    color: "#FAF9F6",
  },
  heroSub: {
    fontFamily: fonts.textRegular,
    fontSize: 13,
    color: "#E7E5DF",
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    height: 56,
    borderRadius: radius.pill,
  },
  ctaText: { fontFamily: fonts.textBold, fontSize: 16 },
  sectionLabel: {
    fontFamily: fonts.textBold,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  weekRow: { flexDirection: "row", justifyContent: "space-between" },
  weekItem: { alignItems: "center", gap: 6 },
  weekDay: { fontFamily: fonts.textMedium, fontSize: 11 },
  weekDot: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  weekNum: { fontFamily: fonts.textMedium, fontSize: 13 },
  statsRow: { flexDirection: "row", gap: spacing.lg, marginTop: spacing.xl },
  statCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "flex-start",
    gap: 6,
  },
  statValue: { fontFamily: fonts.displayBold, fontSize: 28 },
  statLabel: { fontFamily: fonts.textRegular, fontSize: 12 },
  aiCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  aiIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  aiTitle: { fontFamily: fonts.textBold, fontSize: 15 },
  aiDesc: { fontFamily: fonts.textRegular, fontSize: 12, marginTop: 2 },
});
