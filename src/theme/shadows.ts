import { Platform, ViewStyle } from "react-native";

export const shadows: Record<string, ViewStyle> = {
  card: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.16,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      backgroundColor: "#FFF",
    },
    android: {
      elevation: 6,
    },
    default: {},
  }) as ViewStyle,

  fab: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.22,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 12 },
      backgroundColor: "#FFF",
    },
    android: {
      elevation: 10,
    },
    default: {},
  }) as ViewStyle,
};