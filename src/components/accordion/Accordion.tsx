import React, { ReactNode, useEffect, useRef, useState } from "react";
import {View,Pressable,StyleSheet,Animated,Easing} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { AppText } from "../AppText";
import { colors } from "../../theme";

/* Accordion item type */
export type AccordionItem = {
  id: string;                   // Unique identifier
  title: string;                // Header text
  content: ReactNode;           // Body content
};

type Props = {
  items: AccordionItem[];       // List of accordion items
  allowMultipleOpen?: boolean;  // Allow multiple sections open
};

/* Main Accordion */
export function Accordion({
  items,
  allowMultipleOpen = false,
}: Props) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : allowMultipleOpen
          ? [...prev, id]
          : [id]
    );
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
        >
          {item.content}
        </AccordionRow>
      ))}
    </View>
  );
}

/* Single row */
function AccordionRow({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const anim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isOpen ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const height = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
  });

  return (
    <View style={styles.item}>
      {/* Header */}
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [
          styles.header,
          pressed && styles.pressed,
        ]}
      >
        <AppText variant="body">{title}</AppText>

        <Animated.View style={{ transform: [{ rotate }] }}>
          <MaterialIcons name="expand-more" size={24} color={colors.onSurface} />
        </Animated.View>
      </Pressable>

      {/* Content */}
      <Animated.View style={[styles.content, { height }]}>
        <View style={styles.inner}>{children}</View>
      </Animated.View>
    </View>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },

  item: {
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.primaryContainer,
  },

  pressed: {
    opacity: 0.85,
  },

  content: {
    overflow: "hidden",
    backgroundColor: colors.surface,
  },

  inner: {
    padding: 16,
  },
});

/*
Usage Examples:

const items = [
  { id: "1", title: "Section 1", content: <AppText>Content 1</AppText> },
  { id: "2", title: "Section 2", content: <AppText>Content 2</AppText> },
];

<Accordion
  items={items}
/>

<Accordion
  items={items}
  allowMultipleOpen
/>
*/
