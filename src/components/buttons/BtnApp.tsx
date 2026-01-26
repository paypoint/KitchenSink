import React from "react";
import {
    ActivityIndicator,
    Platform,
    Pressable,
    StyleProp,
    ViewStyle,
    Vibration,
} from "react-native";
import { AppText } from "../AppText";
import { colors, radius, spacing } from "../../theme";
import { useResponsive } from "../../hooks/useResponsive";

export type BtnVariant = "filled" | "outlined" | "tonal" | "text";
export type BtnSize = "sm" | "md" | "lg";

export type BtnAppProps = {
    title: string;                  // Button text label
    onPress?: () => void;           // Click handler
    loading?: boolean;              // Show spinner
    disabled?: boolean;             // Disable interaction
    variant?: BtnVariant;           // Visual style
    size?: BtnSize;                 // Button dimensions
    fullWidth?: boolean;            // Stretch to container
    leading?: React.ReactNode;      // Icon before text
    trailing?: React.ReactNode;     // Icon after text
    style?: StyleProp<ViewStyle>;   // Custom style override
    vibrationDuration?: number;     // Haptic feedback time
};

// Base height per button size
const SIZE_HEIGHT: Record<BtnSize, number> = {
    sm: 36,
    md: 44,
    lg: 52,
};

export function BtnApp({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = "filled",
    size = "md",
    fullWidth = false,
    leading,
    trailing,
    style,
    vibrationDuration = 70,
}: BtnAppProps) {

    const isDisabled = disabled || loading;

    // Base height from size prop
    const baseHeight = SIZE_HEIGHT[size];

    // Responsive height adjustment
    const height = useResponsive(
        {
            xs: baseHeight - 4,
            sm: baseHeight,
            md: baseHeight,
            lg: baseHeight + 4,
        },
        baseHeight
    );

    // Background color
    const bgColor = variant === "filled" ? colors.primary : variant === "tonal" ? colors.primaryContainer : "transparent";

    // Border config
    const borderWidth = variant === "outlined" ? 1 : 0;
    const borderColor = variant === "outlined" ? colors.outline : "transparent";

    // Text color
    const textColor = variant === "filled" ? colors.onPrimary : variant === "tonal" ? colors.onPrimaryContainer : colors.primary;

    return (
        <Pressable
            disabled={isDisabled}
            onPress={isDisabled || !onPress ? undefined : () => {
                Vibration.vibrate(vibrationDuration);
                onPress();
            }}
            android_ripple={
                Platform.OS === "android" && !isDisabled ? { color: "rgba(103,80,164,0.18)" } : undefined
            }
            style={({ pressed }) => [
                {
                    height,
                    borderRadius: radius.lg,
                    backgroundColor: isDisabled ? colors.disabled : bgColor,
                    borderWidth,
                    borderColor: isDisabled ? colors.outlineVariant : borderColor,
                    paddingHorizontal: spacing.xl,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: spacing.sm,
                    width: fullWidth ? "100%" : undefined,
                    opacity: pressed && Platform.OS === "ios" && !isDisabled ? 0.85 : 1,
                },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={colors.onDisabled} />
            ) : (
                <>
                    {leading}
                    <AppText
                        variant="subtitle"
                        color={isDisabled ? colors.onDisabled : textColor}
                        numberOfLines={1}
                    >
                        {title}
                    </AppText>
                    {trailing}
                </>
            )}
        </Pressable>
    );
}


/*
Usage Example:

<BtnApp title="Submit" onPress={() => {}} />

<BtnApp
  title="Save"
  variant="outlined"
  onPress={() => {}}
  size="lg"
  fullWidth
/>

<BtnApp
  title="Delete"
  variant="tonal"
  loading={true}
  leading={<SomeIcon />}
  trailing={<AnotherIcon />}
/>
*/