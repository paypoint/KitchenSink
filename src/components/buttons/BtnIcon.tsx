/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Platform, Pressable, View, ViewStyle, Vibration } from "react-native";
import { radius } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

type Props = {
  icon: React.ReactNode;     // Icon element (MaterialIcon, SVG, etc.)
  onPress?: () => void;     // Callback when button is pressed
  disabled?: boolean;       // Disable press interaction
  selected?: boolean;       // Selected / active state
  size?: number;            // Button width & height
  iconSize?: number;        // Icon container size
  style?: ViewStyle;        // Extra container styling
  vibrationDuration?: number; // Haptic feedback time
};

export function BtnIcon({
  icon,
  onPress,
  disabled,
  selected,
  size = 40,
  iconSize = 22,
  style,
  vibrationDuration = 70,
}: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress ? () => {
        Vibration.vibrate(vibrationDuration);
        onPress();
      } : undefined}
      android_ripple={{ color: "rgba(103,80,164,0.18)", borderless: true }}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: radius.pill,
          alignItems: "center",
          justifyContent: "center",

          // Material state handling
          backgroundColor: selected
            ? colors.primaryContainer          // selected state
            : pressed
            ? "rgba(103,80,164,0.12)"           // pressed state layer
            : "transparent",

          // iOS press feedback
          opacity: pressed && Platform.OS === "ios" ? 0.85 : 1,

          // disabled state
          ...(disabled ? { opacity: 0.38 } : {}),
        },
        style,
      ]}
    >
      <View
        style={{
          width: iconSize,
          height: iconSize,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
    </Pressable>
  );
}

/*
Usage Example:

<BtnIcon
  icon={<MaterialIcons name="favorite" size={20} color="#fff" />}
  onPress={() => console.log("Icon pressed")}
  selected={true}
  size={48}
  iconSize={24}
/>
*/
