import { spacing } from "@/constants/theme";
import { useResponsiveHorizontalPadding } from "@/hooks/useResponsiveHorizontalPadding";
import type { ReactNode } from "react";
import { ScrollView, View, type ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenLayoutProps = {
  children: ReactNode;
  scrollable?: boolean;
  bottomInset?: number;
  contentClassName?: string;
  scrollProps?: Omit<ScrollViewProps, "children" | "contentContainerStyle">;
};

export function ScreenLayout({
  children,
  scrollable = true,
  bottomInset = 110,
  contentClassName = "",
  scrollProps,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  const horizontalPadding = useResponsiveHorizontalPadding();

  const contentStyle = {
    paddingTop: insets.top + spacing.md,
    paddingBottom: insets.bottom + bottomInset,
    paddingHorizontal: horizontalPadding,
  };

  if (!scrollable) {
    return (
      <View className={`flex-1 bg-navy-900 ${contentClassName}`} style={contentStyle}>
        {children}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-navy-900">
      <ScrollView
        className="flex-1"
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...scrollProps}
      >
        {children}
      </ScrollView>
    </View>
  );
}
