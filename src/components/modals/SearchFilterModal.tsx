import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { colors, spacing, radius } from "../../theme";
import { AppText } from "../AppText";
import { BtnApp } from "../buttons/BtnApp";

type Item = {
    id: string;
    label: string;
};

type SearchFilterModalProps = {
    open: boolean;              // Modal visibility
    onClose: () => void;        // Close callback
    title?: string;             // Modal title
    data: Item[];               // List data
    onFilterPress?: () => void; // Filter button handler
};

export function SearchFilterModal({
    open,
    onClose,
    title = "Search",
    data,
    onFilterPress,
}: SearchFilterModalProps) {
    const [search, setSearch] = useState("");

    // filter list by search text
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return data;

        return data.filter((i) =>
            i.label.toLowerCase().includes(q)
        );
    }, [search, data]);

    return (
        <Modal transparent visible={open} animationType="fade" onRequestClose={onClose}>
            {/* background overlay */}
            <Pressable style={styles.scrim} onPress={onClose} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.center}
            >
                <View style={styles.card}>
                    {/* header */}
                    <View style={styles.header}>
                        <AppText variant="subtitle" style={{ flex: 1 }}>{title}</AppText>

                        <Pressable onPress={onClose}>
                            <MaterialIcons
                                name="close"
                                size={22}
                                color={colors.onSurfaceVariant}
                            />
                        </Pressable>
                    </View>

                    {/* search + filter */}
                    <View style={styles.searchRow}>
                        <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} />

                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search..."
                            placeholderTextColor={colors.onSurfaceVariant}
                            style={styles.input}
                        />

                        <Pressable onPress={onFilterPress}>
                            <MaterialIcons
                                name="filter-list"
                                size={22}
                                color={colors.primary}
                            />
                        </Pressable>
                    </View>

                    {/* list */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {filtered.length === 0 ? (
                            <View style={styles.empty}>
                                <AppText variant="body" style={{ opacity: 0.7 }}>
                                    No results found
                                </AppText>
                            </View>
                        ) : (
                            filtered.map((item) => (
                                <Pressable key={item.id} style={styles.row}>
                                    <AppText variant="body">{item.label}</AppText>
                                </Pressable>
                            ))
                        )}
                    </ScrollView>

                    {/* footer */}
                    <View style={styles.footer}>
                        <BtnApp title="Close" variant="outlined" onPress={onClose} fullWidth />
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        maxHeight: "80%",
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.md,
    },

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
        borderRadius: radius.lg,
        paddingHorizontal: 12,
        height: 48,
        marginBottom: spacing.md,
    },

    input: {
        flex: 1,
        fontSize: 14,
        color: colors.onSurface,
    },

    row: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.outlineVariant,
    },

    empty: {
        paddingVertical: 32,
        alignItems: "center",
    },

    footer: {
        marginTop: spacing.md,
    },
});

/*
Usage Examples:

const [open, setOpen] = useState(false);

const items = [
  { id: "1", label: "Milk" },
  { id: "2", label: "Groceries" },
  { id: "3", label: "Recharge" },
];

<SearchFilterModal
  open={open}
  onClose={() => setOpen(false)}
  title="Select Item"
  data={items}
  onFilterPress={() => {
    console.log("Filter clicked");
  }}
/>

*/
