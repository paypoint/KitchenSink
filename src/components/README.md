# 🛠 Kitchen Sink: Core Components

This folder contains the fundamental building blocks for the application's UI, ensuring consistency in typography, spacing, and container styling.

## 📋 Inventory Index

| Component | Description |
| --- | --- |
| [AppCard](#1-appcard) | A reusable card container with theme-aware styling and elevation. |
| [AppText](#2-apptext) | A unified text component handling typography variants and platform fixes. |

---

## 1. AppCard

### Component Overview

A reusable card container with theme-aware styling. It features rounded corners, consistent padding, and handles platform-specific elevation (shadows) automatically.

### Dependencies

* **Internal:** `theme` tokens (colors, radius, shadows, spacing).
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `style` | `StyleProp<ViewStyle>` | `undefined` | Optional custom style override. |
| `elevation` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Controls the shadow depth/intensity. |
| `margin` | `number` | `spacing.lg` | Optional margin. |
| `padding` | `number` | `spacing.lg` | Optional padding. |
| `gap` | `number` | `0` | Optional gap between children. |
| `...props` | `ViewProps` | `undefined` | Standard React Native View props. |

### Usage Example

```tsx
<AppCard style={{ marginBottom: 16 }}>
  <AppText>Basic Card Content</AppText>
</AppCard>

<AppCard elevation="lg" style={{ backgroundColor: '#F5F5F5' }}>
  <AppText>High Elevation Card</AppText>
</AppCard>
```

---

## 2. AppText

### Component Overview

The core typography component that enforces design system fonts. It manages font variants, colors, and includes fixes for Android vertical alignment.

### Dependencies

* **Internal:** `theme` tokens (typography, colors).
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `variant` | `TextVariant` | `'body'` | Options: `display`, `headline`, `title`, `subtitle`, `body`, `label`, `caption`. |
| `color` | `string` | `undefined` | Override text color. |
| `style` | `StyleProp<TextStyle>` | `undefined` | Additional style overrides. |
| `...rest` | `TextProps` | `undefined` | Standard React Native Text props. |

### Usage Example

```tsx
<AppText variant="title">Page Title</AppText>

<AppText variant="body" color="#666">
  This is a description with a custom color.
</AppText>

<AppText style={{ marginTop: 10 }}>
  Text with custom spacing.
</AppText>
```