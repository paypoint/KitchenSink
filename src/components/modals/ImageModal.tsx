import React from "react";
import { Image, Modal, Platform, Pressable, StyleSheet, View} from "react-native";

import { colors, spacing, radius } from "../../theme";
import { AppText } from "../AppText";
import { BtnApp } from "../buttons/BtnApp";

type ImageModalProps = {
    open: boolean;              // Modal visibility
    onClose: () => void;        // Close callback
    image: any;                 // Image source
    title?: string;             // Optional title
    description?: string;       // Optional text
    primaryAction?: () => void; // Main button action
    primaryLabel?: string;      // Main button label
};

/* -------------------------------------------------------------------------- */
/*                                Image Modal                                 */
/* -------------------------------------------------------------------------- */

export function ImageModal({
    open,
    onClose,
    image,
    title,
    description,
    primaryAction,
    primaryLabel = "Continue",
}: ImageModalProps) {
    return (
        <Modal transparent visible={open} animationType="fade" onRequestClose={onClose}>
            {/* background */}
            <Pressable style={styles.scrim} onPress={onClose} />

            <View style={styles.center}>
                <View style={styles.card}>
                    {/* image */}
                    <Image source={image} style={styles.image} resizeMode="contain" />

                    {/* text */}
                    {title && <AppText variant="title">{title}</AppText>}
                    {description && (
                        <AppText variant="body" style={{ marginTop: 6, opacity: 0.8 }}>
                            {description}
                        </AppText>
                    )}

                    {/* actions */}
                    <View style={styles.actions}>
                        <BtnApp title="Cancel" variant="text" onPress={onClose} />
                        {primaryAction && (
                            <BtnApp title={primaryLabel} onPress={primaryAction} />
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

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
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 10 },
            },
            android: {
                elevation: 20,
            },
        }),
    },

    image: {
        width: "100%",
        height: 180,
        marginBottom: spacing.md,
    },

    actions: {
        flexDirection: "row",
        gap: spacing.md,
        marginTop: spacing.lg,
        alignSelf: "stretch",
        justifyContent: "flex-end",
    },
});

/*
Usage Examples :

const [open, setOpen] = useState(false);

<ImageModal
  open={open}
  onClose={() => setOpen(false)}
  image={require("../assets/success.png")}
  title="Success!"
  description="Your transaction was completed successfully."
  primaryLabel="Done"
  primaryAction={() => {
    setOpen(false);
  }}
/>

*/
