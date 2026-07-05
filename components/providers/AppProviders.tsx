import { config } from "@/constants/config";
import { getAnalyticsClient } from "@/services/analytics";
import { PostHogProvider } from "posthog-react-native";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  if (!config.posthog.enabled) {
    return <>{children}</>;
  }

  const client = getAnalyticsClient();
  if (!client) {
    return <>{children}</>;
  }

  return <PostHogProvider client={client}>{children}</PostHogProvider>;
}
