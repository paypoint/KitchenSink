import React from "react";
import { Pressable, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppText } from "../AppText";
import { useTheme } from "../../context/ThemeContext";

/* ================= TYPES ================= */

type Props = {
    label: string;        // Text label
    checked: boolean;     // Checked state
    onChange: () => void; // Toggle handler
};

/* ================= COMPONENT ================= */

export function CheckBox({ label, checked, onChange }: Props) {
    const { colors } = useTheme();

    return (
        <Pressable style={styles.row} onPress={onChange}>
            <MaterialIcons
                name={checked ? "check-box" : "check-box-outline-blank"}
                size={22}
                color={checked ? colors.primary : colors.onSurfaceVariant}
            />
            <AppText
                variant="body"
                style={styles.label}>
                {label}
            </AppText>
        </Pressable>
    );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 10,
    },
    label: {
        flex: 1,          // IMPORTANT
    },
});

/*
Usage Example:

<CheckBox
  label="Accept Terms"
  checked={true}
  onChange={() => {}}
/>
*/
