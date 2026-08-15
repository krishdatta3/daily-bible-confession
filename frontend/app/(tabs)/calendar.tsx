import { useState } from "react";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/theme/ThemeContext";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { useProgress } from "@/src/context/ProgressContext";
import { fonts, radius, spacing } from "@/src/theme/colors";
import { isFuture, toDateKey, todayKey } from "@/src/utils/date";
import { formatMonthYear, weekdayShort } from "@/src/utils/format";

export default function CalendarScreen() {
  const { colors, isDark } = useTheme();
  const { t, lang } = useLanguage();
  const { isCompleted } = useProgress();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const tKey = todayKey();
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const wd = weekdayShort(lang);

  const goPrev = () => {
    Haptics.selectionAsync();
    setCursor(new Date(year, month - 1, 1));
  };
  const goNext = () => {
    Haptics.selectionAsync();
    setCursor(new Date(year, month + 1, 1));
  };

  const onDayPress = (d: Date) => {
    if (isFuture(d)) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/reader/[date]", params: { date: toDateKey(d) } });
  };

  const Legend = ({ color, label, outline }: { color: string; label: string; outline?: boolean }) => (
    <View style={styles.legendItem}>
      <View
        style={[
          styles.legendDot,
          {
            backgroundColor: outline ? "transparent" : color,
            borderColor: color,
            borderWidth: outline ? 2 : 0,
          },
        ]}
      />
      <Text style={[styles.legendText, { color: colors.onSurfaceSecondary }]}>{label}</Text>
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
        <Text style={[styles.title, { color: colors.onSurface }]}>{t("tab_calendar")}</Text>

        {/* Month nav */}
        <View style={styles.navRow}>
          <Pressable
            testID="calendar-prev-month"
            onPress={goPrev}
            style={[styles.navBtn, { backgroundColor: colors.surfaceSecondary }]}
          >
            <Feather name="chevron-left" size={22} color={colors.onSurface} />
          </Pressable>
          <Text style={[styles.monthLabel, { color: colors.onSurface }]}>
            {formatMonthYear(cursor, lang)}
          </Text>
          <Pressable
            testID="calendar-next-month"
            onPress={goNext}
            style={[styles.navBtn, { backgroundColor: colors.surfaceSecondary }]}
          >
            <Feather name="chevron-right" size={22} color={colors.onSurface} />
          </Pressable>
        </View>

        {/* Weekday header */}
        <View style={styles.weekHeader}>
          {wd.map((w) => (
            <Text key={w} style={[styles.weekHeaderText, { color: colors.onSurfaceSecondary }]}>
              {w}
            </Text>
          ))}
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {cells.map((d, i) => {
            if (!d) return <View key={`e${i}`} style={styles.cell} />;
            const dk = toDateKey(d);
            const done = isCompleted(dk);
            const isToday = dk === tKey;
            const future = isFuture(d);
            const missed = !done && !future && !isToday;

            let bg = "transparent";
            let textColor = colors.onSurface;
            if (done) {
              bg = colors.brandTertiary;
              textColor = colors.onBrandTertiary;
            } else if (missed) {
              bg = colors.surfaceSecondary;
              textColor = colors.onSurfaceSecondary;
            }

            return (
              <Pressable
                key={dk}
                testID={`calendar-day-${dk}`}
                disabled={future}
                onPress={() => onDayPress(d)}
                style={styles.cell}
              >
                <View
                  style={[
                    styles.dayInner,
                    {
                      backgroundColor: bg,
                      borderColor: isToday ? colors.brandPrimary : "transparent",
                      borderWidth: isToday ? 2 : 0,
                      opacity: future ? 0.35 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      {
                        color: isToday ? colors.brandPrimary : textColor,
                        fontFamily: done || isToday ? fonts.textBold : fonts.textRegular,
                      },
                    ]}
                  >
                    {d.getDate()}
                  </Text>
                  {done && <View style={[styles.dayMark, { backgroundColor: colors.brandPrimary }]} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Legend color={colors.brandTertiary} label={t("legend_completed")} />
          <Legend color={colors.brandPrimary} label={t("legend_today")} outline />
          <Legend color={colors.surfaceSecondary} label={t("legend_missed")} />
        </View>
      </ScrollView>
    </View>
  );
}

const CELL = `${100 / 7}%`;

const styles = StyleSheet.create({
  root: { flex: 1 },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    marginBottom: spacing.xl,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  monthLabel: { fontFamily: fonts.displaySemiBold, fontSize: 20 },
  weekHeader: { flexDirection: "row", marginBottom: spacing.sm },
  weekHeaderText: {
    width: CELL as unknown as number,
    textAlign: "center",
    fontFamily: fonts.textMedium,
    fontSize: 12,
  },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: {
    width: CELL as unknown as number,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  dayInner: {
    width: "100%",
    height: "100%",
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: { fontSize: 15 },
  dayMark: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 3,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg,
    marginTop: spacing["2xl"],
    justifyContent: "center",
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 16, height: 16, borderRadius: radius.sm },
  legendText: { fontFamily: fonts.textRegular, fontSize: 13 },
});
