import { AppCard } from "@/components/ui/AppCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { mockPremiumFeatures } from "@/constants/mockData";
import { track } from "@/services/analytics";
import { openPaywallPlaceholder } from "@/services/revenuecat";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PremiumScreen() {
  const insets = useSafeAreaInsets();
  const activatePremiumTrial = useSubscriptionStore((s) => s.activatePremiumTrial);
  const plan = useSubscriptionStore((s) => s.plan);

  useEffect(() => {
    track("paywall_viewed");
  }, []);

  return (
    <View className="flex-1 bg-navy-950">
      <View
        className="flex-row items-center justify-end px-5"
        style={{ paddingTop: insets.top + 8, paddingBottom: 8 }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close premium paywall"
          hitSlop={12}
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-2xl bg-white/5"
        >
          <Ionicons name="close" size={22} color="#F4F6FB" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: insets.bottom + 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 items-center">
          <View className="mb-5 h-16 w-16 items-center justify-center rounded-3xl bg-accent-muted">
            <Ionicons name="diamond" size={28} color="#E0E7FF" />
          </View>
          <Text className="text-center text-display text-ink-primary">Sahay Premium</Text>
          <Text className="mt-3 text-center text-body text-ink-secondary">
            Calm AI drafting, richer reminders, and family-ready workflows—crafted for Indian paperwork realities.
          </Text>
        </View>

        <AppCard className="border-accent/30 bg-navy-900/80">
          <Text className="text-caption font-semibold uppercase tracking-wide text-ink-muted">Choose a plan</Text>
          <View className="mt-4 flex-row gap-3">
            <View className="flex-1 rounded-2xl border border-accent/40 bg-accent-muted/50 p-4">
              <Text className="text-caption font-semibold uppercase tracking-wide text-accent-soft">Monthly</Text>
              <Text className="mt-2 text-title text-ink-primary">₹149</Text>
              <Text className="mt-1 text-caption text-ink-muted">per month</Text>
            </View>
            <View className="flex-1 rounded-2xl border border-line bg-navy-800/80 p-4">
              <Text className="text-caption font-semibold uppercase tracking-wide text-ink-muted">Yearly</Text>
              <Text className="mt-2 text-title text-ink-primary">₹999</Text>
              <Text className="mt-1 text-caption text-ink-muted">per year · best value</Text>
            </View>
          </View>
        </AppCard>

        <Text className="mb-4 mt-10 text-title text-ink-primary">What you unlock</Text>
        {mockPremiumFeatures.map((feature) => (
          <View key={feature} className="mb-3 flex-row items-start">
            <Ionicons name="checkmark-circle" size={20} color="#6EE7B7" style={{ marginTop: 2 }} />
            <Text className="ml-3 flex-1 text-body text-ink-secondary">{feature}</Text>
          </View>
        ))}

        <View className="mt-10">
          <PrimaryButton
            accessibilityLabel="Subscribe to Sahay Premium"
            onPress={() => {
              openPaywallPlaceholder();
              activatePremiumTrial();
              track("subscription_started", { plan: "trial", source: "paywall" });
              router.back();
            }}
          >
            {plan === "premium" ? "Premium active" : "Start Premium trial"}
          </PrimaryButton>
          <Text className="mt-4 text-center text-caption text-ink-muted">
            Billing connects when RevenueCat is configured. Trial is stored locally for now.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
