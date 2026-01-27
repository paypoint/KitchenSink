
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
import { createDrawerNavigator } from '@react-navigation/drawer';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import KitchenSink from '../screens/KitchenSink';
import SettingsScreen from '../screens/SettingsScreen';
import BottomTabsDemo from '../screens/demos/BottomTabsDemo';
import AppTabDemo from '../screens/demos/AppTabDemo';
import { colors } from '../theme';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
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

