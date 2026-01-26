import React, { useMemo } from "react";
import { StyleSheet, View, ScrollView, Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";

import { AppModal } from "./AppModal";
import { AppText } from "../AppText";
import { BtnApp } from "../buttons/BtnApp";
import { colors, spacing, radius } from "../../theme";

type DeviceInfoModalProps = {
  open: boolean;        // Modal visibility
  onClose: () => void;  // Close callback
};

export function DeviceInfoModal({ open, onClose }: DeviceInfoModalProps) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  // prevent modal overflow
  const bodyMaxHeight = Math.min(height * 0.62, 520);

  const info = useMemo(() => {
    const brand = DeviceInfo.getBrand();
    const model = DeviceInfo.getModel();
    const deviceId = DeviceInfo.getDeviceId();

    const systemName = DeviceInfo.getSystemName();
    const systemVersion = DeviceInfo.getSystemVersion();

    const appVersion = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();

    const isTablet = DeviceInfo.isTablet();

    return [
      { k: "Brand", v: brand },
      { k: "Model", v: model },
      { k: "Device ID", v: deviceId },

      { k: "OS", v: `${systemName} ${systemVersion}` },
      { k: "Tablet", v: isTablet ? "Yes" : "No" },

      { k: "App Version", v: appVersion },
      { k: "Build No.", v: buildNumber },

      // Safe area is what we care about for Oppo/Vivo/Realme
      { k: "SafeInsets Top", v: String(insets.top) },
      { k: "SafeInsets Bottom", v: String(insets.bottom) },
      { k: "SafeInsets Left", v: String(insets.left) },
      { k: "SafeInsets Right", v: String(insets.right) },
    ];
  }, [insets]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={<AppText variant="subtitle">Device Configuration</AppText>}
      actions={<BtnApp title="Close" variant="text" onPress={onClose} />}
    >
      {/* Scroll container prevents overflow top/bottom */}
      <ScrollView
        style={{ maxHeight: bodyMaxHeight }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: 4 }}
      >
        <View style={{ gap: spacing.md }}>
          {info.map((row) => (
            <View key={row.k} style={styles.row}>
              <AppText
                variant="caption"
                style={[
                  styles.key,
                  Platform.OS === "android"
                    ? { includeFontPadding: false, textAlignVertical: "center" }
                    : null,
                ]}
                numberOfLines={1}
              >
                {row.k}
              </AppText>

              <AppText
                variant="body"
                style={[
                  styles.value,
                  Platform.OS === "android"
                    ? { includeFontPadding: false, textAlignVertical: "center" }
                    : null,
                ]}
              >
                {row.v}
              </AppText>
            </View>
          ))}

          <View style={styles.note}>
            <AppText variant="caption" style={{ color: colors.onSurfaceVariant }}>
              SafeInsets values help debug cut/notch issues on Oppo/Vivo/Realme devices.
            </AppText>
          </View>
        </View>
      </ScrollView>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  key: {
    opacity: 0.7,
    marginBottom: 4,
  },
  value: {
    fontWeight: "700",
  },
  note: {
    padding: 12,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceVariant,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
});

/**
Usage Examples:

<DeviceInfoModal
  open={showInfo}
  onClose={() => setShowInfo(false)}
/>
*/
