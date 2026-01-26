import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "../AppText";
import { colors } from "../../theme";

type Props = {
  title: string;                            // Notification title
  message?: string;                         // Optional body text
  type?: "success" | "error" | "warning";   // Visual style
  duration?: number;                        // Auto-dismiss time (ms)
  onHide?: () => void;                      // Callback when closed
};

const bgMap = {
  success: colors.success,
  error: colors.error,
  warning: colors.warning,
};

const { width } = Dimensions.get("window");

export function NotificationCard({
  title,
  message,
  type = "success",
  duration = 3000,
  onHide,
}: Props) {
  const translateY = useRef(new Animated.Value(-120)).current;
  const insets = useSafeAreaInsets(); // notch safe

  useEffect(() => {
    // Slide down
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto hide
    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -120,
        duration: 300,
        useNativeDriver: true,
      }).start(onHide);
    }, duration);

    return () => {
      clearTimeout(timer); // ESLint safe
    };
  }, [duration, onHide, translateY]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          top: insets.top + 4, // below notch
          transform: [{ translateY }],
        },
      ]}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: bgMap[type] },
        ]}
      >
        <AppText variant="title" style={styles.title}>
          {title}
        </AppText>

        {message && (
          <AppText variant="body" style={styles.message}>
            {message}
          </AppText>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width,
    zIndex: 9999,
  },
  container: {
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 12,
  },
  title: {
    color: colors.onPrimary,
  },
  message: {
    color: colors.onPrimary,
    marginTop: 4,
  },
});

/*
Usage Examples:

<NotificationCard
  title="Success"
  message="Data saved successfully"
  type="success"
  onHide={() => console.log("Closed")}
/>
*/
