# 🛠 Kitchen Sink: Inputs Library

This folder contains our comprehensive suite of input components built for the **React Native CLI** environment. These components leverage internal theme tokens and various external libraries to provide a robust user data entry experience.

## 📋 Inventory Index

| Component | Description |
| --- | --- |
| [AppDropdown](#1-appdropdown) | A customizable dropdown menu for selecting single options from a list. |
| [AppInput](#2-appinput) | The standard text input component supporting icons, labels, and error states. |
| [CheckBox](#3-checkbox) | A simple binary selection control with a label. |
| [DateInput](#4-dateinput) | A date picker field that opens a native calendar interface. |
| [DateRangeModal](#5-daterangemodal) | A modal interface for selecting a start and end date range. |
| [FileUpload](#6-fileupload) | A file picker component for selecting documents from the device. |
| [OtpInput](#7-otpinput) | A segmented input field designed specifically for One-Time Passwords. |
| [PasswordInput](#8-passwordinput) | A specialized text input with a visibility toggle for secure text entry. |
| [RadioButton](#9-radiobutton) | A selection control for choosing one option from a set. |
| [TextArea](#10-textarea) | A multiline text input designed for longer comments or descriptions. |

---

## 1. AppDropdown

### Component Overview

A styled dropdown component that allows users to select a single value from a list of options. It supports search functionality, error states, and custom styling.

### Dependencies

*   **Internal:** `AppText`, `theme`.
*   **External:** `react-native-element-dropdown`, `@types/react-native-vector-icons`.


### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | `undefined` | Field label shown above the dropdown. |
| `value` | `string` | `undefined` | The currently selected value. |
| `options` | `Option[]` | **Required** | Array of `{ label, value }` objects. |
| `placeholder` | `string` | `"Select"` | Text displayed when no value is selected. |
| `searchable` | `boolean` | `false` | If true, enables a search bar inside the dropdown. |
| `disabled` | `boolean` | `false` | Disables interaction and applies disabled styling. |
| `error` | `string` | `undefined` | Error message displayed below the dropdown. |
| `onChange` | `(value: string) => void` | **Required** | Callback triggered when an item is selected. |

### Usage Example

```tsx
<AppDropdown
  label="City"
  value={city}
  options={[
    { label: "New York", value: "ny" },
    { label: "London", value: "ldn" },
  ]}
  onChange={setCity}
  searchable
  error={hasError ? "Selection required" : undefined}
/>
```

---

## 2. AppInput

### Component Overview

The primary text input component used throughout the application. It supports various visual variants, leading/trailing icons, and built-in error handling.

### Dependencies

*   **Internal:** `AppText`, `theme`.
*   **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | `undefined` | Text label displayed above the input. |
| `error` | `string` | `undefined` | Error message displayed in red below the input. |
| `helperText` | `string` | `undefined` | Helper text displayed below the input. |
| `variant` | `'outlined' \| 'filled' \| 'underlined'` | `'outlined'` | Visual style of the input container. |
| `leftIcon` | `MaterialIconName` | `undefined` | Icon name displayed at the start of the input. |
| `rightIcon` | `MaterialIconName` | `undefined` | Icon name displayed at the end of the input. |
| `onRightIconPress` | `() => void` | `undefined` | Callback for pressing the right icon. |
| `clearable` | `boolean` | `undefined` | If true, shows a clear button when text is present. |
| `containerStyle` | `ViewStyle` | `undefined` | Style overrides for the outer wrapper. |
| `style` | `TextStyle` | `undefined` | Style overrides for the inner TextInput. |
| `value` | `string` | `undefined` | The text value of the input. |
| `onChangeText` | `(text: string) => void` | `undefined` | Callback when text changes. |
| `multiline` | `boolean` | `undefined` | If true, allows multiple lines of text. |

### Usage Example

```tsx
<AppInput
  label="Search"
  leftIcon="search"
  placeholder="Find items..."
  clearable
  value={query}
  onChangeText={setQuery}
/>
```

---

## 3. CheckBox

### Component Overview

A simple checkbox component for binary choices. It renders a checked or unchecked box icon alongside a text label.

### Dependencies

*   **Internal:** `AppText`, `theme`.
*   **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | **Required** | The text label displayed next to the checkbox. |
| `checked` | `boolean` | **Required** | The current state of the checkbox. |
| `onChange` | `() => void` | **Required** | Callback function to toggle the state. |

### Usage Example

```tsx
<CheckBox
  label="I accept the terms and conditions"
  checked={isAgreed}
  onChange={() => setIsAgreed(!isAgreed)}
/>
```

---

## 4. DateInput

### Component Overview

A read-only input field that opens a native date picker when pressed. It handles platform-specific behavior for iOS (spinner) and Android (calendar modal).

### Dependencies

*   **Internal:** `AppText`, `BtnApp`, `theme`.
*   **External:** `@react-native-community/datetimepicker`, `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Date"` | Label displayed above the input. |
| `value` | `Date \| null` | **Required** | The currently selected date object. |
| `onChange` | `(date: Date) => void` | **Required** | Callback when a date is confirmed. |
| `placeholder` | `string` | `"Select date"` | Text shown when value is null. |
| `error` | `string` | `undefined` | Error message displayed below the input. |
| `helperText` | `string` | `undefined` | Helper text displayed below the input. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `minimumDate` | `Date` | `undefined` | Minimum selectable date. |
| `maximumDate` | `Date` | `undefined` | Maximum selectable date. |

### Usage Example

```tsx
<DateInput
  label="Date of Birth"
  value={dob}
  onChange={setDob}
  placeholder="DD-MM-YYYY"
/>
```

---

## 5. DateRangeModal

### Component Overview

A modal component that allows users to select a start and end date. It validates that the end date is not before the start date.

### Dependencies

*   **Internal:** `DateInput`, `AppText`, `BtnApp`, `theme`.
*   **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **Required** | Controls the visibility of the modal. |
| `onClose` | `() => void` | **Required** | Callback to close the modal. |
| `from` | `Date` | **Required** | Initial start date value. |
| `to` | `Date` | **Required** | Initial end date value. |
| `onApply` | `(range: { from: Date; to: Date }) => void` | **Required** | Callback triggered when "Apply" is pressed. |

### Usage Example

```tsx
<DateRangeModal
  open={showRangePicker}
  onClose={() => setShowRangePicker(false)}
  from={startDate}
  to={endDate}
  onApply={({ from, to }) => {
    setStartDate(from);
    setEndDate(to);
  }}
/>
```

---

## 6. FileUpload

### Component Overview

A file picker component that integrates with the system document picker. It displays file metadata (name, size) and supports clearing the selection.

### Dependencies

*   **Internal:** `AppText`, `theme`.
*   **External:** `@react-native-documents/picker`, `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Upload file"` | Label displayed above the field. |
| `value` | `DocumentPickerResponse \| null` | `undefined` | The selected file object. |
| `onChange` | `(file: DocumentPickerResponse \| null) => void` | **Required** | Callback when file changes. |
| `placeholder` | `string` | `"Choose file"` | Text shown when no file is selected. |
| `helperText` | `string` | `undefined` | Helper text below the field. |
| `error` | `string` | `undefined` | Error message below the field. |
| `disabled` | `boolean` | `undefined` | Disables the picker interaction. |
| `loading` | `boolean` | `undefined` | Shows a loading spinner. |
| `clearable` | `boolean` | `true` | Allows removing the selected file. |
| `leftIcon` | `MaterialIconName` | `"upload-file"` | Icon displayed on the left. |
| `containerStyle` | `ViewStyle` | `undefined` | Style overrides for the wrapper. |
| `types` | `string[]` | `[PickerTypes.allFiles]` | Allowed file MIME types. |

### Usage Example

```tsx

import { types as PickerTypes } from "@react-native-documents/picker";

<FileUpload
  label="Resume"
  value={resumeFile}
  onChange={setResumeFile}
  types={[PickerTypes.pdf]}
  helperText="PDF only, max 5MB"
/>
```

---

## 7. OtpInput

### Component Overview

A segmented input component designed for entering One-Time Passwords (OTP). It handles auto-focus movement between fields and backspace logic.

### Dependencies

*   **Internal:** `AppText`, `theme`.
*   **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `title` | `string` | **Required** | Title displayed above the input fields. |
| `value` | `string` | **Required** | The current OTP string. |
| `onChange` | `(val: string) => void` | **Required** | Callback when OTP changes. |
| `length` | `number` | `6` | Number of input segments. |
| `helperText` | `string` | `undefined` | Optional text displayed below the inputs. |

### Usage Example

```tsx
<OtpInput
  title="Verification Code"
  value={code}
  onChange={setCode}
  length={4}
  helperText="Sent to +1 234 *** **89"
/>
```

---

## 8. PasswordInput

### Component Overview

A wrapper around `AppInput` specifically for passwords. It includes a toggle button to show/hide the password text securely.

### Dependencies

*   **Internal:** `AppInput` (Required: Wraps this component), `theme`.
*   **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Password"` | Label displayed above the input. |
| `value` | `string` | `undefined` | The password text value. |
| `onChangeText` | `(text: string) => void` | `undefined` | Callback when text changes. |
| `error` | `string` | `undefined` | Error message displayed below the input. |

### Usage Example

```tsx
<PasswordInput
  label="Current Password"
  value={password}
  onChangeText={setPassword}
  error={isWrong ? "Incorrect password" : undefined}
/>
```

---

## 9. RadioButton

### Component Overview

A radio button component for single-choice selection within a group. It renders a radio icon and a text label.

### Dependencies

*   **Internal:** `AppText`, `theme`.
*   **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | **Required** | The text label displayed next to the radio button. |
| `selected` | `boolean` | **Required** | The current selection state. |
| `onSelect` | `() => void` | **Required** | Callback function to select this option. |

### Usage Example

```tsx
<RadioButton
  label="Pay with Credit Card"
  selected={paymentMethod === 'card'}
  onSelect={() => setPaymentMethod('card')}
/>
```

---

## 10. TextArea

### Component Overview

A multiline text input component designed for longer content like descriptions or notes. It supports auto-growing height (platform dependent) and clear buttons.

### Dependencies

*   **Internal:** `AppText`, `theme`.
*   **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `label` | `string` | `undefined` | Label displayed above the text area. |
| `helperText` | `string` | `undefined` | Helper text displayed below the area. |
| `error` | `string` | `undefined` | Error message displayed below the area. |
| `leftIcon` | `MaterialIconName` | `undefined` | Icon displayed at the top-left. |
| `rightIcon` | `MaterialIconName` | `undefined` | Icon displayed at the top-right. |
| `onRightIconPress` | `() => void` | `undefined` | Callback for the right icon. |
| `clearButtonMode` | `'never' \| 'while-editing'` | `'never'` | Controls visibility of the clear button. |
| `style` | `TextStyle` | `undefined` | Style overrides for the input. |
| `value` | `string` | `undefined` | The text value. |
| `onChangeText` | `(text: string) => void` | `undefined` | Callback when text changes. |
| `editable` | `boolean` | `true` | If false, disables editing. |

### Usage Example

```tsx
<TextArea
  label="Feedback"
  placeholder="Tell us what you think..."
  helperText="Max 500 characters"
  value={feedback}
  onChangeText={setFeedback}
  clearButtonMode="while-editing"
/>
```