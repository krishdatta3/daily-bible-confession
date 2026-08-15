import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import {
  KeyboardAvoidingView,
  Modal,
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
import { useJournal, JournalType, JournalEntry } from "@/src/context/JournalContext";
import { useToast } from "@/src/components/Toast";
import { fonts, radius, spacing } from "@/src/theme/colors";
import { fromDateKey } from "@/src/utils/date";
import { formatLongDate } from "@/src/utils/format";

export default function JournalScreen() {
  const { colors, isDark } = useTheme();
  const { t, lang } = useLanguage();
  const { entries, addEntry, updateEntry, deleteEntry } = useJournal();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const [text, setText] = useState("");
  const [type, setType] = useState<JournalType>("prayer");

  const openNew = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEditing(null);
    setText("");
    setType("prayer");
    setModalOpen(true);
  };

  const openEdit = (entry: JournalEntry) => {
    Haptics.selectionAsync();
    setEditing(entry);
    setText(entry.text);
    setType(entry.type);
    setModalOpen(true);
  };

  const save = () => {
    if (!text.trim()) {
      showToast(t("journal_empty_text"), "error");
      return;
    }
    if (editing) {
      updateEntry(editing.id, text, type);
    } else {
      addEntry(type, text);
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    showToast(t("journal_saved"), "success");
    setModalOpen(false);
  };

  const remove = () => {
    if (editing) {
      deleteEntry(editing.id);
      showToast(t("journal_deleted"), "info");
    }
    setModalOpen(false);
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + spacing.lg,
          paddingHorizontal: spacing.xl,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: colors.onSurface }]}>{t("journal_title")}</Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceSecondary }]}>
          {t("journal_subtitle")}
        </Text>

        {entries.length === 0 ? (
          <View style={styles.emptyWrap} testID="journal-empty">
            <View style={[styles.emptyIcon, { backgroundColor: colors.brandTertiary }]}>
              <Feather name="book-open" size={30} color={colors.onBrandTertiary} />
            </View>
            <Text style={[styles.emptyText, { color: colors.onSurfaceSecondary }]}>
              {t("journal_empty")}
            </Text>
          </View>
        ) : (
          entries.map((entry) => (
            <Pressable
              key={entry.id}
              testID={`journal-entry-${entry.id}`}
              onPress={() => openEdit(entry)}
              style={[styles.entryCard, { backgroundColor: colors.surfaceSecondary }]}
            >
              <View style={styles.entryHeader}>
                <View
                  style={[
                    styles.typeTag,
                    {
                      backgroundColor:
                        entry.type === "prayer" ? colors.brandTertiary : colors.surfaceTertiary,
                    },
                  ]}
                >
                  <Feather
                    name={entry.type === "prayer" ? "feather" : "heart"}
                    size={12}
                    color={entry.type === "prayer" ? colors.onBrandTertiary : colors.onSurface}
                  />
                  <Text
                    style={[
                      styles.typeTagText,
                      { color: entry.type === "prayer" ? colors.onBrandTertiary : colors.onSurface },
                    ]}
                  >
                    {entry.type === "prayer" ? t("journal_type_prayer") : t("journal_type_thanks")}
                  </Text>
                </View>
                <Text style={[styles.entryDate, { color: colors.onSurfaceSecondary }]}>
                  {formatLongDate(fromDateKey(entry.dateKey), lang)}
                </Text>
              </View>
              <Text style={[styles.entryText, { color: colors.onSurface }]}>{entry.text}</Text>
            </Pressable>
          ))
        )}
      </ScrollView>

      {/* Floating add button */}
      <Pressable
        testID="journal-add-button"
        onPress={openNew}
        style={[styles.fab, { backgroundColor: colors.brandPrimary, bottom: insets.bottom + 84 }]}
      >
        <Feather name="plus" size={28} color={colors.onBrandPrimary} />
      </Pressable>

      {/* Add / Edit modal */}
      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setModalOpen(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalRoot}
        >
          <Pressable style={styles.backdrop} onPress={() => setModalOpen(false)} />
          <View
            style={[
              styles.sheet,
              { backgroundColor: colors.surface, paddingBottom: insets.bottom + spacing.lg },
            ]}
          >
            <View style={styles.sheetHandle} />
            <Text style={[styles.sheetTitle, { color: colors.onSurface }]}>
              {editing ? t("journal_edit") : t("journal_new")}
            </Text>

            {/* Type toggle */}
            <View style={[styles.segment, { backgroundColor: colors.surfaceSecondary }]}>
              {(["prayer", "thanks"] as JournalType[]).map((tp) => {
                const active = tp === type;
                return (
                  <Pressable
                    key={tp}
                    testID={`journal-type-${tp}`}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setType(tp);
                    }}
                    style={[styles.segmentItem, active && { backgroundColor: colors.brandPrimary }]}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        { color: active ? colors.onBrandPrimary : colors.onSurfaceSecondary },
                      ]}
                    >
                      {tp === "prayer" ? t("journal_type_prayer") : t("journal_type_thanks")}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <TextInput
              testID="journal-input"
              value={text}
              onChangeText={setText}
              placeholder={t("journal_placeholder")}
              placeholderTextColor={colors.onSurfaceSecondary}
              multiline
              autoFocus
              style={[
                styles.input,
                { backgroundColor: colors.surfaceSecondary, color: colors.onSurface },
              ]}
            />

            <View style={styles.sheetActions}>
              {editing && (
                <Pressable
                  testID="journal-delete-button"
                  onPress={remove}
                  style={[styles.deleteBtn, { borderColor: colors.error }]}
                >
                  <Feather name="trash-2" size={18} color={colors.error} />
                </Pressable>
              )}
              <Pressable
                testID="journal-save-button"
                onPress={save}
                style={[styles.saveBtn, { backgroundColor: colors.brandPrimary }]}
              >
                <Text style={[styles.saveText, { color: colors.onBrandPrimary }]}>
                  {t("journal_save")}
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  title: { fontFamily: fonts.displayBold, fontSize: 26 },
  subtitle: { fontFamily: fonts.textRegular, fontSize: 14, marginTop: 4, marginBottom: spacing.xl },
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
  entryCard: { borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  entryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  typeTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  typeTagText: { fontFamily: fonts.textBold, fontSize: 11 },
  entryDate: { fontFamily: fonts.textRegular, fontSize: 12 },
  entryText: { fontFamily: fonts.textRegular, fontSize: 15, lineHeight: 22 },
  fab: {
    position: "absolute",
    right: spacing.xl,
    width: 60,
    height: 60,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  modalRoot: { flex: 1, justifyContent: "flex-end" },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)" },
  sheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.xl,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(120,120,120,0.4)",
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  sheetTitle: { fontFamily: fonts.displaySemiBold, fontSize: 20, marginBottom: spacing.lg },
  segment: { flexDirection: "row", borderRadius: radius.md, padding: 4, gap: 4, marginBottom: spacing.lg },
  segmentItem: {
    flex: 1,
    height: 42,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentText: { fontFamily: fonts.textMedium, fontSize: 14 },
  input: {
    minHeight: 130,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontFamily: fonts.textRegular,
    fontSize: 16,
    textAlignVertical: "top",
    lineHeight: 24,
  },
  sheetActions: { flexDirection: "row", gap: spacing.md, marginTop: spacing.lg },
  deleteBtn: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    flex: 1,
    height: 56,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: { fontFamily: fonts.textBold, fontSize: 16 },
});
