import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import {
  ActivityIndicator,
  Animated,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/theme/ThemeContext";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { useProgress, POINTS_PER_DAY } from "@/src/context/ProgressContext";
import { useFavourites, favId } from "@/src/context/FavouritesContext";
import { useToast } from "@/src/components/Toast";
import { ShareCard } from "@/src/components/ShareCard";
import { getReflection } from "@/src/utils/ai";
import {
  NarrationState,
  narrate,
  stopNarration,
  subscribeNarration,
} from "@/src/utils/narration";
import { fonts, radius, spacing } from "@/src/theme/colors";
import { IMAGES } from "@/src/theme/images";
import { fromDateKey } from "@/src/utils/date";
import {
  DayVerse,
  THEME_LABELS,
  getDayContent,
} from "@/src/content/content";

type Step =
  | { kind: "confession" }
  | { kind: "verse"; verse: DayVerse; num: number }
  | { kind: "prayer" };

export default function ReaderScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const { colors, isDark } = useTheme();
  const { t, lang } = useLanguage();
  const { markComplete, currentStreak } = useProgress();
  const { isFav, toggleFav } = useFavourites();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const cardRef = useRef<View>(null);
  const [narr, setNarr] = useState<NarrationState>({
    loading: false,
    playing: false,
    id: null,
  });

  useEffect(() => {
    const unsub = subscribeNarration(setNarr);
    return () => {
      unsub();
      stopNarration();
    };
  }, []);

  const [reflectOpen, setReflectOpen] = useState(false);
  const [reflectLoading, setReflectLoading] = useState(false);
  const [reflectText, setReflectText] = useState("");

  const content = useMemo(() => getDayContent(fromDateKey(date)), [date]);

  const steps: Step[] = useMemo(
    () => [
      { kind: "confession" },
      ...content.verses.map((v, i) => ({ kind: "verse" as const, verse: v, num: i + 1 })),
      { kind: "prayer" },
    ],
    [content],
  );

  const [index, setIndex] = useState(0);
  const [showAppreciation, setShowAppreciation] = useState(false);

  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const bgUri = isDark ? IMAGES.verseBackgroundDark : IMAGES.verseBackgroundLight;

  const finish = () => {
    stopNarration();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    markComplete(date);
    setShowAppreciation(true);
  };

  const goNext = () => {
    if (index >= steps.length - 1) {
      finish();
      return;
    }
    stopNarration();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setIndex((i) => i + 1);
      translateY.setValue(14);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 420, useNativeDriver: true }),
      ]).start();
    });
  };

  const close = () => router.back();

  if (showAppreciation) {
    return (
      <Appreciation
        onDone={() => router.back()}
        encouragement={content.encouragement[lang]}
        streak={currentStreak}
      />
    );
  }

  const step = steps[index];
  const buttonLabel =
    step.kind === "verse"
      ? t("next_verse")
      : step.kind === "prayer"
        ? t("finish")
        : t("amen_continue");

  const shareText =
    step.kind === "verse"
      ? step.verse[lang]
      : step.kind === "confession"
        ? content.confession[lang]
        : content.prayer[lang];
  const shareReference = step.kind === "verse" ? step.verse.ref[lang] : undefined;
  const shareLabel =
    step.kind === "verse"
      ? THEME_LABELS[step.verse.theme][lang]
      : step.kind === "confession"
        ? t("declaration")
        : t("todays_prayer");
  const currentId = `s${index}`;
  const isBusy = narr.id === currentId && (narr.loading || narr.playing);

  const onListen = async () => {
    Haptics.selectionAsync();
    try {
      await narrate(currentId, shareText);
    } catch {
      showToast(t("narration_error"), "error");
    }
  };

  const onShare = async () => {
    try {
      const available = Platform.OS !== "web" && (await Sharing.isAvailableAsync());
      if (!available) {
        showToast(t("share_unavailable"), "info");
        return;
      }
      const uri = await captureRef(cardRef, { format: "png", quality: 1 });
      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: t("share_verse"),
      });
    } catch {
      showToast(t("share_error"), "error");
    }
  };

  const verseFavId = step.kind === "verse" ? favId(step.verse) : null;
  const favActive = verseFavId ? isFav(verseFavId) : false;
  const onBookmark = () => {
    if (step.kind !== "verse") return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const added = toggleFav(step.verse);
    showToast(added ? t("fav_added") : t("fav_removed"), added ? "success" : "info");
  };

  const onReflect = async () => {
    if (step.kind !== "verse") return;
    Haptics.selectionAsync();
    setReflectOpen(true);
    setReflectLoading(true);
    setReflectText("");
    try {
      const { reflection } = await getReflection(step.verse[lang], step.verse.ref[lang], lang);
      setReflectText(reflection);
    } catch {
      setReflectText(t("ai_error"));
    } finally {
      setReflectLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Image source={{ uri: bgUri }} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
      <LinearGradient
        colors={["rgba(28,25,23,0.15)", "rgba(28,25,23,0.45)", "rgba(28,25,23,0.97)"]}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Top bar: close + progress segments */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable testID="reader-close-button" onPress={close} hitSlop={12} style={styles.closeBtn}>
          <Feather name="x" size={24} color="#FAF9F6" />
        </Pressable>
        <View style={styles.progressRow}>
          {steps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressSeg,
                { backgroundColor: i <= index ? colors.brandPrimary : "rgba(250,249,246,0.3)" },
              ]}
            />
          ))}
        </View>
        <Pressable
          testID="reader-listen-button"
          onPress={onListen}
          hitSlop={10}
          style={styles.iconBtn}
        >
          {isBusy && narr.loading ? (
            <ActivityIndicator size="small" color="#FAF9F6" />
          ) : (
            <Feather
              name={isBusy && narr.playing ? "pause" : "volume-2"}
              size={22}
              color="#FAF9F6"
            />
          )}
        </Pressable>
        {step.kind === "verse" && (
          <Pressable
            testID="reader-bookmark-button"
            onPress={onBookmark}
            hitSlop={10}
            style={styles.iconBtn}
          >
            <Feather
              name="bookmark"
              size={21}
              color={favActive ? colors.brandPrimary : "#FAF9F6"}
            />
          </Pressable>
        )}
        {step.kind === "verse" && (
          <Pressable
            testID="reader-reflect-button"
            onPress={onReflect}
            hitSlop={10}
            style={styles.iconBtn}
          >
            <Feather name="zap" size={21} color="#FAF9F6" />
          </Pressable>
        )}
        <Pressable
          testID="reader-share-button"
          onPress={onShare}
          hitSlop={10}
          style={styles.iconBtn}
        >
          <Feather name="share-2" size={21} color="#FAF9F6" />
        </Pressable>
      </View>

      {content.special && (
        <View style={styles.specialWrap} pointerEvents="none">
          <View style={[styles.specialChip, { backgroundColor: colors.brandSecondary }]}>
            <Feather name="star" size={12} color={colors.onBrandSecondary} />
            <Text style={[styles.specialText, { color: colors.onBrandSecondary }]}>
              {content.special[lang]}
            </Text>
          </View>
        </View>
      )}

      {/* Content */}
      <View style={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          {step.kind === "verse" ? (
            <>
              <View style={styles.labelRow}>
                <View style={[styles.themeChip, { backgroundColor: colors.brandPrimary }]}>
                  <Text style={[styles.themeChipText, { color: colors.onBrandPrimary }]}>
                    {THEME_LABELS[step.verse.theme][lang]}
                  </Text>
                </View>
                <Text style={styles.counter}>
                  {step.num} / {content.verses.length}
                </Text>
              </View>
              <Text style={styles.verseText}>{step.verse[lang]}</Text>
              <Text style={styles.verseRef}>{t("source")}: {step.verse.ref[lang]}</Text>
            </>
          ) : step.kind === "confession" ? (
            <>
              <View style={styles.labelRow}>
                <View style={[styles.themeChip, { backgroundColor: colors.brandSecondary }]}>
                  <Feather name="feather" size={13} color={colors.onBrandSecondary} />
                  <Text style={[styles.themeChipText, { color: colors.onBrandSecondary, marginLeft: 4 }]}>
                    {t("declaration")}
                  </Text>
                </View>
              </View>
              <Text style={styles.verseText}>“{content.confession[lang]}”</Text>
            </>
          ) : (
            <>
              <View style={styles.labelRow}>
                <View style={[styles.themeChip, { backgroundColor: colors.brandSecondary }]}>
                  <Feather name="sunrise" size={13} color={colors.onBrandSecondary} />
                  <Text style={[styles.themeChipText, { color: colors.onBrandSecondary, marginLeft: 4 }]}>
                    {t("todays_prayer")}
                  </Text>
                </View>
              </View>
              <Text style={styles.prayerText}>{content.prayer[lang]}</Text>
            </>
          )}
        </Animated.View>

        <Pressable
          testID="reader-next-button"
          onPress={goNext}
          style={({ pressed }) => [
            styles.nextBtn,
            { backgroundColor: colors.brandPrimary, opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={[styles.nextText, { color: colors.onBrandPrimary }]}>{buttonLabel}</Text>
          <Feather
            name={step.kind === "prayer" ? "check" : "arrow-right"}
            size={20}
            color={colors.onBrandPrimary}
          />
        </Pressable>
      </View>

      <View style={styles.offscreen} pointerEvents="none">
        <ShareCard
          ref={cardRef}
          text={shareText}
          reference={shareReference}
          label={shareLabel}
          appName={t("app_name")}
        />
      </View>

      <Modal
        visible={reflectOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setReflectOpen(false)}
      >
        <Pressable style={styles.reflectBackdrop} onPress={() => setReflectOpen(false)} />
        <View
          style={[
            styles.reflectSheet,
            { backgroundColor: colors.surface, paddingBottom: insets.bottom + spacing.xl },
          ]}
        >
          <View style={styles.reflectHandle} />
          <View style={styles.reflectTitleRow}>
            <Feather name="zap" size={18} color={colors.brandPrimary} />
            <Text style={[styles.reflectTitle, { color: colors.onSurface }]}>
              {t("reflect_title")}
            </Text>
          </View>
          {reflectLoading ? (
            <View style={styles.reflectLoading}>
              <ActivityIndicator color={colors.brandPrimary} />
            </View>
          ) : (
            <Text style={[styles.reflectText, { color: colors.onSurface }]}>{reflectText}</Text>
          )}
          <Text style={[styles.reflectNote, { color: colors.onSurfaceSecondary }]}>
            {t("ai_online_note")}
          </Text>
        </View>
      </Modal>
    </View>
  );
}

function Appreciation({
  onDone,
  encouragement,
  streak,
}: {
  onDone: () => void;
  encouragement: string;
  streak: number;
}) {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.appRoot, { backgroundColor: colors.surface }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <LinearGradient
        colors={[colors.brandTertiary, colors.surface]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.appContent, { paddingTop: insets.top + spacing["3xl"], paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={[styles.appBadgeCircle, { backgroundColor: colors.brandPrimary }]} testID="appreciation-badge">
          <Feather name="check" size={44} color={colors.onBrandPrimary} />
        </View>
        <Text style={[styles.appTitle, { color: colors.onSurface }]}>{t("well_done")}</Text>
        <Text style={[styles.appMsg, { color: colors.onSurfaceSecondary }]}>{t("completed_msg")}</Text>

        <View style={styles.appStats}>
          <View style={[styles.appStat, { backgroundColor: colors.surfaceSecondary }]}>
            <Feather name="star" size={22} color={colors.brandPrimary} />
            <Text style={[styles.appStatValue, { color: colors.onSurface }]}>+{POINTS_PER_DAY}</Text>
            <Text style={[styles.appStatLabel, { color: colors.onSurfaceSecondary }]}>
              {t("points_earned")}
            </Text>
          </View>
          <View style={[styles.appStat, { backgroundColor: colors.surfaceSecondary }]}>
            <Feather name="zap" size={22} color={colors.brandPrimary} />
            <Text style={[styles.appStatValue, { color: colors.onSurface }]}>{streak}</Text>
            <Text style={[styles.appStatLabel, { color: colors.onSurfaceSecondary }]}>
              {t("day_streak_label")}
            </Text>
          </View>
        </View>

        <View style={[styles.encCard, { backgroundColor: colors.surfaceSecondary }]}>
          <Feather name="sun" size={18} color={colors.brandPrimary} />
          <Text style={[styles.encText, { color: colors.onSurface }]}>{encouragement}</Text>
        </View>

        <View style={{ flex: 1 }} />

        <Pressable
          testID="appreciation-done-button"
          onPress={onDone}
          style={({ pressed }) => [
            styles.nextBtn,
            { backgroundColor: colors.brandPrimary, opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Feather name="home" size={20} color={colors.onBrandPrimary} />
          <Text style={[styles.nextText, { color: colors.onBrandPrimary }]}>{t("back_home")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#1C1917" },
  topBar: {
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  closeBtn: { padding: 4 },
  iconBtn: { padding: 4 },
  progressRow: { flex: 1, flexDirection: "row", gap: 5 },
  progressSeg: { flex: 1, height: 4, borderRadius: 2 },
  specialWrap: { alignItems: "center", marginTop: spacing.md },
  specialChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  specialText: { fontFamily: fonts.textBold, fontSize: 12 },
  offscreen: { position: "absolute", left: -9999, top: -9999 },
  reflectBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
  reflectSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.xl,
  },
  reflectHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(120,120,120,0.4)",
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  reflectTitleRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md },
  reflectTitle: { fontFamily: fonts.displaySemiBold, fontSize: 19 },
  reflectLoading: { paddingVertical: spacing["2xl"], alignItems: "center" },
  reflectText: { fontFamily: fonts.textRegular, fontSize: 17, lineHeight: 27 },
  reflectNote: { fontFamily: fonts.textRegular, fontSize: 12, marginTop: spacing.lg },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: spacing.xl,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  themeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  themeChipText: { fontFamily: fonts.textBold, fontSize: 12 },
  counter: { fontFamily: fonts.textMedium, fontSize: 14, color: "#E7E5DF" },
  verseText: {
    fontFamily: fonts.displaySemiBold,
    fontSize: 28,
    lineHeight: 40,
    color: "#FAF9F6",
  },
  verseRef: {
    fontFamily: fonts.textMedium,
    fontSize: 15,
    color: "#FCD34D",
    marginTop: spacing.lg,
  },
  prayerText: {
    fontFamily: fonts.displayRegular,
    fontSize: 22,
    lineHeight: 34,
    color: "#FAF9F6",
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    height: 58,
    borderRadius: radius.pill,
    marginTop: spacing["2xl"],
  },
  nextText: { fontFamily: fonts.textBold, fontSize: 17 },
  // Appreciation
  appRoot: { flex: 1 },
  appContent: { flex: 1, paddingHorizontal: spacing.xl, alignItems: "center" },
  appBadgeCircle: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  appTitle: { fontFamily: fonts.displayBold, fontSize: 38 },
  appMsg: {
    fontFamily: fonts.textRegular,
    fontSize: 15,
    textAlign: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  appStats: { flexDirection: "row", gap: spacing.lg, width: "100%" },
  appStat: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    gap: 4,
  },
  appStatValue: { fontFamily: fonts.displayBold, fontSize: 30 },
  appStatLabel: { fontFamily: fonts.textRegular, fontSize: 12, textAlign: "center" },
  encCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    width: "100%",
  },
  encText: { flex: 1, fontFamily: fonts.textMedium, fontSize: 15, lineHeight: 22 },
});
