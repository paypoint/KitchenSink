import React from "react";
import { Platform, Pressable, StyleSheet, ViewStyle } from "react-native";
import { AppText } from "../AppText";
import { spacing, radius } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export type ChipVariant = "filled" | "outlined";

type ChipTagProps = {
  label: string;                // Chip text
  variant?: ChipVariant;        // Visual style
  selected?: boolean;           // Active state
  disabled?: boolean;           // Disable interaction
  onPress?: () => void;         // Press handler
  style?: ViewStyle;            // Custom style
};

export function ChipTag({
  label,
  variant = "outlined",
  selected = false,
  disabled = false,
  onPress,
  style,
}: ChipTagProps) {
  const { colors } = useTheme();
  const isFilled = variant === "filled" || selected;

  const bgColor = isFilled ? colors.primaryContainer : "transparent";
  const borderColor = isFilled ? "transparent" : colors.outline;
  const textColor = disabled
    ? colors.onDisabled
    : isFilled
      ? colors.onPrimaryContainer
      : colors.onSurfaceVariant;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ color: colors.primaryContainer }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: disabled ? colors.disabled : bgColor,
          borderColor,
          opacity: pressed && Platform.OS === "ios" ? 0.85 : 1,
        },
        style,
      ]}
    >
      <AppText
        variant="body"
        color={textColor}
        numberOfLines={1}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start", // prevent full width
    height: 32,              // Material size
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
Usage Examples:

<ChipTag label="Chip" />

<ChipTag
  label="Selected"
  selected
/>

<ChipTag
  label="Filled"
  variant="filled"
  onPress={() => {}}
/>
*/
