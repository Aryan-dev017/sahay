import { config } from "@/constants/config";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Supabase client (anon key only). Auth and RLS-backed queries come in a later phase.
 */
export function getSupabase(): SupabaseClient | null {
  if (!config.supabase.enabled) {
    if (__DEV__) {
      console.warn("[Sahay] Supabase client unavailable — set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY");
    }
    return null;
  }

  if (!client) {
    client = createClient(config.supabase.url!, config.supabase.anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return client;
}

export const supabase = {
  get client() {
    return getSupabase();
  },
};
