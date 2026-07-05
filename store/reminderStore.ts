import { storageKeys } from "@/constants/storageKeys";
import {
  buildReminder,
  computeReminderStatus,
  getActiveReminders,
  getNextReminder,
  sortReminders,
} from "@/services/reminders";
import { storage } from "@/services/storage";
import type { Reminder, ReminderInput } from "@/types/reminder";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ReminderStore = {
  reminders: Reminder[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addReminder: (input: ReminderInput) => Reminder;
  updateReminder: (id: string, input: ReminderInput) => void;
  deleteReminder: (id: string) => void;
  markComplete: (id: string) => void;
  getReminderById: (id: string) => Reminder | undefined;
  getSortedReminders: () => Reminder[];
  getActiveReminders: () => Reminder[];
  getNextReminder: () => Reminder | undefined;
};

export const useReminderStore = create<ReminderStore>()(
  persist(
    (set, get) => ({
      reminders: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      addReminder: (input) => {
        const reminder = buildReminder(input);
        set((state) => ({ reminders: [reminder, ...state.reminders] }));
        return reminder;
      },

      updateReminder: (id, input) => {
        set((state) => ({
          reminders: state.reminders.map((item) =>
            item.id === id ? buildReminder(input, item) : item,
          ),
        }));
      },

      deleteReminder: (id) => {
        set((state) => ({
          reminders: state.reminders.filter((item) => item.id !== id),
        }));
      },

      markComplete: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          reminders: state.reminders.map((item) =>
            item.id === id
              ? { ...item, status: "done" as const, completedAt: now, updatedAt: now }
              : item,
          ),
        }));
      },

      getReminderById: (id) => get().reminders.find((item) => item.id === id),

      getSortedReminders: () => sortReminders(get().reminders),

      getActiveReminders: () => getActiveReminders(get().reminders),

      getNextReminder: () => getNextReminder(get().reminders),
    }),
    {
      name: storageKeys.reminders,
      storage: createJSONStorage(() => storage),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          useReminderStore.setState({ hasHydrated: true });
          return;
        }

        const reminders = state.reminders.map((item) => ({
          ...item,
          status: computeReminderStatus(item.dueDate, item.completedAt),
        }));
        useReminderStore.setState({ reminders, hasHydrated: true });
      },
      partialize: (state) => ({ reminders: state.reminders }),
    },
  ),
);
