import { useOnboardingStore } from "@/store/onboardingStore";
import { useReminderStore } from "@/store/reminderStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";

export function useAppReady(): boolean {
  const onboardingReady = useOnboardingStore((s) => s.hasHydrated);
  const remindersReady = useReminderStore((s) => s.hasHydrated);
  const subscriptionReady = useSubscriptionStore((s) => s.hasHydrated);

  return onboardingReady && remindersReady && subscriptionReady;
}
