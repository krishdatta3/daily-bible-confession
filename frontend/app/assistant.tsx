import { useRef, useState } from "react";
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
import { chatAssistant, ChatTurn } from "@/src/utils/ai";
import { fonts, radius, spacing } from "@/src/theme/colors";

export default function AssistantScreen() {
  const { colors, isDark } = useTheme();
  const { t, lang } = useLanguage();
  const { showToast } = useToast();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<ChatTurn[]>([
    { role: "assistant", text: t("assistant_greeting") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    Haptics.selectionAsync();
    const history = messages;
    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    try {
      const { reply } = await chatAssistant(text, history, lang);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      showToast(t("ai_error"), "error");
      setMessages((prev) => [...prev, { role: "assistant", text: t("ai_error") }]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, borderBottomColor: colors.border }]}>
        <Pressable
          testID="assistant-back-button"
          onPress={() => router.back()}
          hitSlop={12}
          style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary }]}
        >
          <Feather name="chevron-left" size={24} color={colors.onSurface} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>{t("assistant_title")}</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={insets.top + 44}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            return (
              <View
                key={i}
                testID={`chat-msg-${i}`}
                style={[
                  styles.bubble,
                  isUser
                    ? { backgroundColor: colors.brandPrimary, alignSelf: "flex-end", borderBottomRightRadius: 4 }
                    : { backgroundColor: colors.surfaceSecondary, alignSelf: "flex-start", borderBottomLeftRadius: 4 },
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    { color: isUser ? colors.onBrandPrimary : colors.onSurface },
                  ]}
                >
                  {m.text}
                </Text>
              </View>
            );
          })}
          {loading && (
            <View style={[styles.bubble, { backgroundColor: colors.surfaceSecondary, alignSelf: "flex-start", flexDirection: "row", gap: spacing.sm }]}>
              <ActivityIndicator size="small" color={colors.brandPrimary} />
              <Text style={[styles.bubbleText, { color: colors.onSurfaceSecondary }]}>
                {t("assistant_thinking")}
              </Text>
            </View>
          )}
        </ScrollView>

        <View
          style={[
            styles.inputBar,
            { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: insets.bottom + spacing.sm },
          ]}
        >
          <TextInput
            testID="assistant-input"
            value={input}
            onChangeText={setInput}
            placeholder={t("assistant_placeholder")}
            placeholderTextColor={colors.onSurfaceSecondary}
            multiline
            style={[styles.input, { backgroundColor: colors.surfaceSecondary, color: colors.onSurface }]}
          />
          <Pressable
            testID="assistant-send-button"
            onPress={send}
            disabled={loading || !input.trim()}
            style={[
              styles.sendBtn,
              { backgroundColor: colors.brandPrimary, opacity: loading || !input.trim() ? 0.5 : 1 },
            ]}
          >
            <Feather name="send" size={20} color={colors.onBrandPrimary} />
          </Pressable>
        </View>
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
  bubble: {
    maxWidth: "84%",
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  bubbleText: { fontFamily: fonts.textRegular, fontSize: 15, lineHeight: 23 },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    maxHeight: 120,
    minHeight: 48,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    fontFamily: fonts.textRegular,
    fontSize: 16,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
});
