import React, { useRef, useState } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
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
  error?: string;                 // Error message
  helperText?: string;            // Helper text
  variant?: "outlined" | "filled" | "underlined"; // Visual style
  leftIcon?: MaterialIconName;    // Icon on left
  rightIcon?: MaterialIconName;   // Icon on right
  onRightIconPress?: () => void;  // Right icon action
  clearable?: boolean;            // Show clear button
  containerStyle?: ViewStyle;     // Wrapper style
};

/* ================= COMPONENT ================= */

export function AppInput({
  label,
  error,
  helperText,
  variant = "outlined",
  leftIcon,
  rightIcon,
  onRightIconPress,
  clearable,
  containerStyle,
  style,
  value,
  onChangeText,
  multiline,
  ...props
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const showClear = clearable && focused && value && value.length > 0;

  return (
    <View style={[{ gap: 6 }, containerStyle]}>
      {/* Label */}
      {label && <AppText variant="caption">{label}</AppText>}

      {/* Input Wrapper */}
      <View
        style={[
          styles.base,
          styles[variant],
          focused && styles.focused,
          error && styles.error,
          multiline && styles.textArea,
        ]}
      >
        {/* Left Icon */}
        {leftIcon && (
          <MaterialIcons
            name={leftIcon}
            size={20}
            color={colors.onSurfaceVariant}
          />
        )}

        {/* Input */}
        <TextInput
          ref={inputRef}
          {...props}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          placeholderTextColor={colors.onSurfaceVariant}
          allowFontScaling={false}
          style={[
            styles.input,
            multiline && styles.multilineInput,
            style,
          ]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {/* Clear Button */}
        {showClear && (
          <TouchableOpacity
            onPress={() => onChangeText?.("")}
            hitSlop={10}
          >
            <MaterialIcons
              name="close"
              size={18}
              color={colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        )}

        {/* Right Icon */}
        {!showClear && rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            hitSlop={10}
          >
            <MaterialIcons
              name={rightIcon}
              size={20}
              color={colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        )}
      </View>

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

const styles = {
  base: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: spacing.lg,
  },

  outlined: {
    borderWidth: 1,
    borderRadius: radius.lg,
    borderColor: colors.outline,
  },

  filled: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: radius.lg,
  },

  underlined: {
    borderBottomWidth: 1,
    borderColor: colors.outline,
  },

  focused: {
    borderColor: colors.primary,
  },

  error: {
    borderColor: colors.error,
  },

  textArea: {
    minHeight: 120,
    alignItems: "flex-start",
    paddingVertical: spacing.md,
  },

  input: {
    flex: 1,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: typography.body.fontWeight,
    color: colors.onSurface,
    paddingVertical: Platform.OS === "android" ? 0 : spacing.sm,
  },

  multilineInput: {
    textAlignVertical: "top",
  },
} as const;

/*
Usage Example:

<AppInput
  label="Email"
  placeholder="Enter email"
/>

<AppInput
  label="Password"
  secureTextEntry
  error="Password is required"
/>

<AppInput
  label="Search"
  leftIcon="search"
  clearable
/>

<AppInput
  label="Bio"
  multiline
  helperText="Max 20 characters"
/>

*/
