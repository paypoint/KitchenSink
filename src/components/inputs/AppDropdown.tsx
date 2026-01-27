import React from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../../context/ThemeContext";
import { AppText } from "../AppText";

/**
 * Dropdown option structure
 */
type Option = {
  label: string; // Text shown to user
  value: string; // Actual value returned on select
};

/**
 * AppDropdown Props
 */
type Props = {
  label?: string;        // Field label shown above dropdown
  value?: string;        // Selected value
  options: Option[];     // List of dropdown options
  placeholder?: string; // Placeholder when no value selected
  searchable?: boolean; // Enable search inside dropdown
  disabled?: boolean;   // Disable dropdown interaction
  error?: string;       // Error message shown below dropdown

  onChange: (value: string) => void; // Callback when value changes
};

export function AppDropdown({
  label,
  value,
  options,
  placeholder = "Select",
  searchable = false,
  disabled = false,
  error,
  onChange,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      {label && (
        <AppText variant="title" style={[styles.label, { color: colors.onSurfaceVariant }]}>
          {label}
        </AppText>
      )}

      {/* Dropdown */}
      <Dropdown
        style={[
          styles.dropdown,
          {
            backgroundColor: colors.surface,
            borderColor: colors.outlineVariant,
          },
          error && { borderColor: colors.error },
          disabled && { backgroundColor: colors.disabled },
        ]}
        containerStyle={[styles.dropdownContainer, { backgroundColor: colors.surface }]}
        itemContainerStyle={styles.itemContainer} // Each item container
        itemTextStyle={[styles.itemText, { color: colors.onSurface }]}

        data={options}               // Options list
        labelField="label"           // Display field
        valueField="value"           // Value field
        value={value}                // Selected value
        placeholder={placeholder}    // Placeholder text
        search={searchable}          // Enable search
        disable={disabled}           // Disable dropdown
        activeColor={colors.surfaceVariant}
        placeholderStyle={{ color: colors.onSurfaceVariant, fontSize: 16 }}
        selectedTextStyle={{ color: colors.onSurface, fontSize: 16 }}

        onChange={(item) => onChange(item.value)} // Return selected value

        renderRightIcon={() => (
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color={colors.onSurfaceVariant}
          />
        )}
      />

      {/* Error Message */}
      {error && (
        <AppText variant="caption" style={[styles.errorText, { color: colors.error }]}>
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    zIndex: 100, // REQUIRED for Android dropdown overlay
  },

  label: {
    marginBottom: 6,
  },

  dropdown: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },

  dropdownContainer: {
    borderRadius: 16,
    elevation: 12, // Android shadow
    zIndex: 999,   // iOS overlay
  },

  itemContainer: {
    borderRadius: 12,
    marginHorizontal: 6,
    marginVertical: 2,
  },

  itemText: {
    fontSize: 16,
  },

  errorText: {
    marginTop: 4,
  },
});

/*
Usage Example:

<AppDropdown
  label="City"
  value={city}
  options={[
    { label: "Mumbai", value: "mumbai" },
    { label: "Pune", value: "pune" },
  ]}
  onChange={setCity}
/>

<AppDropdown
  label="Country"
  searchable
  options={countryList}
  value={country}
  onChange={setCountry}
/>

<AppDropdown
  label="Category"
  value={category}
  options={categories}
  error="Category is required"
  onChange={setCategory}
/>
*/
