import { ModalScreen } from "@/components/layout/ModalScreen";
import { ReminderForm } from "@/features/reminders/ReminderForm";
import { useReminderStore } from "@/store/reminderStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function EditReminderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reminder = useReminderStore((s) => s.getReminderById(id ?? ""));
  const updateReminder = useReminderStore((s) => s.updateReminder);
  const deleteReminder = useReminderStore((s) => s.deleteReminder);
  const [saving, setSaving] = useState(false);

  const initialValues = useMemo(
    () =>
      reminder
        ? {
            title: reminder.title,
            category: reminder.category,
            dueDate: reminder.dueDate,
            amount: reminder.amount,
          }
        : undefined,
    [reminder],
  );

  if (!reminder) {
    return (
      <View className="flex-1 items-center justify-center bg-navy-900 px-8">
        <Text className="text-title text-ink-primary">Reminder not found</Text>
        <Pressable accessibilityRole="button" onPress={() => router.back()} className="mt-6">
          <Text className="text-body font-semibold text-accent-soft">Go back</Text>
        </Pressable>
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert("Delete reminder", `Remove “${reminder.title}”?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteReminder(reminder.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <ModalScreen
      title="Edit reminder"
      headerLeft={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close edit reminder"
          hitSlop={12}
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-2xl bg-navy-800"
        >
          <Ionicons name="close" size={22} color="#F4F6FB" />
        </Pressable>
      }
      headerRight={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Delete reminder"
          hitSlop={12}
          onPress={confirmDelete}
          className="h-10 w-10 items-center justify-center rounded-2xl bg-navy-800"
        >
          <Ionicons name="trash-outline" size={20} color="#F87171" />
        </Pressable>
      }
    >
      <ReminderForm
        initialValues={initialValues}
        submitLabel="Update reminder"
        loading={saving}
        onSubmit={(values) => {
          setSaving(true);
          updateReminder(reminder.id, values);
          router.back();
        }}
      />
    </ModalScreen>
  );
}
