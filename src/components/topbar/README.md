# 🛠 Kitchen Sink: TopBar Component

This folder contains the application's standard top navigation bar, designed to provide consistent header styling and action handling across screens.

## TopBar

### Component Overview

A versatile header component that displays the screen title, subtitle, and navigation controls. It supports various configurations for left-side navigation (Back/Menu) and right-side actions (Search, Custom Actions, Avatar).

### Dependencies

* **Internal:** `AppText`, `BtnIcon`, `BtnGroup`, `theme` tokens.
* **External:** `npm install --save-dev @types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"App Title"` | The main heading text displayed in the center. |
| `subtitle` | `string` | `""` | Optional secondary text displayed below the title. |
| `variant` | `'center'` | `'center'` | Layout style of the title (currently only supports center). |
| `onBack` | `() => void` | `undefined` | Callback for the back arrow icon (left side). |
| `onMenu` | `() => void` | `undefined` | Callback for the menu hamburger icon (left side). |
| `onSearch` | `() => void` | `undefined` | Callback for the search icon (right side). |
| `onAction` | `() => void` | `undefined` | Callback for the secondary action icon (calendar). |
| `rightAvatar` | `ReactNode` | `undefined` | Custom element (e.g., user avatar) for the far right. |

### Usage Example

```tsx
import { TopBar } from './components/topbar/TopBar';

// 1. Standard Home Header with Menu and Search
<TopBar
  title="Home"
  subtitle="Welcome back"
  onMenu={() => navigation.openDrawer()}
  onSearch={() => console.log('Search pressed')}
  rightAvatar={<UserAvatar />}
/>

// 2. Detail Screen Header with Back button
<TopBar
  title="Details"
  onBack={() => navigation.goBack()}
  onAction={() => console.log('Calendar pressed')}
/>
```