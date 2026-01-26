# 🛠 Kitchen Sink: FAB Library

This folder contains our Floating Action Button components built for the **React Native CLI** environment. These components leverage internal theme tokens and safe area handling for optimal positioning.

## 📋 Inventory Index

| Component | Description |
| --- | --- |
| [FAB](#1-fab) | A primary action button that floats above content, supporting standard and extended layouts. |
| [FABMenu](#2-fabmenu) | An expandable speed-dial menu that reveals multiple actions when the FAB is pressed. |

---

## 1. FAB

### Component Overview

A primary action button designed to float above the UI content. It supports both a standard icon-only layout and an extended layout that includes a text label. This component is also required for `FABMenu` to function.

### Dependencies

* **Internal:** `theme` tokens (colors, radius, spacing).
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | **Required** | The icon component displayed inside the button. |
| `label` | `string` | `undefined` | If provided, renders the FAB in "Extended" mode with text. |
| `onPress` | `() => void` | `undefined` | Callback function triggered on press. |
| `style` | `ViewStyle` | `undefined` | Style overrides for the FAB container. |

### Usage Example

```tsx
<FAB
  icon={<MaterialIcons name="add" size={24} color="#000" />}
  onPress={() => {}}
/>

<FAB
  icon={<MaterialIcons name="edit" size={24} color="#000" />}
  label="Create"
  onPress={() => {}}
/>

```

---

## 2. FABMenu

### Component Overview

An expandable menu component (speed dial) that reveals a stack of actions when activated. It manages opening animations, a backdrop scrim, and safe area positioning automatically.

### Dependencies

* **Internal:** `FAB`, `theme`.
* **External:** `react-native-safe-area-context`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls the expansion state of the menu. |
| `onToggle` | `() => void` | **Required** | Callback to toggle the open/closed state. |
| `fabIcon` | `ReactNode` | **Required** | The main icon displayed on the primary trigger FAB. |
| `items` | `FABMenuItem[]` | **Required** | Array of actions `{ key, label, icon, onPress }`. |
| `style` | `ViewStyle` | `undefined` | Style overrides for the container. |

### Usage Example

```tsx
<FABMenu
  open={fabOpen}
  onToggle={() => setFabOpen(!fabOpen)}
  fabIcon={<MaterialIcons name="add" size={24} />}
  items={[
    {
      key: "scan",
      label: "Scan",
      icon: <MaterialIcons name="qr-code" size={20} />,
      onPress: () => console.log("Scan"),
    },
    {
      key: "file",
      label: "Upload",
      icon: <MaterialIcons name="upload" size={20} />,
      onPress: () => console.log("Upload"),
    },
  ]}
/>

```