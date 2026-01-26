import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  StyleProp,
} from "react-native";
import { typography } from "../theme/typography";
import { colors } from "../theme";

/**
 * Available typography variants from theme
 */
export type TextVariant = keyof typeof typography;

type Props = TextProps & {
  variant?: TextVariant;            // Typography style (body, title, caption, etc.)
  color?: string;                   // Optional text color override
  style?: StyleProp<TextStyle>;     // Additional style overrides
};

export function AppText({
  variant = "body",
  color,
  style,
  ...rest
}: Props) {
  return (
    <Text
      {...rest}
      allowFontScaling={false}
      maxFontSizeMultiplier={1}
      style={[
        styles.base,                 // Platform fixes + default color
        typography[variant],         // Typography from theme
        color ? { color } : null,    // Custom color if provided
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.onSurface,

    // Android font padding & alignment fix
    ...(Platform.OS === "android"
      ? {
          includeFontPadding: false,
          textAlignVertical: "center",
        }
      : {}),
  },
});

/*
Usage Examples: 

<AppText>Default body text</AppText>

<AppText variant="title">
  Section Title
</AppText>

<AppText variant="caption" color={colors.outline}>
  Helper text
</AppText>

<AppText style={{ marginTop: 8 }}>
  Custom styled text
</AppText>
*/
