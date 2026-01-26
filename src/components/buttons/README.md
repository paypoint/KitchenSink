# 🛠 Kitchen Sink: Buttons Library

This folder contains our custom, high-performance button components built for the **React Native CLI** environment using internal theme tokens.

## 📋 Inventory Index

| Component | Description |
| --- | --- |
| [BtnApp](#1-btnapp) | Main action button supporting variants (Filled, Outlined, Tonal) and loading states. |
| [BtnGroup](#2-btngroup) | Layout utility for spacing and aligning multiple buttons. |
| [BtnIcon](#3-btnicon) | Circular icon-only button with built-in selection logic. |
| [BtnSplit](#4-btnsplit) | Dual-action button for primary actions with secondary options. |
| [BtnToggle](#5-btntoggle) | Chip-style selection button ideal for filters and choice sets. |

---

## 1. BtnApp

### Component Overview

The primary "workhorse" button for the application. It handles all main user interactions with built-in haptic feedback and dedicated visual states for loading and disabled modes.

### Dependencies

* **Internal:** `AppText`, `theme` tokens, `useResponsive` hook.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `title` | `string` | **Required** | The text label displayed inside the button. |
| `onPress` | `() => void` | `undefined` | Callback function triggered on press. |
| `loading` | `boolean` | `false` | Shows a spinner and disables interaction. |
| `disabled` | `boolean` | `false` | Disables interaction and applies disabled styling. |
| `variant` | `'filled' \| 'outlined' \| 'tonal' \| 'text'` | `'filled'` | The visual style/theme of the button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls height, padding, and font size. |
| `fullWidth` | `boolean` | `false` | If true, the button takes up 100% of the container width. |
| `leading` | `ReactNode` | `undefined` | Element (icon) displayed before the text. |
| `trailing` | `ReactNode` | `undefined` | Element (icon) displayed after the text. |
| `style` | `ViewStyle` | `undefined` | Style overrides for the button container. |
| `vibrationDuration` | `number` | `70` | Duration of haptic feedback in milliseconds. |

### Usage Example

```tsx
<BtnApp title="Save Changes" onPress={handleSave} />
<BtnApp title="Processing..." variant="outlined" loading={true} />

```

---

## 2. BtnGroup

### Component Overview

A utility layout wrapper designed to manage multiple buttons. It ensures consistent spacing and handles horizontal wrapping automatically.

### Dependencies

* **Internal:** None.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | **Required** | The buttons to be rendered inside. |
| `gap` | `number` | `12` | The spacing (pixels) between each child. |
| `style` | `ViewStyle` | `undefined` | Style overrides for the group container. |

### Usage Example

```tsx
<BtnGroup gap={10}>
  <BtnApp title="Submit" />
  <BtnApp title="Cancel" variant="text" />
</BtnGroup>

```

---

## 3. BtnIcon

### Component Overview

A circular, icon-only button. It includes a `selected` state logic, making it perfect for "Toggle" actions like Like/Favorite or Bookmark buttons.

### Dependencies

* **Internal:** `theme` tokens.
* **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | **Required** | The icon component to be displayed. |
| `onPress` | `() => void` | `undefined` | Callback function triggered on press. |
| `disabled` | `boolean` | `undefined` | Disables interaction and reduces opacity. |
| `selected` | `boolean` | `undefined` | If true, applies active background color. |
| `size` | `number` | `40` | Total diameter of the circular button. |
| `iconSize` | `number` | `22` | Size of the icon container wrapper. |
| `style` | `ViewStyle` | `undefined` | Style overrides for the button container. |
| `vibrationDuration` | `number` | `70` | Duration of haptic feedback in milliseconds. |

### Syntax

### Usage Example

```tsx
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

<BtnIcon
  icon={<MaterialIcons name="favorite" size={20} color="#fff" />}
  onPress={() => console.log("Icon pressed")}
  selected={true}
  size={48}
  iconSize={24}
/>
```

---

## 4. BtnSplit

### Component Overview

A dual-action button split into two parts: a primary text area and a secondary icon area (typically for dropdowns or extra options).

### Dependencies

* **Internal:** `AppText`, `theme`.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `title` | `string` | **Required** | Text for the primary action area. |
| `onPress` | `() => void` | `undefined` | Callback for the primary (left) text area. |
| `onPressSecondary` | `() => void` | `undefined` | Callback for the secondary (right) icon area. |
| `secondaryIcon` | `ReactNode` | `dot` | The icon for the right side trigger. |
| `vibrationDuration` | `number` | `70` | Duration of haptic feedback in milliseconds. |

### Usage Example

```tsx
<BtnSplit
  title="Export File"
  onPress={handleExport}
  onPressSecondary={showOptions}
  secondaryIcon={<ChevronDown color="white" />}
/>

```

---

## 5. BtnToggle

### Component Overview

A lightweight "Chip" button used for selection. It toggles between a transparent background and a high-contrast highlighted state.

### Dependencies

* **Internal:** `AppText`, `theme`.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | **Required** | The text displayed on the chip. |
| `selected` | `boolean` | `undefined` | Controls the active/inactive visual state. |
| `onPress` | `() => void` | `undefined` | Callback function triggered on press. |
| `style` | `ViewStyle` | `undefined` | Style overrides for the container. |
| `vibrationDuration` | `number` | `70` | Duration of haptic feedback in milliseconds. |

### Usage Example

```tsx
<BtnToggle 
  label="High Priority" 
  selected={filter === 'high'} 
  onPress={() => setFilter('high')} 
/>

```