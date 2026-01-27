import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { lightColors, themePalettes, ThemeColor } from '../theme/colors';

type ThemeColors = typeof lightColors;

interface ThemeContextType {
    colors: ThemeColors;
    isDark: boolean;
    themeColor: ThemeColor;
    toggleTheme: () => void;
    setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false);
    const [themeColor, setThemeColor] = useState<ThemeColor>('purple');

    const theme = useMemo(() => {
        return {
            colors: themePalettes[themeColor][isDark ? 'dark' : 'light'],
            isDark,
            themeColor,
            toggleTheme: () => setIsDark((prev) => !prev),
            setThemeColor,
        };
    }, [isDark, themeColor]);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};