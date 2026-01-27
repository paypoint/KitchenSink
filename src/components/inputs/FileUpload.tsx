import React, { useMemo, useState } from "react";
import { ActivityIndicator, Platform, Pressable, StyleSheet, View, ViewStyle } from "react-native";

import {
  pick,
  types as PickerTypes,
  DocumentPickerResponse,
} from "@react-native-documents/picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { AppText } from "../AppText";
import { radius, spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

/* ================= TYPES ================= */

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

type Props = {
  label?: string; // Field label
  value?: DocumentPickerResponse | null; // Selected file
  onChange: (file: DocumentPickerResponse | null) => void; // Change handler

  placeholder?: string; // Placeholder text
  helperText?: string; // Helper message
  error?: string; // Error message

  disabled?: boolean; // Disable picker
  loading?: boolean; // Show loader
  clearable?: boolean; // Show clear button

  leftIcon?: MaterialIconName; // Leading icon
  containerStyle?: ViewStyle; // Wrapper style

  /**
   * Allowed file types
   * Example: [PickerTypes.pdf, PickerTypes.images]
   */
  types?: string[];
};

/* ================= HELPERS ================= */

function formatSize(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

/* ================= COMPONENT ================= */

export function FileUpload({
  label = "Upload file",
  value,
  onChange,
  placeholder = "Choose file",
  helperText,
  error,
  disabled,
  loading,
  clearable = true,
  leftIcon = "upload-file",
  containerStyle,
  types = [PickerTypes.allFiles],
}: Props) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  // Show clear icon when file exists
  const showClear = clearable && !!value;

  // File metadata
  const meta = useMemo(() => {
    if (!value) return null;
    return {
      name: value.name ?? "Selected file",
      size: formatSize(value.size),
      type: value.type ?? "", // MIME type
    };
  }, [value]);

  // Open document picker
  const pickFile = async () => {
    if (disabled || loading) return;

    try {
      const res = await pick({
        mode: "open",
        allowMultiSelection: false,
        type: types,
      });

      onChange(res?.[0] ?? null);
    } catch (e: any) {
      if (e?.code === "DOCUMENT_PICKER_CANCELED") return;
      console.log("FileUpload picker error:", e);
    }
  };

  return (
    <View style={[{ gap: 6 }, containerStyle]}>
      {/* Label */}
      {label && <AppText variant="caption">{label}</AppText>}

      {/* Upload Field */}
      <Pressable
        onPress={pickFile}
        onPressIn={() => setFocused(true)}
        onPressOut={() => setFocused(false)}
        disabled={disabled || loading}
        android_ripple={{ color: colors.primaryContainer }}
        style={({ pressed }) => [
          styles.base,
          { borderColor: colors.outline, backgroundColor: colors.surface },
          focused && { borderColor: colors.primary },
          error && { borderColor: colors.error },
          disabled && styles.disabled,
          { opacity: pressed && Platform.OS === "ios" ? 0.88 : 1 },
        ]}
      >
        {/* Left Icon */}
        <View style={[styles.iconWrap, { backgroundColor: colors.primaryContainer }]}>
          <MaterialIcons
            name={meta ? "description" : leftIcon}
            size={20}
            color={disabled ? colors.onSurfaceVariant : colors.onPrimaryContainer}
          />
        </View>

        {/* Text */}
        <View style={{ flex: 1, minWidth: 0 }}>
          <AppText
            variant="body"
            numberOfLines={1}
            style={{
              color: meta ? colors.onSurface : colors.onSurfaceVariant,
            }}
          >
            {meta ? meta.name : placeholder}
          </AppText>

          {meta && (
            <AppText
              variant="caption"
              numberOfLines={1}
              style={styles.meta}
            >
              {meta.size || meta.type || "File selected"}
            </AppText>
          )}
        </View>

        {/* Right Action */}
        <View style={styles.right}>
          {loading ? (
            <ActivityIndicator color={colors.primary} />
          ) : showClear ? (
            <Pressable
              onPress={(e) => {
                e.stopPropagation(); // prevent picker open
                onChange(null);
              }}
              hitSlop={12}
              android_ripple={{ color: "rgba(0,0,0,0.10)", borderless: true }}
              style={styles.clearBtn}
            >
              <MaterialIcons
                name="close"
                size={18}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
          ) : (
            <MaterialIcons
              name="chevron-right"
              size={22}
              color={colors.onSurfaceVariant}
            />
          )}
        </View>
      </Pressable>

      {/* Helper / Error */}
      {(error || helperText) && (
        <AppText
          variant="caption"
          color={error ? colors.error : colors.onSurfaceVariant}
        >
          {error || helperText}
        </AppText>
      )}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: radius.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },

  disabled: {
    opacity: 0.55,
  },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  meta: {
    marginTop: 2,
    opacity: 0.8,
  },

  right: {
    width: 36,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  clearBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
Usage Example:

<FileUpload
  label="Resume"
  value={file}
  onChange={setFile}
  types={[PickerTypes.pdf]}
/>

<FileUpload
  label="Profile Picture"
  loading={isUploading}
  onChange={setFile}
/>
*/
