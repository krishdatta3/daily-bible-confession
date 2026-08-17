import { useState } from "react";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/theme/ThemeContext";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { useToast } from "@/src/components/Toast";
import { generateConfession, GeneratedConfession } from "@/src/utils/ai";
import { fonts, radius, spacing } from "@/src/theme/colors";

export default function GenerateScreen() {
  const { colors, isDark } = useTheme();
  const { t, lang } = useLanguage();
  const { showToast } = useToast();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [situation, setSituation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedConfession | null>(null);

  const run = async () => {
    if (!situation.trim()) {
      showToast(t("gen_empty_error"), "error");
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoading(true);
    try {
      const data = await generateConfession(situation.trim(), lang);
      setResult(data);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      showToast(t("ai_error"), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, borderBottomColor: colors.border }]}>
        <Pressable
          testID="generate-back-button"
          onPress={() => router.back()}
          hitSlop={12}
          style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary }]}
        >
          <Feather name="chevron-left" size={24} color={colors.onSurface} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>{t("gen_title")}</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={insets.top + 44}
      >
        <ScrollView
          contentContainerStyle={{ padding: spacing.xl, paddingBottom: spacing["2xl"] }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.prompt, { color: colors.onSurface }]}>{t("gen_prompt")}</Text>
          <TextInput
            testID="generate-input"
            value={situation}
            onChangeText={setSituation}
            placeholder={t("gen_placeholder")}
            placeholderTextColor={colors.onSurfaceSecondary}
            multiline
            style={[styles.input, { backgroundColor: colors.surfaceSecondary, color: colors.onSurface }]}
          />
          <Pressable
            testID="generate-button"
            onPress={run}
            disabled={loading}
            style={[styles.cta, { backgroundColor: colors.brandPrimary, opacity: loading ? 0.7 : 1 }]}
          >
            {loading ? (
              <ActivityIndicator color={colors.onBrandPrimary} />
            ) : (
              <>
                <Feather name={result ? "refresh-cw" : "feather"} size={18} color={colors.onBrandPrimary} />
                <Text style={[styles.ctaText, { color: colors.onBrandPrimary }]}>
                  {result ? t("gen_regenerate") : t("gen_button")}
                </Text>
              </>
            )}
          </Pressable>

          {loading && !result && (
            <Text style={[styles.loadingNote, { color: colors.onSurfaceSecondary }]}>
              {t("gen_generating")}
            </Text>
          )}

          {result && (
            <View style={{ marginTop: spacing.xl }} testID="generate-result">
              <View style={[styles.resultCard, { backgroundColor: colors.brandTertiary }]}>
                <View style={styles.resultLabelRow}>
                  <Feather name="feather" size={16} color={colors.onBrandTertiary} />
                  <Text style={[styles.resultLabel, { color: colors.onBrandTertiary }]}>
                    {t("gen_confession_label")}
                  </Text>
                </View>
                <Text style={[styles.confessionText, { color: colors.onBrandTertiary }]}>
                  {result.confession}
                </Text>
                {!!result.reference && (
                  <Text style={[styles.refText, { color: colors.brandSecondary }]}>
                    {t("source")}: {result.reference}
                  </Text>
                )}
              </View>

              <View style={[styles.resultCard, { backgroundColor: colors.surfaceSecondary, marginTop: spacing.lg }]}>
                <View style={styles.resultLabelRow}>
                  <Feather name="sunrise" size={16} color={colors.brandPrimary} />
                  <Text style={[styles.resultLabel, { color: colors.brandPrimary }]}>
                    {t("gen_prayer_label")}
                  </Text>
                </View>
                <Text style={[styles.prayerText, { color: colors.onSurface }]}>{result.prayer}</Text>
              </View>
            </View>
          )}

          <Text style={[styles.onlineNote, { color: colors.onSurfaceSecondary }]}>
            {t("ai_online_note")}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontFamily: fonts.displaySemiBold, fontSize: 20 },
  prompt: { fontFamily: fonts.textMedium, fontSize: 16, marginBottom: spacing.md, lineHeight: 24 },
  input: {
    minHeight: 110,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontFamily: fonts.textRegular,
    fontSize: 16,
    textAlignVertical: "top",
    lineHeight: 24,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    height: 56,
    borderRadius: radius.pill,
    marginTop: spacing.lg,
  },
  ctaText: { fontFamily: fonts.textBold, fontSize: 16 },
  loadingNote: { fontFamily: fonts.textRegular, fontSize: 14, textAlign: "center", marginTop: spacing.lg },
  resultCard: { borderRadius: radius.lg, padding: spacing.lg },
  resultLabelRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.sm },
  resultLabel: { fontFamily: fonts.textBold, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5 },
  confessionText: { fontFamily: fonts.displayRegular, fontSize: 21, lineHeight: 31 },
  refText: { fontFamily: fonts.textMedium, fontSize: 13, marginTop: spacing.md },
  prayerText: { fontFamily: fonts.textRegular, fontSize: 16, lineHeight: 25 },
  onlineNote: { fontFamily: fonts.textRegular, fontSize: 12, textAlign: "center", marginTop: spacing.xl },
});
