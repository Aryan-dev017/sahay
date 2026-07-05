import { AppCard } from "@/components/ui/AppCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ScreenLayout } from "@/components/layout/ScreenLayout";
import { mockUser } from "@/constants/mockData";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

const rows = [
  { key: "notifications", label: "Notifications", icon: "notifications-outline" as const, hint: "Reminders & nudges" },
  { key: "privacy", label: "Privacy & data", icon: "shield-checkmark-outline" as const, hint: "Local-first stance" },
  { key: "help", label: "Help centre", icon: "help-buoy-outline" as const, hint: "FAQs + email" },
];

export default function ProfileScreen() {
  const resetOnboarding = useOnboardingStore((s) => s.resetOnboarding);
  const plan = useSubscriptionStore((s) => s.plan);
  const trialEndsAt = useSubscriptionStore((s) => s.trialEndsAt);
  const hasPremiumAccess = useSubscriptionStore((s) => s.hasPremiumAccess);

  const planLabel =
    plan === "premium"
      ? `Premium${trialEndsAt ? ` · trial until ${new Date(trialEndsAt).toLocaleDateString("en-IN")}` : ""}`
      : "Free plan";

  return (
    <ScreenLayout>
      <Text className="text-caption font-semibold uppercase tracking-[2px] text-ink-muted">Profile</Text>
      <Text className="mt-2 text-display text-ink-primary" accessibilityRole="header">
        Account
      </Text>

      <AppCard className="mt-8 flex-row items-center">
        <View className="mr-4 h-16 w-16 items-center justify-center rounded-3xl bg-accent-muted">
          <Text className="text-2xl font-semibold text-accent-soft">{mockUser.firstName.slice(0, 1)}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-title text-ink-primary">{mockUser.firstName} Sharma</Text>
          <Text className="mt-1 text-caption text-ink-muted">+91 •••• ••21 · {mockUser.city}</Text>
          <Text className="mt-2 text-caption text-ink-secondary">{planLabel}</Text>
        </View>
      </AppCard>

      {!hasPremiumAccess() ? (
        <Pressable
          onPress={() => router.push("/premium")}
          accessibilityRole="button"
          accessibilityLabel="Upgrade to premium"
          className="mt-6 flex-row items-center justify-between rounded-3xl border border-accent/35 bg-accent-muted px-5 py-4 active:opacity-90"
        >
          <View className="flex-row items-center">
            <Ionicons name="sparkles" size={22} color="#C7D2FE" />
            <View className="ml-3">
              <Text className="text-title text-ink-primary">Upgrade to Sahay Premium</Text>
              <Text className="mt-1 text-caption text-ink-secondary">Unlock unlimited AI drafting</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#A7B0C3" />
        </Pressable>
      ) : null}

      <View className="mt-10">
        <Text className="mb-3 text-caption font-semibold uppercase tracking-wide text-ink-muted">Preferences</Text>
        {rows.map((row) => (
          <Pressable
            key={row.key}
            accessibilityRole="button"
            accessibilityLabel={row.label}
            className="mb-3 flex-row items-center justify-between rounded-3xl border border-line bg-navy-800/80 px-4 py-4 active:opacity-90"
          >
            <View className="flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-2xl bg-navy-900">
                <Ionicons name={row.icon} size={20} color="#A5B4FC" />
              </View>
              <View>
                <Text className="text-body font-semibold text-ink-primary">{row.label}</Text>
                <Text className="mt-1 text-caption text-ink-muted">{row.hint}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6B7589" />
          </Pressable>
        ))}
      </View>

      <View className="mt-8">
        <SecondaryButton
          onPress={() => {
            resetOnboarding();
            router.replace("/onboarding");
          }}
          accessibilityLabel="Replay onboarding walkthrough"
        >
          Replay onboarding
        </SecondaryButton>
      </View>
    </ScreenLayout>
  );
}
