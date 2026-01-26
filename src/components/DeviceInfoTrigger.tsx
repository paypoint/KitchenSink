import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { AppText } from "./AppText";
import { colors, radius, spacing } from "../theme";

type Props = {
  onPress: () => void;
  style?: ViewStyle;
};

export function DeviceInfoTrigger({ onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(103,80,164,0.12)" }}
      style={({ pressed }) => [
        styles.base,
        { opacity: pressed ? 0.92 : 1 },
        style,
      ]}
    >
      <View style={styles.iconWrap}>
        <MaterialIcons name="devices" size={20} color={colors.primary} />
      </View>

      <View style={{ flex: 1 }}>
        <AppText variant="subtitle">Device Info</AppText>
        <AppText variant="caption" style={{ opacity: 0.7 }}>
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
    borderColor: colors.outlineVariant,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(103,80,164,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
});
