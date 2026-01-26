import React from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "../AppText";
import { BtnApp } from "../buttons/BtnApp";
import { colors, spacing, radius } from "../../theme";

type EmptyStateModalProps = {
  open: boolean;            // Modal visibility
  onClose: () => void;      // Close callback
  title?: string;           // Heading text
  message?: string;         // Description text
  actionLabel?: string;     // Button label
  onAction?: () => void;    // Button action
};


export function EmptyStateModal({
  open,
  onClose,
  title = "No Data Found",
  message = "There is no information available at the moment.",
  actionLabel = "Close",
  onAction,
}: EmptyStateModalProps) {
  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={onClose}>
      {/* background */}
      <Pressable style={styles.scrim} onPress={onClose} />

      <View style={styles.center}>
        <View style={styles.card}>
          {/* title */}
          <AppText variant="title">{title}</AppText>

          {/* message */}
          <AppText
            variant="body"
            style={{ marginTop: spacing.sm, opacity: 0.75, textAlign: "center" }}
          >
            {message}
          </AppText>

          {/* action */}
          <View style={styles.actions}>
            <BtnApp
              title={actionLabel}
              onPress={onAction ?? onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.scrim,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: "center",

    // shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: {
        elevation: 16,
      },
    }),
  },

  actions: {
    marginTop: spacing.lg,
    alignSelf: "stretch",
  },
});

/*
Usage Examples:

const [open, setOpen] = useState(false);

<EmptyStateModal
  open={open}
  onClose={() => setOpen(false)}
/>

<EmptyStateModal
  open={open}
  onClose={() => setOpen(false)}
  title="No Transactions"
  message="You have not made any transactions yet."
  actionLabel="Okay"
/>

*/
