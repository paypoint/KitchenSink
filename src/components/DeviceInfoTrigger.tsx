import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { AppText } from "./AppText";
import { radius, spacing } from "../theme";
import { useTheme } from "../context/ThemeContext";

type Props = {
  onPress: () => void;
  style?: ViewStyle;
};

export function DeviceInfoTrigger({ onPress, style }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: colors.primaryContainer }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: colors.surface,
          borderColor: colors.outlineVariant,
          opacity: pressed ? 0.92 : 1
        },
        style,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.primaryContainer }]}>
        <MaterialIcons name="devices" size={20} color={colors.onPrimaryContainer} />
      </View>

      <View style={{ flex: 1 }}>
        <AppText variant="subtitle">Device Info</AppText>
        <AppText variant="caption" style={{ color: colors.onSurfaceVariant }}>
          Model, OS, resolution, safe-area
        </AppText>
      </View>

      <MaterialIcons name="chevron-right" size={24} color={colors.onSurfaceVariant} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 60,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
