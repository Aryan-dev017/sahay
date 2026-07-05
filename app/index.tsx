import { useAppReady } from "@/hooks/useAppReady";
import { useOnboardingStore } from "@/store/onboardingStore";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function SplashRoute() {
  const isReady = useAppReady();
  const hasCompletedOnboarding = useOnboardingStore((s) => s.hasCompletedOnboarding);

  useEffect(() => {
    if (!isReady) return;

    const timeout = setTimeout(() => {
      if (hasCompletedOnboarding) {
        router.replace("/(tabs)");
      } else {
        router.replace("/onboarding");
      }
    }, 900);

    return () => clearTimeout(timeout);
  }, [isReady, hasCompletedOnboarding]);

  return (
    <View className="flex-1 items-center justify-center bg-navy-900 px-8">
      <View className="mb-10 h-20 w-20 items-center justify-center rounded-5xl bg-accent-muted">
        <Text className="text-3xl font-bold text-accent-soft">S</Text>
      </View>
      <Text accessibilityRole="header" className="text-display text-ink-primary">
        Sahay
      </Text>
      <Text className="mt-3 text-center text-body text-ink-secondary">
        Your calm, AI-powered life admin for India.
      </Text>
      <View className="mt-16 items-center">
        <ActivityIndicator accessibilityLabel="Loading" color="#A5B4FC" />
        <Text className="mt-4 text-caption text-ink-muted">
          {isReady ? "Opening your workspace…" : "Restoring local data…"}
        </Text>
      </View>
    </View>
  );
}
