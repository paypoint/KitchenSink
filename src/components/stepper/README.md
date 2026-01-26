# 🛠 Kitchen Sink: Stepper Library

This folder contains our stepper components built for the **React Native CLI** environment. These components are used to visualize progress through a sequence of steps.

## 📋 Inventory Index

| Component | Description |
| --- | --- |
| [HorizontalStepper](#1-horizontalstepper) | A horizontal progress tracker with labeled steps and connectors. |
| [VerticalStepper](#2-verticalstepper) | A vertical timeline stepper ideal for tracking history or processes. |

---

## 1. HorizontalStepper

### Component Overview

A horizontal progress tracker that visualizes a multi-step process. It displays step numbers or checkmarks for completed steps, connected by lines, and supports interactivity.

### Dependencies

* **Internal:** `AppText`, `theme` tokens.
* **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `steps` | `HorizontalStep[]` | **Required** | Array of objects with `id`, `title`, `status`, and `onPress`. |

**Type Definition:**
```ts
type StepStatus = "completed" | "active" | "pending";
interface HorizontalStep {
  id: string;
  title: string;
  status: StepStatus;
  onPress?: () => void;
}
```

### Usage Example

```tsx
const steps = [
  { id: '1', title: 'Cart', status: 'completed', onPress: () => {} },
  { id: '2', title: 'Address', status: 'active' },
  { id: '3', title: 'Payment', status: 'pending' },
];

<HorizontalStepper steps={steps} />
```

---

## 2. VerticalStepper

### Component Overview

A vertical timeline component used to display process history or future steps. It features a connected line on the left and interactive content areas on the right.

### Dependencies

* **Internal:** `AppText`, `theme` tokens.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `steps` | `StepItem[]` | **Required** | Array of objects with `id`, `title`, `status`, and `onPress`. |

**Type Definition:**
```ts
type StepStatus = "completed" | "active" | "pending";
type StepItem = {
    id: string;
    title: string;
    status: StepStatus;
    onPress?: () => void;
};
```

### Usage Example

```tsx
const trackingData = [
  { id: 'a', title: 'Order Placed', status: 'completed' },
  { id: 'b', title: 'Shipped', status: 'active', onPress: () => viewDetails() },
  { id: 'c', title: 'Delivered', status: 'pending' },
];

<VerticalStepper steps={trackingData} />
```