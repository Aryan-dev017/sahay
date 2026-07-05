import { config } from "@/constants/config";
import Constants from "expo-constants";

let configured = false;

function isExpoGo(): boolean {
  return Constants.appOwnership === "expo";
}

async function getPurchasesModule() {
  if (isExpoGo()) return null;
  try {
    const module = await import("react-native-purchases");
    return module.default;
  } catch {
    if (__DEV__) {
      console.warn("[Sahay] RevenueCat native module unavailable in this environment");
    }
    return null;
  }
}

/**
 * Configure RevenueCat when a public API key is present and native module is available.
 * Skipped in Expo Go to avoid native module crashes.
 */
export async function initRevenueCat(userId?: string): Promise<void> {
  if (!config.revenueCat.enabled || configured || isExpoGo()) return;

  const Purchases = await getPurchasesModule();
  if (!Purchases) return;

  Purchases.setLogLevel(Purchases.LOG_LEVEL.ERROR);
  await Purchases.configure({ apiKey: config.revenueCat.apiKey! });

  if (userId) {
    await Purchases.logIn(userId);
  }

  configured = true;
}

export async function getCustomerInfo(): Promise<unknown | null> {
  if (!config.revenueCat.enabled || isExpoGo()) return null;

  const Purchases = await getPurchasesModule();
  if (!Purchases || !configured) return null;

  try {
    return await Purchases.getCustomerInfo();
  } catch (error) {
    if (__DEV__) console.warn("[Sahay] getCustomerInfo failed", error);
    return null;
  }
}

export async function isPremiumUser(): Promise<boolean> {
  const info = (await getCustomerInfo()) as { entitlements?: { active?: Record<string, unknown> } } | null;
  if (!info?.entitlements?.active) return false;
  return Object.keys(info.entitlements.active).length > 0;
}

export function openPaywallPlaceholder(): void {
  if (__DEV__) {
    console.log("[Sahay] Paywall UI is local for now — RevenueCat offerings wire in a later phase.");
  }
}
