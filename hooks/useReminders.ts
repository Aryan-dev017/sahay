import { useReminderStore } from "@/store/reminderStore";
import { useMemo } from "react";

export function useReminders() {
  const reminders = useReminderStore((s) => s.reminders);
  const hasHydrated = useReminderStore((s) => s.hasHydrated);
  const getSortedReminders = useReminderStore((s) => s.getSortedReminders);
  const getActiveReminders = useReminderStore((s) => s.getActiveReminders);
  const getNextReminder = useReminderStore((s) => s.getNextReminder);

  return useMemo(
    () => ({
      reminders,
      hasHydrated,
      sorted: getSortedReminders(),
      active: getActiveReminders(),
      next: getNextReminder(),
    }),
    [reminders, hasHydrated, getSortedReminders, getActiveReminders, getNextReminder],
  );
}
