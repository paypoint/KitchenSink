# 🧭 Kitchen Sink: Navigation

This folder contains the navigation configuration for the application, utilizing React Navigation to manage screen transitions and hierarchy. It includes setups for Drawer, Bottom Tabs, and Stack navigation patterns.

## 📦 Core Prerequisites

Before using any navigator, ensure the core libraries and icon dependencies are installed:

```bash
npm i @react-navigation/native react-native-screens react-native-safe-area-context
npm i react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons
```

## 📋 Inventory Index

| Component | Description |
| --- | --- |
| [AppNavigator](#1-appnavigator) | The root entry point that initializes the app's navigation structure. |
| [BottomTabsNavigator](#2-bottomtabsnavigator) | Bottom tab bar navigation for primary app sections. |
| [DrawerNavigator](#3-drawernavigator) | Side drawer navigation for accessing demos and global settings. |
| [StackNavigator](#4-stacknavigator) | Native stack navigation for standard linear screen flows. |

---

## 1. AppNavigator

### Component Overview

The root navigator component that serves as the entry point for the application's navigation tree. It currently wraps and renders the `DrawerNavigator` to establish the main navigation structure.

### Dependencies

* **Internal:** `DrawerNavigator`.
* **External:** `React`.

### Usage Example

```tsx
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
```

---

## 2. BottomTabsNavigator

### Component Overview

Implements a bottom tab navigation bar allowing users to switch between main screens like Home and Profile. It utilizes Material Icons for visual representation and applies theme colors to the active tab.

### Dependencies

* **Internal:** `HomeScreen`, `ProfileScreen`, `theme` (colors).
* **External:** `@react-navigation/bottom-tabs`, `react-native-vector-icons`.

### Usage Example

```tsx
import BottomTabsNavigator from './navigation/BottomTabsNavigator';

// Inside another navigator (e.g., Stack or Drawer)
<Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
```

---

## 3. DrawerNavigator

### Component Overview

Provides a side-menu drawer navigation for accessing the Kitchen Sink demos (including `BottomTabsDemo` and `AppTabDemo`), settings, and profile. It features custom styling for the drawer background and active/inactive tint colors based on the application theme.

### Dependencies

* **Internal:** `KitchenSink`, `SettingsScreen`, `BottomTabsDemo`, `AppTabDemo`, `ProfileScreen`, `theme` (colors).
* **External:** `@react-navigation/drawer`, `react-native-vector-icons`.

### Usage Example

```tsx
import DrawerNavigator from './navigation/DrawerNavigator';

// Used as the root navigator in AppNavigator
export default function AppNavigator() {
  return <DrawerNavigator />;
}
```

---

## 4. StackNavigator

### Component Overview

A standard native stack navigator that manages a stack of screens including Home, Profile, and Settings. It uses the native platform's navigation primitives for performance and native feel.

### Dependencies

* **Internal:** `HomeScreen`, `ProfileScreen`, `SettingsScreen`.
* **External:** `@react-navigation/native-stack`.

### Usage Example

```tsx
import StackNavigator from './navigation/StackNavigator';

// Inside a NavigationContainer
<NavigationContainer>
  <StackNavigator />
</NavigationContainer>
```
