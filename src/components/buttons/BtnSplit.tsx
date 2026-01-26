import React from "react";
import { Platform, Pressable, StyleSheet, View, Vibration } from "react-native";
import { AppText } from "../AppText";
import { colors, radius } from "../../theme";

type Props = {
  title: string;                    // Main button label
  onPress?: () => void;             // Primary action
  onPressSecondary?: () => void;    // Right-side action
  secondaryIcon?: React.ReactNode;  // Custom right icon
  vibrationDuration?: number;       // Haptic feedback time
};

export function BtnSplit({
  title,
  onPress,
  onPressSecondary,
  secondaryIcon,
  vibrationDuration = 70,
}: Props) {
  return (
    <View style={styles.wrap}>
      {/* PRIMARY BUTTON */}
      <Pressable
        onPress={onPress ? () => {
          Vibration.vibrate(vibrationDuration);
          onPress();
        } : undefined}
        android_ripple={{ color: "rgba(255,255,255,0.18)" }}
        style={({ pressed }) => [
          styles.left,
          pressed && Platform.OS === "ios" && styles.pressed,
        ]}
      >
        {/* 🔑 CRITICAL FIX */}
        <View style={styles.textContainer}>
          <AppText
            variant="subtitle"
            color={colors.onPrimary}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </AppText>
        </View>
      </Pressable>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* SECONDARY BUTTON */}
      <Pressable
        onPress={onPressSecondary ? () => {
          Vibration.vibrate(vibrationDuration);
          onPressSecondary();
        } : undefined}
        android_ripple={{ color: "rgba(255,255,255,0.18)" }}
        style={({ pressed }) => [
          styles.right,
          pressed && Platform.OS === "ios" && styles.pressed,
        ]}
      >
        {secondaryIcon ?? <View style={styles.defaultDot} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 48,
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    overflow: "hidden",
  },

  left: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /* THIS FIXES ANDROID TEXT DISAPPEAR ISSUE */
  textContainer: {
    minWidth: 0,        // forces Android layout
    flexGrow: 1,        // ensures width allocation
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  right: {
    width: 54,
    alignItems: "center",
    justifyContent: "center",
  },

  divider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.22)",
  },

  pressed: {
    opacity: 0.88,
  },

  defaultDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
});

/*
Usage Example:

<BtnSplit
  title="Send"
  onPress={() => {}}
  onPressSecondary={() => {}}
  secondaryIcon={<Icon name="arrow-drop-down" size={20} color="#fff" />}
/>
*/
