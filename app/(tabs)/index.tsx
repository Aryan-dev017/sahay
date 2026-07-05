import { AppCard } from "@/components/ui/AppCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScreenLayout } from "@/components/layout/ScreenLayout";
import { mockUser } from "@/constants/mockData";
import { formatDueDate } from "@/lib/dates";
import { ReminderRow } from "@/features/home/ReminderRow";
import { useReminders } from "@/hooks/useReminders";
import { track } from "@/services/analytics";
import { useReminderStore } from "@/store/reminderStore";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { active, next, hasHydrated } = useReminders();
  const markComplete = useReminderStore((s) => s.markComplete);
  const deleteReminder = useReminderStore((s) => s.deleteReminder);

  const confirmDelete = (id: string, title: string) => {
    Alert.alert("Delete reminder", `Remove “${title}”?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteReminder(id),
      },
    ]);
  };

  return (
    <ScreenLayout>
      <View className="mb-8 flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-caption font-semibold uppercase tracking-[2px] text-ink-muted">Dashboard</Text>
          <Text className="mt-2 text-display text-ink-primary" accessibilityRole="header">
            Namaste, {mockUser.firstName}
          </Text>
          <Text className="mt-2 text-body text-ink-secondary">
            Here is a calm snapshot of what needs attention next in {mockUser.city}.
          </Text>
        </View>
        <Link href="/premium" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open premium upgrade"
            className="h-12 w-12 items-center justify-center rounded-2xl border border-line bg-navy-800"
          >
            <Ionicons name="diamond-outline" size={22} color="#A5B4FC" />
          </Pressable>
        </Link>
      </View>

      {!hasHydrated ? (
        <View className="mb-8 items-center py-12">
          <ActivityIndicator color="#A5B4FC" accessibilityLabel="Loading reminders" />
          <Text className="mt-3 text-caption text-ink-muted">Loading your reminders…</Text>
        </View>
      ) : next ? (
        <AppCard className="mb-8 border-accent/25 bg-navy-850">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-caption font-semibold uppercase tracking-wide text-accent-soft">Next up</Text>
              <Text className="mt-2 text-title text-ink-primary" numberOfLines={2}>
                {next.title}
              </Text>
              <Text className="mt-2 text-caption text-ink-muted">Due on {formatDueDate(next.dueDate)}</Text>
            </View>
            {next.amount ? (
              <View className="items-end">
                <Text className="text-title text-ink-primary">{next.amount}</Text>
              </View>
            ) : null}
          </View>
        </AppCard>
      ) : (
        <AppCard className="mb-8 border-line bg-navy-850">
          <Text className="text-caption font-semibold uppercase tracking-wide text-accent-soft">Next up</Text>
          <Text className="mt-2 text-title text-ink-primary">Nothing due yet</Text>
          <Text className="mt-2 text-caption text-ink-muted">Add your first bill, EMI, or deadline below.</Text>
        </AppCard>
      )}

      <View className="mb-8 flex-row gap-3">
        <View className="flex-1">
          <PrimaryButton
            leftIcon={<Ionicons name="add" size={20} color="#0B1220" />}
            onPress={() => router.push("/reminder/new")}
            accessibilityLabel="Add a new reminder"
          >
            Add reminder
          </PrimaryButton>
        </View>
        <Link href="/(tabs)/assistant" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open AI assistant"
            className="h-[52px] flex-1 items-center justify-center rounded-3xl border border-line bg-navy-800 px-4 active:opacity-90"
          >
            <Text className="text-center text-base font-semibold text-accent-soft">Ask Sahay</Text>
          </Pressable>
        </Link>
      </View>

      <SectionTitle
        title="Upcoming reminders"
        subtitle={hasHydrated ? `${active.length} active on this device` : "Loading…"}
      />

      {!hasHydrated ? null : active.length === 0 ? (
        <EmptyState
          title="No reminders yet"
          description="Track bills, EMIs, and deadlines locally. Everything stays on your phone until cloud sync ships."
          action={
            <PrimaryButton
              onPress={() => router.push("/reminder/new")}
              accessibilityLabel="Create your first reminder"
              leftIcon={<Ionicons name="add" size={20} color="#0B1220" />}
            >
              Create reminder
            </PrimaryButton>
          }
        />
      ) : (
        active.map((item) => (
          <ReminderRow
            key={item.id}
            reminder={item}
            onPress={() => router.push(`/reminder/${item.id}`)}
            onComplete={() => {
              markComplete(item.id);
              track("reminder_completed", { category: item.category });
            }}
            onDelete={() => confirmDelete(item.id, item.title)}
          />
        ))
      )}
    </ScreenLayout>
  );
}
