import type { ReactNode } from "react";
import { Text, View } from "react-native";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <View className="items-center rounded-3xl border border-dashed border-line bg-navy-800/40 px-6 py-10">
      <Text className="text-center text-title text-ink-primary">{title}</Text>
      <Text className="mt-2 text-center text-body text-ink-secondary">{description}</Text>
      {action ? <View className="mt-6 w-full">{action}</View> : null}
    </View>
  );
}
