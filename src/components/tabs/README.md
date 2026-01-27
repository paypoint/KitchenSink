# 🛠 Kitchen Sink: Tabs Library

This folder contains our tab navigation components built for the **React Native CLI** environment. These components provide a streamlined way to implement tabbed interfaces using `react-native-tab-view`.

## Core Prerequisites

Before using the tab components, ensure the following dependencies are installed:

```bash
npm i react-native-tab-view react-native-pager-view
```

## Inventory Index

| Component | Description |
| --- | --- |
| [AppTabBar](#1-apptabbar) | Custom tab bar renderer with active state styling and text labels. |
| [AppTabView](#2-apptabview) | High-level tab view container that manages scenes, state, and layout. |

---

## 1. AppTabBar

### Component Overview

A custom tab bar component designed to work with `react-native-tab-view`. It renders a horizontal list of clickable tabs with visual indicators for the currently active route.

### Dependencies

* **Internal:** `AppText`, `theme` tokens.
* **External:** `react-native-tab-view`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `navigationState` | `NavigationState<T>` | **Required** | The current state containing routes and index. |
| `jumpTo` | `(key: string) => void` | **Required** | Callback function to switch to a specific tab. |

### Usage Example

```tsx
// Typically passed to the renderTabBar prop of a TabView
<TabView
  renderTabBar={(props) => <AppTabBar {...props} />}
  // ... other props
/>
```

---

## 2. AppTabView

### Component Overview

A simplified wrapper around `react-native-tab-view` that automates state management and scene rendering. It accepts a configuration array to generate the tab interface dynamically.

### Dependencies

* **Internal:** `AppTabBar`.
* **External:** `react-native-pager-view`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `tabs` | `TabItem[]` | **Required** | Array of tab configurations containing key, title, and component. |

**Type Definition:**
```ts
type TabItem = {
  key: string;
  title: string;
  component: React.ComponentType;
};
```

### Syntax

```tsx
<AppTabView tabs={myTabs} />
```

### Usage Example

```tsx
import { FirstRoute, SecondRoute } from './routes';

const tabConfig = [
  { key: 'first', title: 'Home', component: FirstRoute },
  { key: 'second', title: 'Settings', component: SecondRoute },
];

<AppTabView tabs={tabConfig} />
```