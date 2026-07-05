import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { categoryOptions } from "@/constants/reminders";
import { formatDueDate, parseIsoDate, toIsoDateString } from "@/lib/dates";
import type { ReminderCategory, ReminderInput } from "@/types/reminder";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

type ReminderFormProps = {
  initialValues?: Partial<ReminderInput>;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: ReminderInput) => void;
};

const defaultDueDate = toIsoDateString(new Date(Date.now() + 3 * 86_400_000));

export function ReminderForm({ initialValues, submitLabel, loading, onSubmit }: ReminderFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [category, setCategory] = useState<ReminderCategory>(initialValues?.category ?? "bills");
  const [amount, setAmount] = useState(initialValues?.amount ?? "");
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? defaultDueDate);
  const [showPicker, setShowPicker] = useState(false);
  const [titleError, setTitleError] = useState<string | undefined>();

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setTitleError("Add a short title so you can spot this reminder later.");
      return;
    }

    setTitleError(undefined);
    onSubmit({
      title: trimmed,
      category,
      dueDate,
      amount: amount.trim() || undefined,
    });
  };

  const onDateChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selected) setDueDate(toIsoDateString(selected));
  };

  return (
    <>
      <SectionTitle
        title="Details"
        subtitle="Saved on this device. Cloud sync arrives in a later phase."
      />

      <InputField
        label="Title"
        placeholder="e.g. Broadband bill — ACT Fibernet"
        value={title}
        onChangeText={setTitle}
        error={titleError}
      />

      <InputField
        label="Amount (optional)"
        placeholder="e.g. ₹2,840"
        value={amount}
        onChangeText={setAmount}
        containerClassName="mt-6"
        keyboardType="default"
      />

      <Text className="mb-3 mt-8 text-caption font-semibold uppercase tracking-wide text-ink-muted">Category</Text>
      <View className="flex-row flex-wrap gap-2">
        {categoryOptions.map((option) => {
          const active = category === option.value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              onPress={() => setCategory(option.value)}
              className={`rounded-full border px-4 py-2 ${active ? "border-accent bg-accent-muted" : "border-line bg-navy-800"}`}
            >
              <Text className={`text-caption font-semibold ${active ? "text-accent-soft" : "text-ink-secondary"}`}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Choose due date"
        onPress={() => setShowPicker(true)}
        className="mt-8 rounded-3xl border border-line bg-navy-800/80 p-4 active:opacity-90"
      >
        <Text className="text-caption font-semibold uppercase tracking-wide text-ink-muted">Due date</Text>
        <Text className="mt-3 text-title text-ink-primary">{formatDueDate(dueDate)}</Text>
        <Text className="mt-2 text-caption text-ink-muted">Tap to change</Text>
      </Pressable>

      {showPicker ? (
        <DateTimePicker
          value={parseIsoDate(dueDate)}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
        />
      ) : null}

      <View className="mt-10">
        <PrimaryButton
          loading={loading}
          onPress={handleSubmit}
          accessibilityLabel={submitLabel}
          leftIcon={<Ionicons name="checkmark" size={20} color="#0B1220" />}
        >
          {submitLabel}
        </PrimaryButton>
      </View>
    </>
  );
}
