import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View, ViewStyle, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FAB } from "./FAB";
import { useTheme } from "../../context/ThemeContext";

/* ================= TYPES ================= */

type FABMenuItem = {
  key: string;              // Unique ID
  label: string;            // Item label
  icon: React.ReactNode;    // Item icon
  onPress: () => void;      // Item action
};

type Props = {
  open: boolean;            // Menu open state
  onToggle: () => void;     // Toggle handler
  fabIcon: React.ReactNode; // Main FAB icon
  items: FABMenuItem[];     // Menu items list
  style?: ViewStyle;        // Custom style
};

const FAB_SIZE = 56;
const GAP = 12;

/* ================= COMPONENT ================= */

export function FABMenu({
  open,
  onToggle,
  fabIcon,
  items,
  style,
}: Props) {
  const { colors } = useTheme();
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets(); // Safe area for Android & iOS

  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: open ? 220 : 160,
      useNativeDriver: true,
    }).start();
  }, [open, anim]);

  const scrimOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      {/* ===================== Background Scrim ===================== */}
      {open && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onToggle}
        >
          <Animated.View
            style={[styles.scrim, { opacity: scrimOpacity, backgroundColor: colors.scrim }]}
          />
        </Pressable>
      )}

      {/* ===================== FAB Container (FIXED) ===================== */}
      <View
        pointerEvents="box-none"
        style={[
          styles.root,
          {
            bottom:
              15 +
              insets.bottom + // avoids navigation / home bar
              (Platform.OS === "android" ? 4 : 0),
          },
          style,
        ]}
      >
        {/* ===================== Menu Items ===================== */}
        <View
          pointerEvents={open ? "auto" : "none"}
          style={styles.itemsWrap}
        >
          {items
            .slice()
            .reverse()
            .map((item, index) => {
              const translateY = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  0,
                  -(index + 1) * (FAB_SIZE + GAP),
                ],
              });

              const opacity = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              });

              const scale = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.96, 1],
              });

              return (
                <Animated.View
                  key={item.key}
                  style={[
                    styles.item,
                    {
                      opacity,
                      transform: [{ translateY }, { scale }],
                    },
                  ]}
                >
                  <FAB
                    icon={item.icon}
                    label={item.label}
                    onPress={() => {
                      item.onPress();
                      onToggle();
                    }}
                  />
                </Animated.View>
              );
            })}
        </View>

        {/* ===================== Main FAB ===================== */}
        <FAB icon={fabIcon} onPress={onToggle} />
      </View>
    </>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    position: "absolute", // fixed on screen
    right: 18,
    zIndex: 999,
  },

  scrim: {
    ...StyleSheet.absoluteFillObject,
  },

  itemsWrap: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  item: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

/*
Usage Examples:

<FABMenu
  open={fabOpen}
  onToggle={() => setFabOpen(!fabOpen)}
  fabIcon={<MaterialIcons name="add" size={24} />}
  items={[
    {
      key: "scan",
      label: "Scan",
      icon: <MaterialIcons name="qr-code" size={20} />,
      onPress: () => console.log("Scan"),
    },
    {
      key: "file",
      label: "Upload",
      icon: <MaterialIcons name="upload" size={20} />,
      onPress: () => console.log("Upload"),
    },
  ]}
/>
*/
