# 🛠 Kitchen Sink: Modals Library

This folder contains our suite of modal components built for the **React Native CLI** environment. These components range from base containers to specialized data displays and debug tools.

## 📋 Inventory Index

| Component | Description |
| --- | --- |
| [AppModal](#1-appmodal) | The base animated modal container used to build other dialogs. |
| [EmptyStateModal](#2-emptystatemodal) | A modal for displaying "No Data" or empty states with an action. |
| [ImageModal](#3-imagemodal) | A dialog for showcasing an image with a title and description. |
| [SearchFilterModal](#4-searchfiltermodal) | A modal containing a search bar and a filterable list of items. |
| [TableModal](#5-tablemodal) | A responsive modal for displaying tabular data with search capabilities. |
| [DeviceInfoModal](#6-deviceinfomodal) | A debug tool showing device specs and safe area insets. |

---

## 1. AppModal

### Component Overview

The foundational modal component that handles visibility, animations (scale/opacity), and the backdrop scrim. It is designed to wrap any custom content or layouts.

### Dependencies

* **Internal:** `theme` tokens.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls the visibility of the modal. |
| `onClose` | `() => void` | **Required** | Callback function triggered to close the modal. |
| `children` | `ReactNode` | **Required** | The content to display inside the dialog. |
| `title` | `ReactNode` | `undefined` | Optional header element. |
| `actions` | `ReactNode` | `undefined` | Optional footer element (usually buttons). |

### Usage Example

```tsx
<AppModal
  open={visible}
  onClose={() => setVisible(false)}
  title={<AppText variant="title">Confirm</AppText>}
  actions={<BtnApp title="OK" onPress={handleOk} />}
>
  <AppText>Are you sure you want to proceed?</AppText>
</AppModal>
```

---

## 2. EmptyStateModal

### Component Overview

A pre-styled modal designed to inform users when data is missing or a search yields no results. It includes a standard illustration area (via title/message) and a primary action button.

### Dependencies

* **Internal:** `AppText`, `BtnApp`, `theme`.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls visibility. |
| `onClose` | `() => void` | **Required** | Close callback. |
| `title` | `string` | `"No Data Found"` | The main heading text. |
| `message` | `string` | `"There is no..."` | The descriptive body text. |
| `actionLabel` | `string` | `"Close"` | Label for the primary button. |
| `onAction` | `() => void` | `undefined` | Callback for the button (defaults to onClose). |

### Usage Example

```tsx
<EmptyStateModal
  open={isEmpty}
  onClose={() => setIsEmpty(false)}
  title="No Transactions"
  message="You haven't made any purchases yet."
  actionLabel="Start Shopping"
  onAction={goToShop}
/>
```

---

## 3. ImageModal

### Component Overview

A visual dialog component used to display a prominent image along with a title and description. Ideal for success messages, announcements, or product previews.

### Dependencies

* **Internal:** `AppText`, `BtnApp`, `theme`.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls visibility. |
| `onClose` | `() => void` | **Required** | Close callback. |
| `image` | `ImageSource` | **Required** | The image source object (e.g., `require(...)`). |
| `title` | `string` | `undefined` | Optional heading text. |
| `description` | `string` | `undefined` | Optional body text. |
| `primaryAction` | `() => void` | `undefined` | Callback for the main button. |
| `primaryLabel` | `string` | `"Continue"` | Label for the main button. |

### Usage Example

```tsx
<ImageModal
  open={showSuccess}
  onClose={() => setShowSuccess(false)}
  image={require('../../assets/success.png')}
  title="Payment Successful"
  description="Your order has been placed successfully."
  primaryLabel="View Order"
  primaryAction={navigateToOrder}
/>
```

---

## 4. SearchFilterModal

### Component Overview

A functional modal that provides a search interface for a list of items. It includes a search bar, a filter trigger button, and a scrollable list of results.

### Dependencies

* **Internal:** `AppText`, `BtnApp`, `theme`.
* **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls visibility. |
| `onClose` | `() => void` | **Required** | Close callback. |
| `data` | `Item[]` | **Required** | Array of objects with `id` and `label`. |
| `title` | `string` | `"Search"` | Modal title. |
| `onFilterPress` | `() => void` | `undefined` | Callback for the filter icon button. |

### Usage Example

```tsx
const items = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
];

<SearchFilterModal
  open={isSearchOpen}
  onClose={() => setIsSearchOpen(false)}
  title="Select Fruit"
  data={items}
  onFilterPress={() => console.log('Open advanced filters')}
/>
```

---

## 5. TableModal

### Component Overview

A data-heavy modal designed to display tabular information (like transaction history). It features a search bar to filter rows and handles keyboard avoidance automatically.

### Dependencies

* **Internal:** `AppText`, `BtnApp`, `theme`.
* **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls visibility. |
| `onClose` | `() => void` | **Required** | Close callback. |
| `title` | `string` | `"Transactions"` | Modal title. |
| `data` | `TableRow[]` | `undefined` | Array of data objects (id, name, amount, date). |

### Usage Example

```tsx
const transactions = [
  { id: 'T1', name: 'Grocery', amount: 50, date: '2023-10-01' },
  { id: 'T2', name: 'Fuel', amount: 40, date: '2023-10-02' },
];

<TableModal
  open={showHistory}
  onClose={() => setShowHistory(false)}
  title="Recent Activity"
  data={transactions}
/>
```

---

## 6. DeviceInfoModal

### Component Overview

A developer utility modal that displays critical device information such as Brand, Model, OS Version, and Safe Area Insets. Useful for debugging layout issues on specific devices (e.g., notches on Oppo/Vivo).

### Dependencies

* **Internal:** `AppModal`, `AppText`, `BtnApp`, `theme`.
* **External:** `react-native-device-info`, `react-native-safe-area-context`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls visibility. |
| `onClose` | `() => void` | **Required** | Close callback. |

### Usage Example

```tsx
// Typically used in a Settings or Debug screen
<DeviceInfoModal 
  open={showDebugInfo} 
  onClose={() => setShowDebugInfo(false)} 
/>
```