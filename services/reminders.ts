import type { Reminder, ReminderInput, ReminderStatus } from "@/types/reminder";

const MS_PER_DAY = 86_400_000;

export function computeReminderStatus(dueDate: string, completedAt?: string): ReminderStatus {
  if (completedAt) return "done";

  const due = startOfDay(new Date(dueDate));
  const today = startOfDay(new Date());
  const diffDays = Math.round((due.getTime() - today.getTime()) / MS_PER_DAY);

  if (diffDays < 0) return "overdue";
  if (diffDays <= 3) return "soon";
  return "upcoming";
}

export function buildReminder(input: ReminderInput, existing?: Reminder): Reminder {
  const now = new Date().toISOString();
  const completedAt = existing?.completedAt;

  return {
    id: existing?.id ?? createId(),
    title: input.title.trim(),
    category: input.category,
    dueDate: input.dueDate,
    amount: input.amount?.trim() || undefined,
    status: computeReminderStatus(input.dueDate, completedAt),
    completedAt,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export function sortReminders(reminders: Reminder[]): Reminder[] {
  return [...reminders].sort((a, b) => {
    if (a.status === "done" && b.status !== "done") return 1;
    if (b.status === "done" && a.status !== "done") return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

export function getActiveReminders(reminders: Reminder[]): Reminder[] {
  return sortReminders(reminders.filter((r) => r.status !== "done"));
}

export function getNextReminder(reminders: Reminder[]): Reminder | undefined {
  return getActiveReminders(reminders)[0];
}

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
