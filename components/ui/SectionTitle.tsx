import type { ReactNode } from "react";
import { Text, View } from "react-native";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
};

export function SectionTitle({ title, subtitle, right }: SectionTitleProps) {
  return (
    <View className="mb-4 flex-row items-start justify-between gap-4">
      <View className="flex-1">
        <Text className="text-title text-ink-primary">{title}</Text>
        {subtitle ? <Text className="mt-1 text-caption text-ink-muted">{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}
