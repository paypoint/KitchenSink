import React, { useEffect, useMemo, useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { colors, radius, spacing } from "../../theme";
import { AppText } from "../AppText";
import { BtnApp } from "../buttons/BtnApp";
import DateInput from "./DateInput";
import { BtnIcon } from "../buttons/BtnIcon";

/* ===================== TYPES ===================== */

type Props = {
    open: boolean;                                   // Modal visibility
    onClose: () => void;                             // Close callback
    from: Date;                                     // Initial from date
    to: Date;                                       // Initial to date
    onApply: (range: { from: Date; to: Date }) => void; // Apply callback
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

export function DateRangeModal({
    open,
    onClose,
    from,
    to,
    onApply,
}: Props) {
    // Temporary dates (for modal state)
    const [tempFrom, setTempFrom] = useState<Date>(from);
    const [tempTo, setTempTo] = useState<Date>(to);

    // Sync dates when modal opens
    useEffect(() => {
        if (open) {
            setTempFrom(from);
            setTempTo(to);
        }
    }, [open, from, to]);

    // Validate date range
    const error = useMemo(() => {
        if (tempTo < tempFrom) return "To date cannot be before From date";
        return "";
    }, [tempFrom, tempTo]);

    return (
        <Modal
            visible={open}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* Background overlay */}
            <Pressable style={styles.scrim} onPress={onClose} />

            <View style={styles.center}>
                <View style={styles.card}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText variant="subtitle">Select Date Range</AppText>

                        <Pressable onPress={onClose} style={{ padding: 6 }}>
                            <BtnIcon icon={<MaterialIcons name="close" size={22} />} onPress={onClose} />
                        </Pressable>
                    </View>

                    {/* Date Inputs */}
                    <View style={{ gap: spacing.md }}>
                        <DateInput
                            label="From"
                            value={tempFrom}
                            onChange={setTempFrom}
                        />

                        <DateInput
                            label="To"
                            value={tempTo}
                            onChange={setTempTo}
                        />
                    </View>

                    {/* Selected range */}
                    <View style={styles.rangeRow}>
                        <AppText variant="caption" style={{ opacity: 0.7 }}>
                            Range:
                        </AppText>
                        <AppText variant="body">
                            {formatDate(tempFrom)} → {formatDate(tempTo)}
                        </AppText>
                    </View>

                    {/* Error message */}
                    {error ? (
                        <AppText variant="caption" color={colors.error}>
                            {error}
                        </AppText>
                    ) : null}

                    {/* Action buttons */}
                    <View style={styles.actions}>
                        <BtnApp title="Cancel" variant="text" onPress={onClose} />

                        <BtnApp
                            title="Apply"
                            disabled={!!error}
                            onPress={() => {
                                onApply({ from: tempFrom, to: tempTo });
                                onClose();
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

/* ===================== STYLES ===================== */

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
        borderWidth: 1,
        borderColor: colors.outlineVariant,
        gap: spacing.md,
        maxHeight: "85%", // responsive height
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rangeRow: {
        flexDirection: "row",
        gap: spacing.sm,
        alignItems: "center",
        flexWrap: "wrap",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: spacing.md,
    },
});

/*
Usage Example:

<DateRangeModal
  open={showModal}
  onClose={() => setShowModal(false)}
  from={startDate}
  to={endDate}
  onApply={({ from, to }) => handleRangeChange(from, to)}
/>
*/
