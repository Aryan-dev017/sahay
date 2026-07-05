import { config } from "@/constants/config";
import * as Sentry from "@sentry/react-native";

let initialized = false;

export function initSentry(): void {
  if (!config.sentry.enabled || initialized) return;

  Sentry.init({
    dsn: config.sentry.dsn!,
    enabled: true,
    debug: __DEV__,
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
  });

  initialized = true;

  if (__DEV__) {
    console.log("[Sahay] Sentry initialized");
  }
}

export function captureError(
  error: unknown,
  context?: Record<string, string | number | boolean | null>,
): void {
  if (!config.sentry.enabled) {
    if (__DEV__) console.error("[Sahay] captureError (Sentry off):", error, context);
    return;
  }

  Sentry.withScope((scope) => {
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }
    Sentry.captureException(error);
  });
}

export function setUserContext(user?: {
  id: string;
  email?: string;
  username?: string;
}): void {
  if (!config.sentry.enabled) return;

  if (!user) {
    Sentry.setUser(null);
    return;
  }

  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}
