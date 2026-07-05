import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home-outline",
  assistant: "sparkles-outline",
  profile: "person-outline",
};

const labels: Record<string, string> = {
  index: "Home",
  assistant: "Assistant",
  profile: "Profile",
};

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-t border-line bg-navy-900/95"
      style={{ paddingBottom: Math.max(insets.bottom, 12), paddingTop: 10 }}
    >
      <View className="flex-row items-center justify-around px-2">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const color = isFocused ? "#A5B4FC" : "#6B7589";
          const iconName = icons[route.name] ?? "ellipse-outline";

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={options.title ?? labels[route.name] ?? route.name}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              hitSlop={12}
              className="items-center justify-center px-4 py-1"
            >
              <Ionicons name={iconName} size={24} color={color} />
              <Text className={`mt-1 text-[11px] ${isFocused ? "font-semibold text-accent-soft" : "text-ink-muted"}`}>
                {labels[route.name] ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
