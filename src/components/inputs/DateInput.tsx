import React, { useMemo, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent, } from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { colors, radius, spacing } from "../../theme";
import { AppText } from "../AppText";
import { BtnApp } from "../buttons/BtnApp";

/* ===================== TYPES ===================== */

export type DateInputProps = {
  label?: string;                 // Field label text
  value: Date | null;             // Selected date value
  onChange: (date: Date) => void; // Callback when date is selected
  placeholder?: string;           // Placeholder when no date selected
  error?: string;                 // Error message
  helperText?: string;            // Helper text
  disabled?: boolean;             // Disable interaction
  minimumDate?: Date;             // Min date
  maximumDate?: Date;             // Max date
};

/* ===================== HELPERS ===================== */

/** Format date as DD-MM-YYYY */
function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

/* ===================== COMPONENT ===================== */

const DateInput: React.FC<DateInputProps> = ({
  label = "Date",
  value,
  onChange,
  placeholder = "Select date",
  error,
  helperText,
  disabled = false,
  minimumDate,
  maximumDate,
}) => {
  const [visible, setVisible] = useState(false);      // Picker visibility
  const [tempDate, setTempDate] = useState<Date>(     // Temp date for iOS
    value ?? new Date()
  );

  const displayValue = useMemo(() => {
    return value ? formatDate(value) : "";
  }, [value]);

  /** Open date picker */
  const openPicker = () => {
    if (disabled) return;
    if (Platform.OS === "ios") {
      setTempDate(value ?? new Date());
      setVisible(true);
    } else {
      setVisible(true);
    }
  };

  /** Handle picker change */
  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    // Android cancel
    if (event.type === "dismissed") {
      setVisible(false);
      return;
    }

    // Android commit immediately
    if (Platform.OS === "android" && selectedDate) {
      setVisible(false);
      onChange(selectedDate);
      return;
    }

    // iOS temp update
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  return (
    <View style={{ gap: 6 }}>
      {label && <AppText variant="caption">{label}</AppText>}

      {/* Input field */}
      <Pressable
        style={[styles.inputWrap, disabled && styles.disabled, !!error && styles.inputError]}
        onPress={openPicker}
        disabled={disabled}
      >
        <TextInput
          value={displayValue}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurfaceVariant}
          editable={false}
          pointerEvents="none"
          style={styles.input}
        />
        <MaterialIcons
          name="calendar-month"
          size={20}
          color={disabled ? colors.onSurfaceVariant : colors.primary}
        />
      </Pressable>

      {/* Error or Helper Text */}
      {error ? (
        <AppText variant="caption" style={{ color: colors.error || "red" }}>
          {error}
        </AppText>
      ) : helperText ? (
        <AppText variant="caption" style={{ color: colors.onSurfaceVariant }}>
          {helperText}
        </AppText>
      ) : null}

      {/* ANDROID PICKER */}
      {Platform.OS === "android" && visible && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {/* IOS MODAL PICKER */}
      {Platform.OS === "ios" && (
        <Modal transparent visible={visible} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={onDateChange}
                themeVariant="light"
                style={{ backgroundColor: colors.surface }}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
              />

              <View style={styles.actions}>
                <BtnApp
                  title="Cancel"
                  variant="text"
                  onPress={() => setVisible(false)}
                />
                <BtnApp
                  title="Done"
                  onPress={() => {
                    onChange(tempDate);
                    setVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DateInput;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  inputWrap: {
    height: 52,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    color: colors.onSurface,
    fontSize: 14,
  },

  disabled: {
    opacity: 0.5,
  },

  inputError: {
    borderColor: colors.error || "red",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "90%",
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: "hidden",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
});

/*
Usage Example:

<DateInput
  label="Birthday"
  value={date}
  onChange={setDate}
/>

<DateInput
  label="Start Date"
  value={null}
  onChange={setDate}
  error="Date is required"
/>
*/
