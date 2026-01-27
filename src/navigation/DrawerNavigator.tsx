
/*
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import KitchenSink from '../screens/KitchenSink';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../theme';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primary,
      }}
    >
      <Drawer.Screen
        name="KitchenSink"
        component={KitchenSink}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}*/


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import KitchenSink from '../screens/KitchenSink';
import SettingsScreen from '../screens/SettingsScreen';
import BottomTabsDemo from '../screens/demos/BottomTabsDemo';
import AppTabDemo from '../screens/demos/AppTabDemo';
import { themePalettes, ThemeColor } from '../theme/colors';
import ProfileScreen from '../screens/ProfileScreen';
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

const themeOptions: { value: ThemeColor; color: string }[] = [
  { value: 'purple', color: themePalettes.purple.light.primary },
  { value: 'blue', color: themePalettes.blue.light.primary },
  { value: 'green', color: themePalettes.green.light.primary },
];

function CustomDrawerContent(props: any) {
  const { setThemeColor, themeColor, colors } = useTheme();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerList}>
        <DrawerItemList {...props} />
      </View>

      <View style={[styles.footer, { borderTopColor: colors.outlineVariant }]}>
        <Text style={[styles.footerTitle, { color: colors.onSurfaceVariant }]}>Theme</Text>
        <View style={styles.themeRow}>
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => setThemeColor(option.value)}
              style={[
                styles.colorCircle,
                { backgroundColor: option.color },
                themeColor === option.value && { borderWidth: 2, borderColor: colors.onSurface }
              ]}
            />
          ))}
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.onSurfaceVariant,
        drawerStyle: {
          backgroundColor: colors.surface,
        },
      }}
    >
      <Drawer.Screen
        name="KitchenSink"
        component={KitchenSink}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="BottomTabsDemo"
        component={BottomTabsDemo}
        options={{
          title: 'Bottom Tabs',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="tab" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="AppTabDemo"
        component={AppTabDemo}
        options={{
          title: 'Tab View',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="view-day" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerList: {
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
