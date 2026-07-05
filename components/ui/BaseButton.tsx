import { colors, touchTargets } from "@/constants/theme";
import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, type PressableProps } from "react-native";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

export type BaseButtonProps = PressableProps & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent active:opacity-90",
  secondary: "bg-navy-700 border border-line active:opacity-90",
};

const textClasses: Record<ButtonVariant, string> = {
  primary: "text-navy-900 font-semibold",
  secondary: "text-ink-primary font-semibold",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-3.5 rounded-2xl",
  lg: "px-6 py-4 rounded-3xl",
};

export function BaseButton({
  children,
  variant = "primary",
  size = "lg",
  loading = false,
  leftIcon,
  disabled,
  accessibilityLabel,
  ...rest
}: BaseButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={accessibilityLabel}
      disabled={isDisabled}
      className={`flex-row items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${isDisabled ? "opacity-40" : ""}`}
      style={{ minHeight: touchTargets.minHeight }}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#F4F6FB" : colors.accent} />
      ) : (
        <>
          {leftIcon}
          <Text className={`text-base ${textClasses[variant]} ${leftIcon ? "ml-2" : ""}`}>{children}</Text>
        </>
      )}
    </Pressable>
  );
}
