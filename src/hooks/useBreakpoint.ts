import { useWindowDimensions } from "react-native";
import { breakpoints } from "../theme/breakpoints";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();

  if (width < breakpoints.xs) return "xs";
  if (width < breakpoints.sm) return "sm";
  if (width < breakpoints.md) return "md";
  if (width < breakpoints.lg) return "lg";
  return "xl";
}
