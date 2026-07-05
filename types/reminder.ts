export type ReminderCategory = "bills" | "emi" | "deadline" | "other";

export type ReminderStatus = "upcoming" | "soon" | "overdue" | "done";

export type Reminder = {
  id: string;
  title: string;
  category: ReminderCategory;
  dueDate: string;
  amount?: string;
  status: ReminderStatus;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type ReminderInput = {
  title: string;
  category: ReminderCategory;
  dueDate: string;
  amount?: string;
};
