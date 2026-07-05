import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { track } from "@/services/analytics";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  type ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Slide = {
  key: string;
  title: string;
  body: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const slides: Slide[] = [
  {
    key: "1",
    title: "Never miss a bill or EMI",
    body: "Gentle reminders tuned for Indian households—rent, utilities, loans, and renewals in one place.",
    icon: "calendar-outline",
  },
  {
    key: "2",
    title: "Understand documents instantly",
    body: "Upload notices, agreements, or policy PDFs and get calm, plain-language summaries you can act on.",
    icon: "document-text-outline",
  },
  {
    key: "3",
    title: "Draft formal letters with AI",
    body: "From bank complaints to municipal requests—generate structured drafts you can edit and send.",
    icon: "create-outline",
  },
];

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const next = Math.round(x / Math.max(width, 1));
    setIndex(next);
  };

  const renderItem: ListRenderItem<Slide> = ({ item }) => (
    <View style={{ width }} className="flex-1 px-8 pt-4">
      <View className="mb-10 mt-6 h-16 w-16 items-center justify-center rounded-3xl bg-accent-muted">
        <Ionicons name={item.icon} size={30} color="#A5B4FC" />
      </View>
      <Text className="text-display text-ink-primary">{item.title}</Text>
      <Text className="mt-5 text-body text-ink-secondary">{item.body}</Text>
    </View>
  );

  const finish = () => {
    completeOnboarding();
    track("onboarding_completed");
    router.replace("/(tabs)");
  };

  const goNext = () => {
    if (index < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      finish();
    }
  };

  return (
    <View className="flex-1 bg-navy-900" style={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }}>
      <View className="flex-row items-center justify-between px-6 pb-2">
        <Text className="text-caption font-semibold uppercase tracking-[2px] text-ink-muted">Sahay</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Skip onboarding" onPress={finish} hitSlop={12}>
          <Text className="text-caption font-semibold text-accent-soft">Skip</Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
      />

      <View className="items-center px-8">
        <View className="mb-8 flex-row gap-2">
          {slides.map((slide, i) => (
            <View
              key={slide.key}
              className={`h-2 rounded-full ${i === index ? "w-6 bg-accent" : "w-2 bg-white/15"}`}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
          ))}
        </View>
        <PrimaryButton onPress={goNext} accessibilityLabel={index === slides.length - 1 ? "Get started" : "Continue"}>
          {index === slides.length - 1 ? "Get started" : "Continue"}
        </PrimaryButton>
      </View>
    </View>
  );
}
