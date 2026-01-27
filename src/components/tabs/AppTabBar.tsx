import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { TabBarProps } from "react-native-tab-view";

import { AppText } from "../AppText";
import { spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export function AppTabBar<T extends { key: string; title: string }>({
  navigationState,
  jumpTo,
}: TabBarProps<T>) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
      {navigationState.routes.map((route, index) => {
        const active = navigationState.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => jumpTo(route.key)}
            style={[
              styles.tab,
              active && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
            ]}
          >
            <AppText
              variant="body"
              style={[
                styles.label,
                { color: active ? colors.primary : colors.onSurfaceVariant },
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
    borderBottomWidth: 1,
  },

  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: "center",
  },

  label: {
    // color handled inline
  },

  activeLabel: {
    fontWeight: "700",
  },
});
