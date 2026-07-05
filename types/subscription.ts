export type SubscriptionPlan = "free" | "premium";

export type SubscriptionState = {
  plan: SubscriptionPlan;
  trialEndsAt: string | null;
};
