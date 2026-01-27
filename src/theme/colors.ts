/* ===== SHARED / BASE ===== */
const base = {
    /* ===== BACKGROUND / SURFACE ===== */
    background: "#FFFBFE",
    onBackground: "#1C1B1F",
    surface: "#FFFBFE",
    onSurface: "#1C1B1F",
    surfaceVariant: "#E7E0EC",
    onSurfaceVariant: "#49454F",
    inverseSurface: "#313033",
    inverseOnSurface: "#F4EFF4",

    /* ===== OUTLINE ===== */
    outline: "#79747E",
    outlineVariant: "#CAC4D0",

    /* ===== STATES ===== */
    scrim: "rgba(0,0,0,0.45)",
    disabled: "rgba(0,0,0,0.12)",
    onDisabled: "rgba(0,0,0,0.38)",
    transparent: "transparent",

    /* ===== SEMANTIC ===== */
    error: "#B3261E",
    onError: "#FFFFFF",
    errorContainer: "#F9DEDC",
    onErrorContainer: "#410E0B",

    success: "#1B5E20",
    warning: "#E65100",
};

const darkBase = {
    ...base,
    background: "#1C1B1F",
    onBackground: "#E6E1E5",
    surface: "#1C1B1F",
    onSurface: "#E6E1E5",
    surfaceVariant: "#49454F",
    onSurfaceVariant: "#CAC4D0",
    inverseSurface: "#E6E1E5",
    inverseOnSurface: "#313033",
    outline: "#938F99",
    outlineVariant: "#49454F",
    error: "#F2B8B5",
    onError: "#601410",
    errorContainer: "#8C1D18",
    onErrorContainer: "#F9DEDC",
};

/* ===== THEMES ===== */

// 1. Purple (Default) #6750A4
const purpleLight = {
    ...base,
    primary: "#6750A4",
    onPrimary: "#FFFFFF",
    primaryContainer: "#EADDFF",
    onPrimaryContainer: "#21005D",
    secondary: "#625B71",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E8DEF8",
    onSecondaryContainer: "#1D192B",
};

const purpleDark = {
    ...darkBase,
    primary: "#D0BCFF",
    onPrimary: "#381E72",
    primaryContainer: "#4F378B",
    onPrimaryContainer: "#EADDFF",
    secondary: "#CCC2DC",
    onSecondary: "#332D41",
    secondaryContainer: "#4A4458",
    onSecondaryContainer: "#E8DEF8",
};

// 2. Green #78DC77
const greenLight = {
    ...base,
    primary: "#48ca46",
    onPrimary: "#003910",
    primaryContainer: "#96F890",
    onPrimaryContainer: "#002105",
    secondary: "#566250",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#D9E7CB",
    onSecondaryContainer: "#141E11",
};

const greenDark = {
    ...darkBase,
    primary: "#78DC77",
    onPrimary: "#003910",
    primaryContainer: "#00531A",
    onPrimaryContainer: "#96F890",
    secondary: "#BCCFB0",
    onSecondary: "#293424",
    secondaryContainer: "#3F4B39",
    onSecondaryContainer: "#D9E7CB",
};

// 3. Lavender #D0BCFF
const lavenderLight = {
    ...base,
    primary: "#D0BCFF",
    onPrimary: "#381E72",
    primaryContainer: "#EADDFF",
    onPrimaryContainer: "#21005D",
    secondary: "#CCC2DC",
    onSecondary: "#332D41",
    secondaryContainer: "#E8DEF8",
    onSecondaryContainer: "#1D192B",
};

const lavenderDark = {
    ...darkBase,
    primary: "#D0BCFF",
    onPrimary: "#381E72",
    primaryContainer: "#4F378B",
    onPrimaryContainer: "#EADDFF",
    secondary: "#CCC2DC",
    onSecondary: "#332D41",
    secondaryContainer: "#4A4458",
    onSecondaryContainer: "#E8DEF8",
};

// 4. Blue #0061A4
const blueLight = {
    ...base,
    primary: "#0061A4",
    onPrimary: "#FFFFFF",
    primaryContainer: "#D1E4FF",
    onPrimaryContainer: "#001D36",
    secondary: "#535F70",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#D7E3F7",
    onSecondaryContainer: "#101C2B",
};

const blueDark = {
    ...darkBase,
    primary: "#9ECAFF",
    onPrimary: "#003258",
    primaryContainer: "#00497D",
    onPrimaryContainer: "#D1E4FF",
    secondary: "#BBC7DB",
    onSecondary: "#253140",
    secondaryContainer: "#3B4858",
    onSecondaryContainer: "#D7E3F7",
};

export const themePalettes = {
    purple: { light: purpleLight, dark: purpleDark },
    green: { light: greenLight, dark: greenDark },
    lavender: { light: lavenderLight, dark: lavenderDark },
    blue: { light: blueLight, dark: blueDark },
};

export type ThemeColor = keyof typeof themePalettes;

// Backward compatibility & Context helpers
export const lightColors = purpleLight;
export const colors = purpleLight;
