import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { AppActionSheet } from "./AppActionSheet";
import { AppText } from "../AppText";
import { CheckBox } from "../inputs/CheckBox";
import { BtnApp } from "../buttons/BtnApp";
import { colors, spacing } from "../../theme";

/* ================= TYPES ================= */

type ImageActionSheetProps = {
  open: boolean;                // Modal visibility
  onClose: () => void;          // Close callback

  image?: any;                  // Image source
  title: string;                // Sheet title
  message?: string;             // Optional description

  checkboxLabel?: string;       // Checkbox text
  checked?: boolean;            // Checkbox state
  onCheckChange?: () => void;   // Checkbox toggle handler

  primaryLabel?: string;        // Primary button text
  onPrimaryPress?: () => void;  // Primary button action

  secondaryLabel?: string;      // Secondary button text
  onSecondaryPress?: () => void;// Secondary button action
};

/* ================= COMPONENT ================= */

export function ImageActionSheet({
  open,
  onClose,

  image,
  title,
  message,

  checkboxLabel,
  checked = false,
  onCheckChange,

  primaryLabel = "Confirm",
  onPrimaryPress,

  secondaryLabel = "Cancel",
  onSecondaryPress,
}: ImageActionSheetProps) {
  return (
    <AppActionSheet
      open={open}
      onClose={onClose}
      scrollable={false}
      title={<AppText variant="title">{title}</AppText>}
    >
      <View style={styles.container}>
        {/* Image */}
        {image ? <Image source={image} style={styles.image} /> : null}

        {/* Message */}
        {message ? (
          <AppText
            variant="body"
            style={{ textAlign: "center", color: colors.onSurfaceVariant }}
          >
            {message}
          </AppText>
        ) : null}

        {/* Checkbox */}
        {checkboxLabel ? (
          <CheckBox
            label={checkboxLabel}
            checked={checked}
            onChange={onCheckChange!}
          />
        ) : null}

        {/* Buttons */}
        <View style={styles.buttons}>
          {secondaryLabel ? (
            <BtnApp
              title={secondaryLabel}
              variant="outlined"
              onPress={onSecondaryPress ?? onClose}
            />
          ) : null}

          {primaryLabel && onPrimaryPress ? (
            <BtnApp
              title={primaryLabel}
              onPress={onPrimaryPress}
            />
          ) : null}
        </View>
      </View>
    </AppActionSheet>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    paddingBottom: spacing.md,
  },

  image: {
    width: 72,
    height: 72,
    alignSelf: "center",
    resizeMode: "contain",
  },

  buttons: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});

/*
Usage Examples:

const [open, setOpen] = useState(false);
const [checked, setChecked] = useState(false);

<ImageActionSheet
  open={open}
  onClose={() => setOpen(false)}
  image={require("../../assets/warning.png")}
  title="Delete Item"
  message="This action cannot be undone."

  checkboxLabel="I understand the consequences"
  checked={checked}
  onCheckChange={() => setChecked(!checked)}

  primaryLabel="Delete"
  onPrimaryPress={() => {
    if (!checked) return;
    setOpen(false);
  }}
/>
*/
