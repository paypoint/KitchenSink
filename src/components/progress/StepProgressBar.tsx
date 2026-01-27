import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { radius, spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

/* ================= TYPES ================= */

type Props = {
  steps: number;          // Total steps (ex: 3)
  currentStep: number;    // Active step (1-based index)
  style?: ViewStyle;      // Custom style
};

/* ================= COMPONENT ================= */

export function StepProgressBar({
  steps,
  currentStep,
  style,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: steps }).map((_, index) => {
        const isCompleted = index < currentStep;

        return (
          <View
            key={index}
            style={[
              styles.step,
              {
                backgroundColor: isCompleted
                  ? colors.primary
                  : colors.outlineVariant,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: radius.pill,
  },
});

/*
Usage Examples:

<StepProgressBar
  steps={3}
  currentStep={1}
  style={{ marginVertical: 20 }}
/>
*/
