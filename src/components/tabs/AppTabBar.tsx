import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { TabBarProps } from "react-native-tab-view";

import { AppText } from "../AppText";
import { colors, spacing } from "../../theme";

export function AppTabBar<T extends { key: string; title: string }>({
  navigationState,
  jumpTo,
}: TabBarProps<T>) {
  return (
    <View style={styles.container}>
      {navigationState.routes.map((route, index) => {
        const active = navigationState.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => jumpTo(route.key)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <AppText
              variant="body"
              style={[
                styles.label,
                active && styles.activeLabel,
              ]}
            >
              {route.title}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },

  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: "center",
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },

  label: {
    color: colors.onSurfaceVariant,
  },

  activeLabel: {
    color: colors.primary,
    fontWeight: "700",
  },
});
