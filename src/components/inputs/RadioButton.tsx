import React from "react";
import { Pressable, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppText } from "../AppText";
import { colors } from "../../theme";

/* ================= TYPES ================= */

type Props = {
  label: string;        // Text label
  selected: boolean;   // Selected state
  onSelect: () => void;// Select handler
};

/* ================= COMPONENT ================= */

export function RadioButton({ label, selected, onSelect }: Props) {
  return (
    <Pressable style={styles.row} onPress={onSelect}>
      <MaterialIcons
        name={selected ? "radio-button-checked" : "radio-button-unchecked"}
        size={22}
        color={selected ? colors.primary : colors.onSurfaceVariant}
      />
      <AppText variant="body">{label}</AppText>
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
});

/*
Usage Example:

const [gender, setGender] = useState("male");

<RadioButton
  label="Male"
  selected={gender === "male"}
  onSelect={() => setGender("male")}
/>

<RadioButton
  label="Female"
  selected={gender === "female"}
  onSelect={() => setGender("female")}
/>

*/
