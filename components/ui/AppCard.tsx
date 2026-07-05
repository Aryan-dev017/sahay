import type { ReactNode } from "react";
import { Pressable, View, type ViewProps } from "react-native";

type AppCardProps = ViewProps & {
  children: ReactNode;
  className?: string;
  onPress?: () => void;
};

export function AppCard({ children, className = "", onPress, accessibilityLabel, ...rest }: AppCardProps) {
  const base = "rounded-3xl border border-line bg-navy-800/80 p-5";

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        className={`${base} active:opacity-90 ${className}`}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View accessibilityLabel={accessibilityLabel} className={`${base} ${className}`} {...rest}>
      {children}
    </View>
  );
}
