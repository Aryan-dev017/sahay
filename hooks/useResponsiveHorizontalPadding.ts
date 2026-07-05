import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

export function useResponsiveHorizontalPadding(): number {
  const { width } = useWindowDimensions();
  return useMemo(() => (width < 360 ? 16 : 20), [width]);
}
