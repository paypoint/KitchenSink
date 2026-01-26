import { Breakpoint, useBreakpoint } from "./useBreakpoint";

/**
 * Returns a value based on current screen breakpoint
 */
export function useResponsive<T>(
  map: Partial<Record<Breakpoint, T>>,
  fallback: T
): T {
  const bp = useBreakpoint();
  return map[bp] ?? fallback;
}
