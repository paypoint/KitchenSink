import React from "react";
import { Platform, Pressable, StyleSheet, ViewStyle, Vibration } from "react-native";
import { AppText } from "../AppText";
import { colors, radius } from "../../theme";

type Props = {
  label: string;               // Toggle label text
  selected?: boolean;          // Active state
  onPress?: () => void;        // Callback when pressed
  style?: ViewStyle;           // Optional container style
  vibrationDuration?: number;  // Haptic feedback time
};

export function BtnToggle({ label, selected, onPress, style, vibrationDuration = 70 }: Props) {
  return (
    <Pressable
      onPress={onPress ? () => {
        Vibration.vibrate(vibrationDuration);
        onPress();
      } : undefined}
      android_ripple={{ color: "rgba(103,80,164,0.18)" }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected ? colors.primaryContainer : "transparent",
          borderColor: selected ? "transparent" : colors.outline,
          opacity: pressed && Platform.OS === "ios" ? 0.88 : 1,
        },
        style,
      ]}
    >
      <AppText
        variant="body"
        color={colors.onSurface}   // Readable text
        numberOfLines={1}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
Usage Example:

<BtnToggle
  label="Option A"
  selected
  onPress={() => {}}
/>

*/
