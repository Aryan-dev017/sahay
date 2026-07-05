import { forwardRef, useState } from "react";
import { Text, TextInput, View, type TextInputProps } from "react-native";

export type InputFieldProps = TextInputProps & {
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
};

export const InputField = forwardRef<TextInput, InputFieldProps>(function InputField(
  { label, hint, error, containerClassName = "", className = "", onFocus, onBlur, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false);

  return (
    <View className={containerClassName}>
      <Text className="mb-2 text-caption font-semibold tracking-wide text-ink-secondary">{label}</Text>
      <TextInput
        ref={ref}
        placeholderTextColor="#6B7589"
        className={`rounded-2xl border bg-navy-900 px-4 py-3.5 text-body text-ink-primary ${error ? "border-danger" : focused ? "border-accent-ring" : "border-line"} ${className}`}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        accessibilityLabel={label}
        {...rest}
      />
      {hint && !error ? <Text className="mt-2 text-caption text-ink-muted">{hint}</Text> : null}
      {error ? (
        <Text accessibilityLiveRegion="polite" className="mt-2 text-caption text-danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
});
