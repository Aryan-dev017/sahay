export const colors = {
  background: "#0B1220",
  surface: "#121C2C",
  surfaceElevated: "#1A2740",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.12)",
  textPrimary: "#F4F6FB",
  textSecondary: "#A7B0C3",
  textMuted: "#6B7589",
  accent: "#8B9CF8",
  accentSoft: "#A5B4FC",
  accentMuted: "rgba(139, 156, 248, 0.16)",
  danger: "#F87171",
  success: "#34D399",
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  section: 28,
  screen: 20,
} as const;

export const touchTargets = {
  minHeight: 52,
  minWidth: 52,
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: "700" as const },
  title: { fontSize: 20, lineHeight: 26, fontWeight: "600" as const },
  subtitle: { fontSize: 17, lineHeight: 24, fontWeight: "600" as const },
  body: { fontSize: 16, lineHeight: 22, fontWeight: "400" as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: "400" as const },
  overline: { fontSize: 11, lineHeight: 14, fontWeight: "600" as const, letterSpacing: 1.2 },
} as const;
