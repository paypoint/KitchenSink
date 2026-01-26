# 🛠 Kitchen Sink: Accordion Library

This folder contains our accordion component built for the **React Native CLI** environment.

---

## Accordion

### Component Overview

A collapsible list component that organizes content into expandable rows. It supports single or multiple expansion modes with smooth height animations.

### Dependencies

* **Internal:** `AppText`, `theme` tokens.
* **External:** `@types/react-native-vector-icons`.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `items` | `AccordionItem[]` | **Required** | Array of objects containing `id`, `title`, and `content`. |
| `allowMultipleOpen` | `boolean` | `false` | If true, allows multiple rows to be expanded simultaneously. |

**Type Definition:**
```ts
type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};
```

### Usage Example

```tsx
const items = [
  { id: "1", title: "Section 1", content: <AppText>Content 1</AppText> },
  { id: "2", title: "Section 2", content: <AppText>Content 2</AppText> },
];

<Accordion items={items} />

<Accordion items={items} allowMultipleOpen />
```