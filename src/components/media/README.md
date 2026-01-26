# 🛠 Kitchen Sink: Media Library

This folder contains our media and image display components built for the **React Native CLI** environment.

---

## ImgSlider

### Component Overview

A responsive image slider component that displays a gallery of images with pagination dots. It features automatic scrolling, touch gestures, and smooth transitions.

### Dependencies

* **Internal:** None.
* **External:** None.

### Props Table

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `images` | `string[]` | **Required** | Array of image URLs to display. |
| `height` | `number` | `200` | The height of the slider container. |
| `autoPlay` | `boolean` | `true` | Enables automatic sliding to the next image. |
| `interval` | `number` | `3000` | Time in milliseconds between slides. |

### Usage Example

```tsx
const images = [
  "https://via.placeholder.com/600x400",
  "https://via.placeholder.com/600x400/555",
];

// Basic Usage
<ImgSlider images={images} />

// Custom Configuration
<ImgSlider 
  images={images} 
  height={300} 
  autoPlay={false} 
/>
```