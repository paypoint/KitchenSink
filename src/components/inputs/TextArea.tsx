import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { AppText } from "../AppText";
import { colors, radius, spacing, typography } from "../../theme";

/* ================= TYPES ================= */

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

type Props = TextInputProps & {
  label?: string;                 // Field label
  helperText?: string;            // Helper text
  error?: string;                 // Error message
  leftIcon?: MaterialIconName;    // Icon on left
  rightIcon?: MaterialIconName;   // Icon on right
  onRightIconPress?: () => void;  // Right icon action
  clearButtonMode?: "never" | "while-editing"; // Clear button behavior
};

/* ================= COMPONENT ================= */

export function TextArea({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  clearButtonMode = "never",
  style,
  value,
  onChangeText,
  editable = true,
  ...props
}: Props) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<TextInput>(null);

  const showClear =
    clearButtonMode === "while-editing" &&
    focused &&
    !!value &&
    value.length > 0;

  const handleClear = () => {
    onChangeText?.("");
    ref.current?.focus();
  };

  return (
    <View style={{ gap: 6 }}>
      {/* Label */}
      {label && <AppText variant="caption">{label}</AppText>}

      {/* Input wrapper */}
      <View
        style={[
          styles.container,
          focused && !error && styles.focused,
          error && styles.error,
          !editable && styles.disabled,
        ]}
      >
        {leftIcon && (
          <MaterialIcons
            name={leftIcon}
            size={20}
            color={error ? colors.error : colors.onSurfaceVariant}
          />
        )}

        <TextInput
          ref={ref}
          {...props}
          multiline
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          style={[styles.input, style]}
          placeholderTextColor={colors.onSurfaceVariant}
          textAlignVertical="top" // ✅ Android fix
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {showClear ? (
          <TouchableOpacity onPress={handleClear}>
            <MaterialIcons
              name="close"
              size={20}
              color={colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        ) : (
          rightIcon && (
            <TouchableOpacity onPress={onRightIconPress}>
              <MaterialIcons
                name={rightIcon}
                size={20}
                color={colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Helper / Error */}
      {(helperText || error) && (
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
  container: {
    minHeight: 120,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
    borderColor: colors.outline,
    backgroundColor: colors.surface,
  },

  focused: {
    borderColor: colors.primary,
  },

  error: {
    borderColor: colors.error,
  },

  disabled: {
    opacity: 0.5,
  },

  input: {
    flex: 1,
    minHeight: Platform.OS === "ios" ? 100 : undefined,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: typography.body.fontWeight,
    color: colors.onSurface,
    padding: 0, // important for multiline
  },
});

/*
Usage Example:

<TextArea
  label="Description"
  placeholder="Enter details"
  value={text}
  onChangeText={setText}
/>

<TextArea
  label="Notes"
  helperText="Max 500 characters"
  leftIcon="edit"
  clearButtonMode="while-editing"
  value={notes}
  onChangeText={setNotes}
/>

<TextArea
  label="Reason"
  error="This field is required"
  value={reason}
  onChangeText={setReason}
/>

*/
