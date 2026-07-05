import "react-native-gesture-handler";
import { AppProviders } from "@/components/providers/AppProviders";
import { colors } from "@/constants/theme";
import { track } from "@/services/analytics";
import { initSentry } from "@/services/errorTracking";
import { initRevenueCat } from "@/services/revenuecat";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const trackedAppOpen = useRef(false);

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(colors.background);
    initSentry();
    void initRevenueCat();

    if (!trackedAppOpen.current) {
      trackedAppOpen.current = true;
      track("app_opened");
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
      <AppProviders>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <StatusBar style="light" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
                animation: "fade",
              }}
            >
              <Stack.Screen name="index" options={{ animation: "fade" }} />
              <Stack.Screen name="onboarding" options={{ animation: "slide_from_right" }} />
              <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
              <Stack.Screen
                name="reminder/new"
                options={{ presentation: "modal", animation: "slide_from_bottom" }}
              />
              <Stack.Screen
                name="reminder/[id]"
                options={{ presentation: "modal", animation: "slide_from_bottom" }}
              />
              <Stack.Screen name="ai/result" options={{ animation: "slide_from_right" }} />
              <Stack.Screen
                name="premium"
                options={{ presentation: "modal", animation: "slide_from_bottom" }}
              />
            </Stack>
          </SafeAreaProvider>
        </QueryClientProvider>
      </AppProviders>
    </GestureHandlerRootView>
  );
}
