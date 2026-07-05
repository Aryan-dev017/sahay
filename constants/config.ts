/**
 * Client configuration — only EXPO_PUBLIC_* variables may be read here.
 *
 * NEVER import or reference in this file (or any client code):
 * - OPENAI_API_KEY
 * - SUPABASE_SERVICE_ROLE_KEY
 * - SENTRY_AUTH_TOKEN
 *
 * OpenAI calls must go through a Supabase Edge Function (or other server) later.
 */

const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";

export const PUBLIC_ENV_KEYS = [
  "EXPO_PUBLIC_POSTHOG_KEY",
  "EXPO_PUBLIC_POSTHOG_HOST",
  "EXPO_PUBLIC_SUPABASE_URL",
  "EXPO_PUBLIC_SUPABASE_ANON_KEY",
  "EXPO_PUBLIC_REVENUECAT_API_KEY",
  "EXPO_PUBLIC_SENTRY_DSN",
] as const;

export type PublicEnvKey = (typeof PUBLIC_ENV_KEYS)[number];

function readPublicEnv(key: PublicEnvKey): string | null {
  const raw = process.env[key];
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function warnMissingInDev(): void {
  if (!__DEV__) return;

  const missing = PUBLIC_ENV_KEYS.filter((key) => !readPublicEnv(key));
  if (missing.length === 0) return;

  console.warn(
    `[Sahay config] Missing optional env vars (integrations stay disabled until set):\n` +
      missing.map((key) => `  - ${key}`).join("\n") +
      `\nCopy .env.example → .env and add keys. Never put server secrets in EXPO_PUBLIC_*.`,
  );
}

warnMissingInDev();

const posthogKey = readPublicEnv("EXPO_PUBLIC_POSTHOG_KEY");
const posthogHost = readPublicEnv("EXPO_PUBLIC_POSTHOG_HOST") ?? DEFAULT_POSTHOG_HOST;
const supabaseUrl = readPublicEnv("EXPO_PUBLIC_SUPABASE_URL");
const supabaseAnonKey = readPublicEnv("EXPO_PUBLIC_SUPABASE_ANON_KEY");
const revenueCatApiKey = readPublicEnv("EXPO_PUBLIC_REVENUECAT_API_KEY");
const sentryDsn = readPublicEnv("EXPO_PUBLIC_SENTRY_DSN");

export const config = {
  isDev: __DEV__,

  posthog: {
    key: posthogKey,
    host: posthogHost,
    enabled: Boolean(posthogKey),
  },

  supabase: {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
    enabled: Boolean(supabaseUrl && supabaseAnonKey),
  },

  revenueCat: {
    apiKey: revenueCatApiKey,
    enabled: Boolean(revenueCatApiKey),
  },

  sentry: {
    dsn: sentryDsn,
    enabled: Boolean(sentryDsn),
  },
} as const;

export type AppConfig = typeof config;

export function assertIntegrationEnabled(
  name: keyof Pick<AppConfig, "posthog" | "supabase" | "revenueCat" | "sentry">,
): boolean {
  const section = config[name];
  const enabled = "enabled" in section && section.enabled;

  if (!enabled && __DEV__) {
    console.warn(`[Sahay config] ${name} is disabled — set the related EXPO_PUBLIC_* vars in .env`);
  }

  return enabled;
}
