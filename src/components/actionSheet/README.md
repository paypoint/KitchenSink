# 🛠 Kitchen Sink: Action Sheet Library

This folder contains our bottom sheet components built for the **React Native CLI** environment. These components leverage internal theme tokens and the `react-native-safe-area-context` library for safe insets handling.

## 📋 Inventory Index

| Component | Description |
| --- | --- |
| [AppActionSheet](#1-appactionsheet) | The base bottom sheet container with animations, backdrop, and drag handle. |
| [FilterActionSheet](#2-filteractionsheet) | A specialized sheet for filtering lists using Radio buttons and Checkboxes. |
| [ImageActionSheet](#3-imageactionsheet) | A modal sheet for alerts or confirmations featuring a central image and actions. |

---

## 1. AppActionSheet

### Component Overview

A highly customizable, animated bottom sheet component that serves as the foundation for all other sheet variants. It handles opening/closing animations, backdrop dimming, and safe area insets automatically. This component is required for `FilterActionSheet` and `ImageActionSheet` to function.

### Dependencies

* **Internal:** None.
* **External:** `react-native-safe-area-context`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls the visibility of the sheet. |
| `onClose` | `() => void` | **Required** | Callback function triggered when the sheet is closed. |
| `children` | `ReactNode` | **Required** | The content to display inside the sheet. |
| `title` | `ReactNode` | `undefined` | Optional header element displayed at the top. |
| `maxHeightRatio` | `number` | `0.7` | Maximum height of the sheet as a ratio of screen height. |
| `scrollable` | `boolean` | `true` | If true, wraps content in a ScrollView. |
| `containerStyle` | `ViewStyle` | `undefined` | Style overrides for the sheet container. |

### Usage Example

```tsx
const [open, setOpen] = useState(false);

<AppActionSheet
  open={open}
  onClose={() => setOpen(false)}
  title={<AppText variant="title">Options</AppText>}
>
  <AppText>Item 1</AppText>
  <AppText>Item 2</AppText>
</AppActionSheet>
```

---

## 2. FilterActionSheet

### Component Overview

A pre-built sheet designed specifically for filtering data or selecting options. It supports both single-select (Radio) and multi-select (Checkbox) groups, along with a primary "Apply" action button.

### Dependencies

* **Internal:** `AppActionSheet`, `RadioButton`, `CheckBox`, `BtnApp`, `AppText`, `theme`.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls visibility. |
| `onClose` | `() => void` | **Required** | Close callback. |
| `title` | `string` | `undefined` | Title text for the sheet header. |
| `radioOptions` | `Option[]` | `undefined` | Array of `{ label, value }` for radio buttons. |
| `selectedRadio` | `string` | `undefined` | Currently selected radio value. |
| `onRadioChange` | `(val: string) => void` | `undefined` | Callback when a radio option is selected. |
| `checkboxOptions` | `Option[]` | `undefined` | Array of `{ label, value }` for checkboxes. |
| `selectedCheckboxes` | `string[]` | `[]` | Array of currently selected checkbox values. |
| `onCheckboxChange` | `(vals: string[]) => void` | `undefined` | Callback when checkboxes change. |
| `primaryActionLabel` | `string` | `"Apply"` | Label for the bottom action button. |
| `onPrimaryAction` | `() => void` | `undefined` | Callback for the primary button press. |

### Usage Example

```tsx
<FilterActionSheet
  open={showFilter}
  onClose={() => setShowFilter(false)}
  title="Sort By"
  
  radioOptions={[
    { label: 'Newest First', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
  ]}
  selectedRadio={sortValue}
  onRadioChange={setSortValue}

  onPrimaryAction={applyFilters}
/>
```

---

## 3. ImageActionSheet

### Component Overview

A modal sheet focused on visual confirmation or alerts. It features a central image, a message body, an optional confirmation checkbox, and primary/secondary action buttons.

### Dependencies

* **Internal:** `AppActionSheet`, `AppText`, `CheckBox`, `BtnApp`, `theme`.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls visibility. |
| `onClose` | `() => void` | **Required** | Close callback. |
| `title` | `string` | **Required** | Main headline text. |
| `image` | `ImageSource` | `undefined` | Source for the central image (e.g., `require(...)`). |
| `message` | `string` | `undefined` | Descriptive body text. |
| `checkboxLabel` | `string` | `undefined` | Label for the optional confirmation checkbox. |
| `checked` | `boolean` | `false` | State of the confirmation checkbox. |
| `onCheckChange` | `() => void` | `undefined` | Callback to toggle checkbox state. |
| `primaryLabel` | `string` | `"Confirm"` | Text for the main action button. |
| `onPrimaryPress` | `() => void` | `undefined` | Callback for the main action. |
| `secondaryLabel` | `string` | `"Cancel"` | Text for the secondary/cancel button. |
| `onSecondaryPress` | `() => void` | `undefined` | Callback for the secondary button. |

### Usage Example

```tsx
<ImageActionSheet
  open={open}
  onClose={() => setOpen(false)}
  image={require("../../assets/delete-warning.png")}
  title="Delete Account"
  message="This action is permanent and cannot be undone."
  
  checkboxLabel="I understand the consequences"
  checked={isConfirmed}
  onCheckChange={() => setIsConfirmed(!isConfirmed)}
  
  primaryLabel="Delete"
  onPrimaryPress={handleDelete}
/>
```