import { storageKeys } from "@/constants/storageKeys";
import { storage } from "@/services/storage";
import type { SubscriptionPlan } from "@/types/subscription";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SubscriptionStore = {
  plan: SubscriptionPlan;
  trialEndsAt: string | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  isPremium: () => boolean;
  hasPremiumAccess: () => boolean;
  activatePremiumTrial: () => void;
  resetSubscription: () => void;
};

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      plan: "free",
      trialEndsAt: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      isPremium: () => get().plan === "premium",
      hasPremiumAccess: () => {
        const { plan, trialEndsAt } = get();
        if (plan === "premium") return true;
        if (trialEndsAt && new Date(trialEndsAt) > new Date()) return true;
        return false;
      },
      activatePremiumTrial: () =>
        set({
          plan: "premium",
          trialEndsAt: new Date(Date.now() + 14 * 86_400_000).toISOString(),
        }),
      resetSubscription: () => set({ plan: "free", trialEndsAt: null }),
    }),
    {
      name: storageKeys.subscription,
      storage: createJSONStorage(() => storage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({ plan: state.plan, trialEndsAt: state.trialEndsAt }),
    },
  ),
);
