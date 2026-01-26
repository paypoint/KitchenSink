import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { AppText } from "../AppText";
import { colors, spacing } from "../../theme";

/* ================= TYPES ================= */

export type StepStatus = "completed" | "active" | "pending";

export interface HorizontalStep {
  id: string;                   // Step identifier
  title: string;                // Step label
  status: StepStatus;           // Current state
  onPress?: () => void;         // Step click handler
}

interface HorizontalStepperProps {
  steps: HorizontalStep[];      // List of steps
}

/* ================= COMPONENT ================= */

export const HorizontalStepper = ({ steps }: HorizontalStepperProps) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = step.status === "completed";
        const isActive = step.status === "active";

        return (
          <View key={step.id} style={styles.stepWrapper}>
            {/* Step circle */}
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!step.onPress}
              onPress={step.onPress}
              style={[
                styles.circle,
                isCompleted && styles.completedCircle,
                isActive && styles.activeCircle,
              ]}
            >
              {isCompleted ? (
                <MaterialIcons name="check" size={16} color={colors.onPrimary} />
              ) : (
                <AppText
                  variant="caption"
                  style={{
                    color: isActive ? colors.primary : colors.onSurfaceVariant,
                  }}
                >
                  {index + 1}
                </AppText>
              )}
            </TouchableOpacity>

            {/* Title */}
            <AppText
              variant="caption"
              style={[
                styles.label,
                isActive && { color: colors.primary },
              ]}
            >
              {step.title}
            </AppText>

            {/* Connector line */}
            {index !== steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  isCompleted && styles.completedLine,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

/* ================= STYLES ================= */

const CIRCLE_SIZE = 28;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
  },

  stepWrapper: {
    alignItems: "center",
    flex: 1,
  },

  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.outline,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },

  completedCircle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  activeCircle: {
    borderColor: colors.primary,
  },

  label: {
    marginTop: spacing.xs,
    textAlign: "center",
    color: colors.onSurfaceVariant,
  },

  line: {
    position: "absolute",
    top: CIRCLE_SIZE / 2,
    left: "50%",
    right: "-50%",
    height: 2,
    backgroundColor: colors.outline,
    zIndex: -1,
  },

  completedLine: {
    backgroundColor: colors.primary,
  },
});

/*
Usage Examples:

const steps = [
  { id: "1", title: "Cart", status: "completed" },
  { id: "2", title: "Address", status: "active" },
  { id: "3", title: "Payment", status: "pending" },
];

<HorizontalStepper
  steps={steps}
/>
*/
