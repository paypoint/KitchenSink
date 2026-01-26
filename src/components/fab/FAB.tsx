import React from "react";
import {Platform,Pressable,StyleSheet,Text,View,ViewStyle} from "react-native";

import { colors, spacing, radius } from '../../theme';

/* ================= TYPES ================= */

type Props = {
    icon: React.ReactNode;          // Icon inside FAB
    label?: string;                 // If provided -> Extended FAB
    onPress?: () => void;           // Press handler
    style?: ViewStyle;              // Custom container style
};

/* ================= COMPONENT ================= */

export function FAB({ icon, label, onPress, style }: Props) {
    const isExtended = !!label;

    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: "rgba(0,0,0,0.12)", borderless: true }}
            style={({ pressed }) => [
                styles.base,
                isExtended ? styles.extended : styles.normal,
                {
                    opacity: pressed && Platform.OS === "ios" ? 0.88 : 1,
                },
                style,
            ]}
        >
            {/* Icon */}
            <View style={styles.icon}>{icon}</View>

            {/* Label (Extended FAB only) */}
            {isExtended && (
                <Text
                    allowFontScaling={false}
                    maxFontSizeMultiplier={1}
                    numberOfLines={1}
                    style={[
                        styles.label,
                        Platform.OS === "android" && {
                            includeFontPadding: false,
                            textAlignVertical: "center",
                        },
                    ]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    base: {
        backgroundColor: colors.primaryContainer,
        borderRadius: radius.xl,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        // Platform shadow
        ...Platform.select({
            android: { elevation: 8 },
            ios: {
                shadowColor: "#000",
                shadowOpacity: 0.18,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 6 },
            },
        }),
    },

    // Default FAB
    normal: {
        width: 56,
        height: 56,
    },

    // Extended FAB
    extended: {
        height: 56,
        paddingHorizontal: spacing.xl,
        gap: spacing.sm,
    },

    icon: {
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    label: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "700",
        color: colors.onSurface,
    },
});

/*
Usage Examples:

<FAB
  icon={<MaterialIcons name="add" size={24} color="#000" />}
  onPress={() => {}}
/>

<FAB
  icon={<MaterialIcons name="edit" size={24} color="#000" />}
  label="Create"
  onPress={() => {}}
/>
*/