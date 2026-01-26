import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode; // Buttons inside the group
  gap?: number;              // Space between buttons
  style?: ViewStyle;         // Extra container styling
};

export function BtnGroup({ children, gap = 12, style }: Props) {
  return (
    <View
      style={[
        styles.row,  // Horizontal layout
        { gap },     // Dynamic spacing between buttons
        style,       // Custom styles from user
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", // Place buttons in a row
    flexWrap: "wrap",     // Move to next line if space is less
  },
});

/*
Usage Example:

<BtnGroup gap={16} style={{ marginVertical: 20 }}>
  <BtnApp title="Save" onPress={() => {}} />
  <BtnApp title="Cancel" variant="outlined" onPress={() => {}} />
</BtnGroup>
*/
