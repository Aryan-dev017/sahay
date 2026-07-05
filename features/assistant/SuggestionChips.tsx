import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockAiSuggestions } from "@/constants/mockData";
import { Pressable, ScrollView, Text, View } from "react-native";

type SuggestionChipsProps = {
  onSelect: (text: string) => void;
};

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <View className="overflow-visible">
      <SectionTitle title="Try asking" subtitle="Tap a prompt to fill the composer." />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 8, paddingBottom: 4 }}
        style={{ marginHorizontal: -4 }}
      >
        {mockAiSuggestions.map((item) => (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityLabel={`Use suggestion: ${item}`}
            onPress={() => onSelect(item)}
            style={{ maxWidth: 280, marginRight: 8 }}
            className="rounded-full border border-line bg-navy-800/80 px-4 py-3 active:bg-navy-700"
          >
            <Text className="text-caption leading-5 text-ink-secondary">{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
