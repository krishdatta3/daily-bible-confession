import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/theme/ThemeContext";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { useProgress } from "@/src/context/ProgressContext";
import { fonts, radius, spacing } from "@/src/theme/colors";

export default function ProgressScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const {
    totalPoints,
    currentStreak,
    longestStreak,
    completedCount,
    badges,
    hasCertificate,
  } = useProgress();

  const insets = useSafeAreaInsets();

  const stats = [
    { icon: "zap", value: currentStreak, label: t("current_streak") },
    { icon: "trending-up", value: longestStreak, label: t("longest_streak") },
    { icon: "check-circle", value: completedCount, label: t("days_completed") },
  ] as const;

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
        <Text style={[styles.title, { color: colors.onSurface }]}>{t("your_journey")}</Text>

        {/* Total points hero */}
        <View style={styles.pointsCard} testID="total-points-card">
          <LinearGradient
            colors={[colors.brandPrimary, colors.brandSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Feather name="star" size={26} color={colors.onBrandPrimary} />
          <Text style={[styles.pointsValue, { color: colors.onBrandPrimary }]}>{totalPoints}</Text>
          <Text style={[styles.pointsLabel, { color: colors.onBrandPrimary }]}>
            {t("total_points")}
          </Text>
        </View>

        {/* Mini stats */}
        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View
              key={s.label}
              style={[styles.miniStat, { backgroundColor: colors.surfaceSecondary }]}
            >
              <Feather name={s.icon} size={18} color={colors.brandPrimary} />
              <Text style={[styles.miniValue, { color: colors.onSurface }]}>{s.value}</Text>
              <Text style={[styles.miniLabel, { color: colors.onSurfaceSecondary }]}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Badges */}
        <Text style={[styles.sectionLabel, { color: colors.onSurfaceSecondary }]}>
          {t("badges")}
        </Text>
        <View style={styles.badgeGrid}>
          {badges.map((b) => (
            <View
              key={b.id}
              testID={`badge-${b.id}`}
              style={[
                styles.badgeCard,
                {
                  backgroundColor: b.earned ? colors.brandTertiary : colors.surfaceSecondary,
                  borderColor: b.earned ? colors.brandPrimary : colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.badgeIcon,
                  {
                    backgroundColor: b.earned ? colors.brandPrimary : colors.surfaceTertiary,
                  },
                ]}
              >
                <Feather
                  name={b.earned ? (b.icon as any) : "lock"}
                  size={22}
                  color={b.earned ? colors.onBrandPrimary : colors.onSurfaceSecondary}
                />
              </View>
              <Text
                style={[
                  styles.badgeTitle,
                  { color: b.earned ? colors.onBrandTertiary : colors.onSurface },
                ]}
              >
                {t(b.titleKey as any)}
              </Text>
              <Text
                style={[
                  styles.badgeDesc,
                  { color: b.earned ? colors.onBrandTertiary : colors.onSurfaceSecondary },
                ]}
              >
                {b.earned ? t(b.descKey as any) : t("locked")}
              </Text>
            </View>
          ))}
        </View>

        {/* Certificate */}
        <Text style={[styles.sectionLabel, { color: colors.onSurfaceSecondary }]}>
          {t("certificate")}
        </Text>
        <View
          testID="certificate-card"
          style={[
            styles.certCard,
            {
              backgroundColor: hasCertificate ? colors.surfaceSecondary : colors.surfaceSecondary,
              borderColor: hasCertificate ? colors.brandPrimary : colors.border,
            },
          ]}
        >
          <Feather
            name={hasCertificate ? "award" : "lock"}
            size={30}
            color={hasCertificate ? colors.brandPrimary : colors.onSurfaceSecondary}
          />
          <Text style={[styles.certText, { color: colors.onSurface }]}>
            {hasCertificate ? t("cert_unlocked") : t("cert_locked")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  title: { fontFamily: fonts.displayBold, fontSize: 26, marginBottom: spacing.xl },
  pointsCard: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    overflow: "hidden",
    gap: 4,
  },
  pointsValue: { fontFamily: fonts.displayBold, fontSize: 48 },
  pointsLabel: { fontFamily: fonts.textMedium, fontSize: 14 },
  statsRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.lg },
  miniStat: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
    gap: 4,
  },
  miniValue: { fontFamily: fonts.displayBold, fontSize: 22 },
  miniLabel: { fontFamily: fonts.textRegular, fontSize: 11, textAlign: "center" },
  sectionLabel: {
    fontFamily: fonts.textBold,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: spacing["2xl"],
    marginBottom: spacing.md,
  },
  badgeGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  badgeCard: {
    width: "47.5%",
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    alignItems: "center",
    gap: 8,
  },
  badgeIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeTitle: { fontFamily: fonts.textBold, fontSize: 14, textAlign: "center" },
  badgeDesc: { fontFamily: fonts.textRegular, fontSize: 11, textAlign: "center" },
  certCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.md,
  },
  certText: { fontFamily: fonts.textMedium, fontSize: 14, textAlign: "center" },
});
