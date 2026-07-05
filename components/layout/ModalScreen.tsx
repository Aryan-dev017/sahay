import { spacing } from "@/constants/theme";
import type { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ModalScreenProps = {
  title: string;
  headerLeft: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
};

export function ModalScreen({ title, headerLeft, headerRight, children }: ModalScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-navy-900">
      <View
        className="flex-row items-center justify-between border-b border-line px-5"
        style={{ paddingTop: insets.top + spacing.sm, paddingBottom: 14 }}
      >
        {headerLeft}
        <Text className="text-title text-ink-primary">{title}</Text>
        {headerRight ?? <View className="h-10 w-10" />}
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.screen,
          paddingBottom: insets.bottom + spacing.xxl,
          paddingTop: spacing.lg,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}
