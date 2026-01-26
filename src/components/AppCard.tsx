import React from "react";
import { Platform, View, ViewProps, ViewStyle, StyleProp } from "react-native";
import { colors, radius, shadows, spacing } from "../theme";

type Elevation = "sm" | "md" | "lg";

type Props = ViewProps & {
  style?: StyleProp<ViewStyle>; // Optional style override
  elevation?: Elevation;        // Shadow depth
  margin?: number;              // Optional margin
  padding?: number;             // Optional padding
  gap?: number;                 // Optional gap between children
};

export function AppCard({
  style,
  elevation = "sm",
  margin = spacing.lg,
  padding = spacing.lg,
  gap = 0,
  ...props
}: Props) {
  const androidElevation =
    elevation === "sm" ? 2 : elevation === "md" ? 4 : 6;

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: radius.xl,
          padding: padding,
          margin: margin,
          gap: gap,
          borderWidth: 1,
          borderColor: colors.outlineVariant,

          // Platform-specific elevation / shadow
          ...(Platform.OS === "android"
            ? { elevation: androidElevation }
            : shadows.card),
        },
        style,
      ]}
    />
  );
}

/*
Usage Examples : 

<AppCard>
  <AppText>Basic card content</AppText>
</AppCard>

<AppCard elevation="md" style={{ marginTop: 16 }}>
  <AppText variant="title">Card Title</AppText>
</AppCard>

<AppCard style={{ backgroundColor: colors.surfaceVariant }}>
  <AppText>Custom background</AppText>
</AppCard>
*/
