import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { AppText } from "../AppText";
import { useTheme } from "../../context/ThemeContext";

/* Props */
type Props = {
    title: string;                  // Label above input
    value: string;                  // Current OTP value
    onChange: (val: string) => void;// Callback on change
    length?: number;                // Number of inputs
    helperText?: string;            // Helper text below
};

/* OTP Input */
export function OtpInput({
    title,
    value,
    onChange,
    length = 6,
    helperText,
}: Props) {
    const { colors } = useTheme();
    const inputs = useRef<TextInput[]>([]);

    /* Handle number input */
    const onInputChange = (text: string, index: number) => {
        const digit = text.replace(/[^0-9]/g, "");
        if (!digit) return;

        const arr = value.split("");
        arr[index] = digit;

        onChange(arr.join("").slice(0, length));

        if (index < length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    /* Handle backspace */
    const onBackspace = (key: string, index: number) => {
        if (key === "Backspace") {
            if (value[index]) {
                // If current field has a digit, delete it
                const arr = value.split("");
                arr[index] = "";
                onChange(arr.join(""));
            } else if (index > 0) {
                // If current field is empty, delete previous digit and move focus back
                const arr = value.split("");
                arr[index - 1] = "";
                onChange(arr.join(""));
                inputs.current[index - 1]?.focus();
            }
        }
    };

    return (
        <View>
            <AppText variant="subtitle">{title}</AppText>
            <View style={{ height: 16 }} />

            <View style={styles.row}>
                {Array.from({ length }).map((_, i) => (
                    <TextInput
                        key={i}
                        ref={(r) => {
                            if (r) inputs.current[i] = r;
                        }}
                        value={value[i] || ""}
                        style={[
                            styles.input,
                            {
                                borderColor: colors.outline,
                                color: colors.onSurface,
                                backgroundColor: colors.surface,
                            }
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        onChangeText={(t) => onInputChange(t, i)}
                        onKeyPress={(e) => onBackspace(e.nativeEvent.key, i)}
                    />
                ))}
            </View>

            {helperText && (
                <>
                    <View style={{ height: 12 }} />
                    <AppText variant="caption">{helperText}</AppText>
                </>
            )}
        </View>
    );
}

/* Styles */
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
    },
    input: {
        width: 36,
        height: 56,
        borderRadius: 12,
        borderWidth: 1,
        fontSize: 18,
    },
});

/*
Usage Example:

<OtpInput
  title="Enter OTP"
  value={otp}
  onChange={setOtp}
  length={4}
/>
*/
