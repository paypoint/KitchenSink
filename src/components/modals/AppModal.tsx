import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Modal, Platform, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";

type AppModalProps = {
  open: boolean;                // Modal visibility
  onClose: () => void;          // Close callback
  title?: React.ReactNode;      // Header content
  children: React.ReactNode;    // Body content
  actions?: React.ReactNode;    // Footer buttons
};

export function AppModal({
  open,
  onClose,
  title,
  children,
  actions,
}: AppModalProps) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  // animation values
  const scale = useRef(new Animated.Value(0.96)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // responsive dialog width
  const dialogWidth = useMemo(() => {
    if (width >= 768) return Math.min(560, width - 64);
    return Math.min(560, width - 32);
  }, [width]);

  // open / close animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: open ? 160 : 120,
        easing: open
          ? Easing.out(Easing.quad)
          : Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: open ? 1 : 0.96,
        duration: open ? 200 : 120,
        easing: open ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, opacity, scale]);

  return (
    <Modal
      transparent
      visible={open}
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Background scrim */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.scrim,
              opacity: opacity,
            },
          ]}
        />
      </Pressable>

      {/* Center dialog */}
      <View style={styles.root}>
        <Animated.View
          style={[
            styles.dialog,
            {
              width: dialogWidth,
              opacity,
              transform: [{ scale }],
              backgroundColor: colors.surface,
            },
          ]}
        >
          {/* Title */}
          {title ? <View style={styles.title}>{title}</View> : null}

          {/* Body */}
          <View style={styles.body}>{children}</View>

          {/* Actions */}
          {actions ? <View style={styles.actions}>{actions}</View> : null}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  dialog: {
    borderRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 14,

    // platform shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
      },
      android: {
        elevation: 22,
      },
      default: {},
    }),
  },

  title: {
    paddingBottom: 10,
  },

  body: {
    paddingBottom: 16,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});

/*
Usage Examples:

<AppModal
  open={showModal}
  onClose={() => setShowModal(false)}
  title={<AppText variant="title">Confirm</AppText>}
  actions={<BtnApp title="OK" onPress={() => {}} />}
>
  <AppText>Are you sure?</AppText>
</AppModal>
*/
