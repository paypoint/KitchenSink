import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { AppText } from "../AppText";
import { colors, spacing, radius } from "../../theme";

export type StepStatus = "completed" | "active" | "pending";

export type StepItem = {
    id: string;                 // Step identifier
    title: string;              // Step label
    status: StepStatus;         // Current state
    onPress?: () => void;       // Step click handler
};

type Props = {
    steps: StepItem[];          // List of steps
};

export function VerticalStepper({ steps }: Props) {
    return (
        <View>
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;

                return (
                    <View key={step.id} style={styles.row}>
                        {/* LEFT INDICATOR */}
                        <View style={styles.left}>
                            {/* Circle */}
                            <View
                                style={[
                                    styles.circle,
                                    step.status === "completed" && styles.completed,
                                    step.status === "active" && styles.active,
                                ]}
                            />

                            {/* Line */}
                            {!isLast && <View style={styles.line} />}
                        </View>

                        {/* CONTENT */}
                        <Pressable
                            disabled={!step.onPress}
                            onPress={step.onPress}
                            style={styles.content}
                        >
                            <AppText
                                variant="body"
                                color={
                                    step.status === "pending"
                                        ? colors.onSurfaceVariant
                                        : colors.onSurface
                                }
                            >
                                {step.title}
                            </AppText>

                            {step.onPress && (
                                <AppText variant="caption" color={colors.primary}>
                                    View
                                </AppText>
                            )}
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },

    /* LEFT SIDE */
    left: {
        width: 32,
        alignItems: "center",
    },

    circle: {
        width: 16,
        height: 16,
        borderRadius: radius.pill,
        backgroundColor: colors.outlineVariant,
        marginTop: 2,
    },

    completed: {
        backgroundColor: colors.primary,
    },

    active: {
        backgroundColor: colors.primary,
        borderWidth: 3,
        borderColor: colors.primaryContainer,
    },

    line: {
        flex: 1,
        width: 2,
        backgroundColor: colors.outlineVariant,
        marginTop: 4,
    },

    /* RIGHT SIDE */
    content: {
        flex: 1,
        paddingBottom: spacing.lg,
        paddingLeft: spacing.sm,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

/*
Usage Examples:

const steps = [
  { id: "1", title: "Order Placed", status: "completed" },
  { id: "2", title: "Processing", status: "active" },
  { id: "3", title: "Delivered", status: "pending" },
];

<VerticalStepper
  steps={steps}
/>
*/
