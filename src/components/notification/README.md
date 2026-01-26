# 🛠 Kitchen Sink: Notification Library

This folder contains our notification components built for the **React Native CLI** environment.

---

## NotificationCard

### Component Overview

A top-sliding notification banner used to display temporary feedback messages like success, error, or warnings. It handles safe area insets and auto-dismissal logic automatically.

### Dependencies

* **Internal:** `AppText`, `theme` tokens.
* **External:** `react-native-safe-area-context`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `title` | `string` | **Required** | The main heading text. |
| `message` | `string` | `undefined` | Optional body text. |
| `type` | `'success' \| 'error' \| 'warning'` | `'success'` | Controls the background color theme. |
| `duration` | `number` | `3000` | Time in milliseconds before auto-hiding. |
| `onHide` | `() => void` | `undefined` | Callback triggered after the hide animation. |

### Usage Example

```tsx
// Basic Success
<NotificationCard title="Success" message="Data saved successfully." />

// Error with Callback
<NotificationCard 
  title="Connection Failed" 
  message="Please check your internet." 
  type="error" 
  onHide={() => console.log('Closed')}
/>
```
