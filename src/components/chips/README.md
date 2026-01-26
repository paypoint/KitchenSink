# 🛠 Kitchen Sink: Chips Library

This folder contains our chip components built for the **React Native CLI** environment using internal theme tokens.

---

## ChipTag

### Component Overview

A versatile chip component used for tags, filtering, or selection. It supports filled and outlined styles, active states, and integrates seamlessly with the theme system.

### Dependencies

* **Internal:** `AppText`, `theme`.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | **Required** | The text label displayed inside the chip. |
| `variant` | `'filled' \| 'outlined'` | `'outlined'` | The visual style of the chip. |
| `selected` | `boolean` | `false` | If true, applies the active/filled state color. |
| `disabled` | `boolean` | `false` | Disables interaction and applies disabled styling. |
| `onPress` | `() => void` | `undefined` | Callback function when the chip is pressed. |
| `style` | `ViewStyle` | `undefined` | Style overrides for the chip container. |

### Usage Example

```tsx
<ChipTag label="React Native" />

<ChipTag 
  label="Selected Item" 
  selected={true} 
  onPress={() => console.log('Pressed')} 
/>

<ChipTag label="Disabled" disabled />
```