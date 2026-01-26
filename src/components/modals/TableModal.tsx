import React, { useMemo, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { colors, radius } from "../../theme";
import { AppText } from "../AppText";
import { BtnApp } from "../buttons/BtnApp";

type TableRow = {
  id: string;
  name: string;
  amount: number;
  date: string;
};

type TableModalProps = {
  open: boolean;        // Modal visibility
  onClose: () => void;  // Close callback
  title?: string;       // Modal title
  data?: TableRow[];    // Table data
};

const { height: SCREEN_H } = Dimensions.get("window");

// responsive modal height (phone + tablet)
const MODAL_MAX_HEIGHT = Math.min(SCREEN_H * 0.85, 720);
const MODAL_MIN_HEIGHT = Math.min(SCREEN_H * 0.55, 520);

export function TableModal({
  open,
  onClose,
  title = "Transactions",
  data,
}: TableModalProps) {
  const [search, setSearch] = useState("");

  // fallback demo data
  const defaultData: TableRow[] = useMemo(
    () => [
      { id: "TXN001", name: "Milk Purchase", amount: 120, date: "10-01-2026" },
      { id: "TXN002", name: "Stationery", amount: 340, date: "11-01-2026" },
      { id: "TXN003", name: "Recharge", amount: 299, date: "12-01-2026" },
      { id: "TXN004", name: "Groceries", amount: 980, date: "15-01-2026" },
      { id: "TXN005", name: "Taxi", amount: 180, date: "17-01-2026" },
      { id: "TXN006", name: "Coffee", amount: 85, date: "18-01-2026" },
    ],
    []
  );

  const rows = data?.length ? data : defaultData;

  // search filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((r) =>
      `${r.id} ${r.name} ${r.amount} ${r.date}`.toLowerCase().includes(q)
    );
  }, [rows, search]);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      {/* background scrim */}
      <Pressable style={styles.scrim} onPress={onClose} />

      {/* keyboard safe container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.modalCenter}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        {/* modal card */}
        <View style={styles.modalCard}>
          {/* header */}
          <View style={styles.header}>
            <AppText variant="subtitle">{title}</AppText>

            <Pressable onPress={onClose} style={{ padding: 6 }}>
              <MaterialIcons
                name="close"
                size={22}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
          </View>

          {/* search */}
          <View style={styles.searchWrap}>
            <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search..."
              placeholderTextColor={colors.onSurfaceVariant}
              style={styles.searchInput}
            />

            {search.length > 0 && (
              <Pressable onPress={() => setSearch("")}>
                <MaterialIcons name="clear" size={20} color={colors.onSurfaceVariant} />
              </Pressable>
            )}
          </View>

          {/* table */}
          <View style={styles.tableBox}>
            {/* table header */}
            <View style={styles.tableHeader}>
              <AppText variant="caption" style={[styles.colId, styles.th]}>ID</AppText>
              <AppText variant="caption" style={[styles.colName, styles.th]}>ITEM</AppText>
              <AppText variant="caption" style={[styles.colDate, styles.th]}>DATE</AppText>
              <AppText variant="caption" style={[styles.colAmount, styles.th]}>AMOUNT</AppText>
            </View>

            {/* table body */}
            <ScrollView
              style={{ flex: 1 }}
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={false}
            >
              {filtered.length === 0 ? (
                <View style={styles.emptyBox}>
                  <MaterialIcons
                    name="search-off"
                    size={48}
                    color={colors.onSurfaceVariant}
                    style={{ opacity: 0.5 }}
                  />
                  <AppText variant="body" style={{ opacity: 0.7 }}>
                    No results found
                  </AppText>
                </View>
              ) : (
                filtered.map((r, idx) => (
                  <View
                    key={r.id}
                    style={[
                      styles.tableRow,
                      idx === filtered.length - 1 && { borderBottomWidth: 0 },
                    ]}
                  >
                    <AppText variant="caption" style={styles.colId}>{r.id}</AppText>
                    <AppText variant="body" style={styles.colName} numberOfLines={1}>
                      {r.name}
                    </AppText>
                    <AppText variant="caption" style={styles.colDate}>{r.date}</AppText>
                    <AppText variant="body" style={styles.colAmount}>₹{r.amount}</AppText>
                  </View>
                ))
              )}
            </ScrollView>
          </View>

          {/* footer */}
          <View style={styles.footer}>
            <BtnApp title="Close" onPress={onClose} fullWidth />
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

  modalCenter: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },

  modalCard: {
    width: "100%",
    minHeight: MODAL_MIN_HEIGHT,
    maxHeight: MODAL_MAX_HEIGHT,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  searchWrap: {
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    color: colors.onSurface,
    fontSize: 14,
  },

  tableBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.lg,
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.surfaceVariant,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },

  th: {
    fontWeight: "800",
    opacity: 0.75,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    alignItems: "center",
  },

  colId: { width: 70 },
  colName: { flex: 1, paddingRight: 8 },
  colDate: { width: 92, opacity: 0.75 },
  colAmount: { width: 86, textAlign: "right" },

  emptyBox: {
    paddingVertical: 40,
    alignItems: "center",
    gap: 8,
  },

  footer: {
    marginTop: 12,
  },
});

/**
Usage Examples: 

<TableModal
  open={showTable}
  onClose={() => setShowTable(false)}
/>
*/
