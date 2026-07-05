import { AppCard } from "@/components/ui/AppCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { mockComplaintDraft } from "@/constants/mockData";
import { track } from "@/services/analytics";
import { useUiStore } from "@/store/uiStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, Share, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AiResultScreen() {
  const insets = useSafeAreaInsets();
  const aiResult = useUiStore((s) => s.aiResult);

  const title = aiResult?.title ?? "AI response";
  const kind = aiResult?.kind ?? "draft";
  const content = aiResult?.body ?? mockComplaintDraft;
  const promptPreview = aiResult?.promptPreview;

  useEffect(() => {
    track("ai_result_viewed", { kind });
  }, [kind]);

  const share = async () => {
    track("ai_result_shared", { kind });
    await Share.share({ message: content, title });
  };

  if (!aiResult) {
    return (
      <View className="flex-1 items-center justify-center bg-navy-900 px-8">
        <Text className="text-center text-body text-ink-secondary">No draft loaded. Generate one from the Assistant tab.</Text>
        <Pressable accessibilityRole="button" onPress={() => router.back()} className="mt-6">
          <Text className="font-semibold text-accent-soft">Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-navy-900">
      <View
        className="flex-row items-center justify-between border-b border-line px-5"
        style={{ paddingTop: insets.top + 8, paddingBottom: 14 }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-2xl bg-navy-800"
        >
          <Ionicons name="chevron-back" size={22} color="#F4F6FB" />
        </Pressable>
        <Text className="text-title text-ink-primary">AI result</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Share AI result"
          hitSlop={12}
          onPress={share}
          className="h-10 w-10 items-center justify-center rounded-2xl bg-navy-800"
        >
          <Ionicons name="share-outline" size={20} color="#A5B4FC" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 32, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 flex-row items-center gap-2">
          <View className="rounded-full bg-accent-muted px-3 py-1">
            <Text className="text-[11px] font-semibold uppercase tracking-wide text-accent-soft">{kind}</Text>
          </View>
          <Text className="text-caption text-ink-muted">Local mock draft</Text>
        </View>

        <Text className="text-display text-ink-primary" accessibilityRole="header">
          {title}
        </Text>

        {promptPreview ? (
          <Text className="mt-3 text-caption text-ink-muted" numberOfLines={2}>
            Based on: {promptPreview}
            {promptPreview.length >= 160 ? "…" : ""}
          </Text>
        ) : null}

        <AppCard className="mt-6">
          <Text className="text-body leading-6 text-ink-secondary">{content}</Text>
        </AppCard>

        <View className="mt-8 flex-row gap-3">
          <View className="flex-1">
            <SecondaryButton onPress={() => router.back()} accessibilityLabel="Edit prompt">
              Edit prompt
            </SecondaryButton>
          </View>
          <View className="flex-1">
            <PrimaryButton onPress={share} accessibilityLabel="Share draft">
              Share
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
