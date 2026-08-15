import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/src/theme/ThemeContext";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { useFavourites } from "@/src/context/FavouritesContext";
import { THEME_LABELS } from "@/src/content/content";
import { fonts, radius, spacing } from "@/src/theme/colors";

export default function FavouritesScreen() {
  const { colors, isDark } = useTheme();
  const { t, lang } = useLanguage();
  const { favourites, removeFav } = useFavourites();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + spacing.sm, borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          testID="favourites-back-button"
          onPress={() => router.back()}
          hitSlop={12}
          style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary }]}
        >
          <Feather name="chevron-left" size={24} color={colors.onSurface} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>{t("fav_title")}</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.xl,
          paddingTop: spacing.lg,
          paddingBottom: insets.bottom + spacing["2xl"],
        }}
        showsVerticalScrollIndicator={false}
      >
        {favourites.length === 0 ? (
          <View style={styles.emptyWrap} testID="favourites-empty">
            <View style={[styles.emptyIcon, { backgroundColor: colors.brandTertiary }]}>
              <Feather name="bookmark" size={30} color={colors.onBrandTertiary} />
            </View>
            <Text style={[styles.emptyText, { color: colors.onSurfaceSecondary }]}>
              {t("fav_empty")}
            </Text>
          </View>
        ) : (
          favourites.map((f) => (
            <View
              key={f.id}
              testID={`fav-${f.id}`}
              style={[styles.card, { backgroundColor: colors.surfaceSecondary }]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.themeTag, { backgroundColor: colors.brandTertiary }]}>
                  <Text style={[styles.themeTagText, { color: colors.onBrandTertiary }]}>
                    {THEME_LABELS[f.theme][lang]}
                  </Text>
                </View>
                <Pressable
                  testID={`fav-remove-${f.id}`}
                  onPress={() => {
                    Haptics.selectionAsync();
                    removeFav(f.id);
                  }}
                  hitSlop={10}
                >
                  <Feather name="x" size={20} color={colors.onSurfaceSecondary} />
                </Pressable>
              </View>
              <Text style={[styles.verseText, { color: colors.onSurface }]}>{f[lang]}</Text>
              <Text style={[styles.refText, { color: colors.brandPrimary }]}>
                {t("source")}: {f.ref[lang]}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
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
  emptyWrap: { alignItems: "center", marginTop: spacing["3xl"], gap: spacing.lg },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: fonts.textRegular,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: spacing.xl,
  },
  card: { borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  themeTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  themeTagText: { fontFamily: fonts.textBold, fontSize: 11 },
  verseText: { fontFamily: fonts.displayRegular, fontSize: 19, lineHeight: 28 },
  refText: { fontFamily: fonts.textMedium, fontSize: 13, marginTop: spacing.md },
});
