import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../theme";

/* ================= TYPES ================= */

type AppActionSheetProps = {
  open: boolean;                // Show / hide sheet
  onClose: () => void;          // Close callback
  children: React.ReactNode;    // Sheet content
  title?: React.ReactNode;      // Optional header
  maxHeightRatio?: number;      // Default 70% height
  containerStyle?: ViewStyle;   // Custom style
  scrollable?: boolean;         // Auto scroll content
};

/* ================= COMPONENT ================= */

export function AppActionSheet({
  open,
  onClose,
  children,
  title,
  maxHeightRatio = 0.7,
  containerStyle,
  scrollable = true,
}: AppActionSheetProps) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const translateY = useRef(new Animated.Value(height)).current;
  const scrim = useRef(new Animated.Value(0)).current;

  // Center sheet on tablets
  const sheetWidth = useMemo(() => {
    if (width >= 768) return Math.min(560, width - 64);
    return width;
  }, [width]);

  const maxHeight = Math.floor(height * maxHeightRatio);

  /* ===== Open / Close animation ===== */
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scrim, {
        toValue: open ? 1 : 0,
        duration: open ? 180 : 140,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: open ? 0 : height,
        duration: open ? 240 : 200,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, height, scrim, translateY]);

  return (
    <Modal transparent visible={open} animationType="none" onRequestClose={onClose}>
      {/* Background scrim */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.scrim,
              opacity: scrim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.45],
              }),
            },
          ]}
        />
      </Pressable>

      {/* Sheet */}
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <Animated.View
          style={[
            styles.sheet,
            {
              width: sheetWidth,
              maxHeight,
              paddingBottom: Math.max(12, insets.bottom + 10),
              transform: [{ translateY }],
            },
            containerStyle,
          ]}
        >
          {/* Drag handle */}
          <View style={styles.handleWrap}>
            <View style={styles.handle} />
          </View>

          {/* Title */}
          {title ? <View style={styles.titleRow}>{title}</View> : null}

          {/* Content */}
          {scrollable ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          ) : (
            <View style={styles.content}>{children}</View>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: -8 },
      },
      android: {
        elevation: 18,
      },
    }),
  },

  handleWrap: {
    paddingVertical: 10,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.outlineVariant,
  },

  titleRow: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});

/* 
Usage Examples:

const [open, setOpen] = useState(false);

<AppActionSheet
  open={open}
  onClose={() => setOpen(false)}
  title={<AppText variant="title">Options</AppText>}
>
  <AppText>Item 1</AppText>
  <AppText>Item 2</AppText>
</AppActionSheet>
*/