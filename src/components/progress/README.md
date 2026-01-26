# 🛠 Kitchen Sink: Progress Library

This folder contains our progress indication components built for the **React Native CLI** environment.

---

## StepProgressBar

### Component Overview

A segmented progress indicator designed for multi-step forms or wizards. It visualizes the total number of steps and highlights the completed ones based on the current index.

### Dependencies

* **Internal:** `theme` tokens.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `steps` | `number` | **Required** | Total number of steps in the process. |
| `currentStep` | `number` | **Required** | The current active step (1-based index). |
| `style` | `ViewStyle` | `undefined` | Style overrides for the container. |

### Usage Example

```tsx
// Basic 3-step wizard
<StepProgressBar steps={3} currentStep={1} />

// 5-step process at step 3 with custom spacing
<StepProgressBar 
  steps={5} 
  currentStep={3} 
  style={{ marginVertical: 20 }} 
/>
```