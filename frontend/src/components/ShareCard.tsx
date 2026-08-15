import React, { forwardRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

import { lightColors, fonts, radius, spacing } from "@/src/theme/colors";

interface ShareCardProps {
  text: string;
  reference?: string;
  label: string;
  appName: string;
}

// A fixed, off-screen card captured to a PNG for sharing. Uses a warm
// amber gradient so it looks premium regardless of the app theme.
export const ShareCard = forwardRef<View, ShareCardProps>(
  ({ text, reference, label, appName }, ref) => {
    return (
      <View ref={ref} collapsable={false} style={styles.card}>
        <LinearGradient
          colors={[lightColors.brandPrimary, lightColors.brandSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.inner}>
          <View style={styles.chip}>
            <Feather name="feather" size={14} color={lightColors.brandPrimary} />
            <Text style={styles.chipText}>{label}</Text>
          </View>

          <Text style={styles.verse}>“{text}”</Text>
          {reference ? <Text style={styles.ref}>— {reference}</Text> : null}

          <View style={styles.footer}>
            <View style={styles.footerLine} />
            <Text style={styles.appName}>{appName}</Text>
          </View>
        </View>
      </View>
    );
  },
);

ShareCard.displayName = "ShareCard";

const styles = StyleSheet.create({
  card: {
    width: 360,
    height: 480,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  inner: {
    flex: 1,
    padding: spacing["2xl"],
    justifyContent: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    marginBottom: spacing.xl,
  },
  chipText: { fontFamily: fonts.textBold, fontSize: 13, color: lightColors.brandPrimary },
  verse: {
    fontFamily: fonts.displaySemiBold,
    fontSize: 26,
    lineHeight: 38,
    color: "#FFFFFF",
  },
  ref: {
    fontFamily: fonts.textBold,
    fontSize: 16,
    color: "#FEF3C7",
    marginTop: spacing.lg,
  },
  footer: {
    position: "absolute",
    bottom: spacing["2xl"],
    left: spacing["2xl"],
    right: spacing["2xl"],
  },
  footerLine: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginBottom: spacing.md,
  },
  appName: {
    fontFamily: fonts.textMedium,
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
});
