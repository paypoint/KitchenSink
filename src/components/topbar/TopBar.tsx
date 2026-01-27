import React from "react";
import {
    View,
    StyleSheet,
    Pressable,
    Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppText } from "../AppText";
import { colors, spacing, radius } from "../../theme";
import { BtnIcon } from "../buttons/BtnIcon";
import { BtnGroup } from "../buttons/BtnGroup";

/* ================= TYPES ================= */

// Only center variant supported
type Variant = "center";

type Props = {
    title?: string;            // Optional title
    subtitle?: string;         // Optional subtitle
    variant?: Variant;         // Default: center

    onBack?: () => void;       // Back button action
    onMenu?: () => void;       // Drawer menu action

    onSearch?: () => void;     // Search icon action
    onAction?: () => void;     // Extra action icon

    rightAvatar?: React.ReactNode; // Custom right element
};

/* ================= COMPONENT ================= */

export function TopBar({
    title = "App Title",
    subtitle = "",
    variant = "center",

    onBack,
    onMenu,
    onSearch,
    onAction,
    rightAvatar,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.leftSection}>
                    {onBack || onMenu ? (
                        <BtnIcon
                            icon={
                                <MaterialIcons
                                    name={onBack ? "arrow-back" : "menu"}
                                    size={22}
                                />
                            }
                            onPress={onBack ?? onMenu}
                        />
                    ) : (
                        <View style={styles.iconPlaceholder} />
                    )}

                    <View style={styles.titleSection}>
                        <AppText variant="headline">{title}</AppText>

                        {subtitle ? (
                            <AppText
                                variant="title"
                                style={{ color: colors.onSurfaceVariant }}
                            >
                                {subtitle}
                            </AppText>
                        ) : null}
                    </View>
                </View>

                <View style={styles.spacer} />

                <BtnGroup>
                    {onSearch && (
                        <BtnIcon 
                            icon={<MaterialIcons name="search" size={24} />}
                            onPress={onSearch}
                        />
                    )}

                    {onAction && (
                        <BtnIcon
                            icon={<MaterialIcons name="calendar-today" size={22} />}
                            onPress={onAction}
                        />
                    )}

                    {rightAvatar}
                </BtnGroup>
            </View>
        </View>
    );
}


/* ================= STYLES ================= */

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        // paddingTop: Platform.OS === "ios" ? spacing.lg : spacing.md,
        paddingHorizontal: spacing.md,
        borderBottomLeftRadius: radius.lg,
        borderBottomRightRadius: radius.lg,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        height: 56,
    },

    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    titleSection: {
        gap: 2,
    },

    spacer: {
        flex: 1,
    },

    iconPlaceholder: {
        width: 48,
    },
});
