import { ModalScreen } from "@/components/layout/ModalScreen";
import { ReminderForm } from "@/features/reminders/ReminderForm";
import { track } from "@/services/analytics";
import { useReminderStore } from "@/store/reminderStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";

export default function AddReminderScreen() {
  const addReminder = useReminderStore((s) => s.addReminder);
  const [saving, setSaving] = useState(false);

  return (
    <ModalScreen
      title="Add reminder"
      headerLeft={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close add reminder"
          hitSlop={12}
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-2xl bg-navy-800"
        >
          <Ionicons name="close" size={22} color="#F4F6FB" />
        </Pressable>
      }
      headerRight={<View className="h-10 w-10" />}
    >
      <ReminderForm
        submitLabel="Save reminder"
        loading={saving}
        onSubmit={(values) => {
          setSaving(true);
          const created = addReminder(values);
          track("reminder_created", { category: created.category });
          router.back();
        }}
      />
    </ModalScreen>
  );
}
