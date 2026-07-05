import { assertIntegrationEnabled, config } from "@/constants/config";
import PostHog from "posthog-react-native";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

let client: PostHog | null = null;

export function getAnalyticsClient(): PostHog | null {
  if (!config.posthog.enabled) return null;
  if (!client) {
    client = new PostHog(config.posthog.key!, {
      host: config.posthog.host,
      persistence: "memory",
      captureAppLifecycleEvents: true,
    });
  }
  return client;
}

export function track(event: string, properties?: EventProperties): void {
  if (!assertIntegrationEnabled("posthog")) return;
  const posthog = getAnalyticsClient();
  if (!posthog) return;

  if (!properties) {
    posthog.capture(event);
    return;
  }

  const payload: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value !== undefined) payload[key] = value;
  }

  posthog.capture(event, payload);
}

export function identifyUser(
  userId: string,
  properties?: Record<string, string | number | boolean | null>,
): void {
  if (!config.posthog.enabled) return;
  const posthog = getAnalyticsClient();
  if (!posthog) return;
  posthog.identify(userId, properties);
}

export function resetAnalytics(): void {
  const posthog = getAnalyticsClient();
  posthog?.reset();
}
