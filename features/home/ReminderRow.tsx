import { categoryLabel } from "@/constants/reminders";
import { colors } from "@/constants/theme";
import { formatDueDate } from "@/lib/dates";
import type { Reminder } from "@/types/reminder";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const statusColor: Record<Reminder["status"], string> = {
  upcoming: colors.accent,
  soon: "#FBBF24",
  overdue: colors.danger,
  done: colors.success,
};

type ReminderRowProps = {
  reminder: Reminder;
  onPress?: () => void;
  onComplete?: () => void;
  onDelete?: () => void;
};

export function ReminderRow({ reminder, onPress, onComplete, onDelete }: ReminderRowProps) {
  const isDone = reminder.status === "done";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${reminder.title}, due ${formatDueDate(reminder.dueDate)}`}
      onPress={onPress}
      className="mb-3 flex-row items-center justify-between rounded-3xl border border-line bg-navy-800/70 px-4 py-4 active:opacity-90"
    >
      <View className="mr-3 flex-1">
        <View className="mb-2 flex-row items-center gap-2">
          <View className="rounded-full bg-accent-muted px-3 py-1">
            <Text className="text-[11px] font-semibold uppercase tracking-wide text-accent-soft">
              {categoryLabel[reminder.category]}
            </Text>
          </View>
          <View
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: statusColor[reminder.status] }}
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
          {isDone ? (
            <Text className="text-[11px] font-semibold uppercase tracking-wide text-success">Done</Text>
          ) : null}
        </View>
        <Text
          className={`text-subtitle text-ink-primary ${isDone ? "text-ink-muted line-through" : ""}`}
          numberOfLines={2}
        >
          {reminder.title}
        </Text>
        <Text className="mt-1 text-caption text-ink-muted">Due {formatDueDate(reminder.dueDate)}</Text>
      </View>

      <View className="flex-row items-center gap-2">
        {reminder.amount ? (
          <Text className={`mr-1 text-subtitle text-ink-primary ${isDone ? "text-ink-muted" : ""}`}>
            {reminder.amount}
          </Text>
        ) : null}
        {!isDone && onComplete ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Mark ${reminder.title} complete`}
            hitSlop={10}
            onPress={onComplete}
            className="h-9 w-9 items-center justify-center rounded-2xl bg-navy-900"
          >
            <Ionicons name="checkmark-circle-outline" size={22} color={colors.success} />
          </Pressable>
        ) : null}
        {onDelete ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Delete ${reminder.title}`}
            hitSlop={10}
            onPress={onDelete}
            className="h-9 w-9 items-center justify-center rounded-2xl bg-navy-900"
          >
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}
