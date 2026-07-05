import type { ReminderCategory } from "@/types/reminder";

export const categoryOptions: { label: string; value: ReminderCategory }[] = [
  { label: "Bill", value: "bills" },
  { label: "EMI", value: "emi" },
  { label: "Deadline", value: "deadline" },
  { label: "Other", value: "other" },
];

export const categoryLabel: Record<ReminderCategory, string> = {
  bills: "Bill",
  emi: "EMI",
  deadline: "Deadline",
  other: "Other",
};
