import { storageKeys } from "@/constants/storageKeys";
import { storage } from "@/services/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OnboardingStore = {
  hasCompletedOnboarding: boolean;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false }),
    }),
    {
      name: storageKeys.onboarding,
      storage: createJSONStorage(() => storage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({ hasCompletedOnboarding: state.hasCompletedOnboarding }),
    },
  ),
);
