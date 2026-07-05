import { AppCard } from "@/components/ui/AppCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScreenLayout } from "@/components/layout/ScreenLayout";
import { SuggestionChips } from "@/features/assistant/SuggestionChips";
import { track } from "@/services/analytics";
import { generateDraftMock } from "@/services/ai";
import { captureError } from "@/services/errorTracking";
import { useUiStore } from "@/store/uiStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AssistantScreen() {
  const insets = useSafeAreaInsets();
  const setAssistantBusy = useUiStore((s) => s.setAssistantBusy);
  const setAiResult = useUiStore((s) => s.setAiResult);
  const isAssistantBusy = useUiStore((s) => s.isAssistantBusy);
  const [prompt, setPrompt] = useState("");

  const runMockGeneration = async () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setAssistantBusy(true);
    track("ai_prompt_submitted", { prompt_length: trimmed.length });

    try {
      const body = await generateDraftMock(trimmed);
      const isSummary = /summarize|summary|document|notice|agreement/i.test(trimmed);

      setAiResult({
        title: isSummary ? "Summary ready for review" : "Draft ready for review",
        kind: isSummary ? "summary" : "draft",
        body,
        promptPreview: trimmed.slice(0, 160),
      });

      router.push("/ai/result");
    } catch (error) {
      captureError(error, { flow: "assistant_generate" });
    } finally {
      setAssistantBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-navy-900"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={insets.top}
    >
      <ScreenLayout bottomInset={120}>
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-caption font-semibold uppercase tracking-[2px] text-ink-muted">AI workspace</Text>
            <Text className="mt-2 text-display text-ink-primary" accessibilityRole="header">
              Sahay Assistant
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Assistant information"
            className="h-11 w-11 items-center justify-center rounded-2xl border border-line bg-navy-800"
          >
            <Ionicons name="information-circle-outline" size={22} color="#A7B0C3" />
          </Pressable>
        </View>

        <AppCard className="mb-8">
          <Text className="text-caption font-semibold uppercase tracking-wide text-ink-muted">How this helps</Text>
          <Text className="mt-3 text-body text-ink-secondary">
            Summaries, formal drafts, and application scaffolding tuned for Indian institutions—always review before
            sending.
          </Text>
        </AppCard>

        <SectionTitle title="Your prompt" subtitle="Local mock drafts for testing — server AI via Edge Function later." />

        <TextInput
          multiline
          textAlignVertical="top"
          placeholder="Describe what you need—complaint, summary, or application…"
          placeholderTextColor="#6B7589"
          value={prompt}
          onChangeText={setPrompt}
          accessibilityLabel="Assistant prompt"
          className="min-h-[160px] rounded-3xl border border-line bg-navy-900 px-4 py-4 text-body text-ink-primary"
        />

        <View className="mt-6">
          <SuggestionChips onSelect={setPrompt} />
        </View>

        <View className="mt-10">
          <PrimaryButton
            loading={isAssistantBusy}
            disabled={!prompt.trim()}
            onPress={runMockGeneration}
            accessibilityLabel="Generate AI response"
          >
            Generate response
          </PrimaryButton>
          <Text className="mt-3 text-center text-caption text-ink-muted">
            Sahay will highlight missing facts before you share anything externally.
          </Text>
        </View>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
