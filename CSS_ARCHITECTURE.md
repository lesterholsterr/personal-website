# CSS Architecture Guide

This document explains the CSS and styling architecture for the Next.js application.

## Overview

The project uses a modern CSS architecture combining:
- **Tailwind CSS v4** with inline theming
- **CSS Variables** for dynamic theming
- **Class-based dark mode** with automatic system preference detection
- **Custom CSS** for specific animations and browser styling

## File Structure

```
src/app/globals.css          # Global styles, CSS variables, custom CSS
tailwind.config.js           # Tailwind configuration
postcss.config.mjs          # PostCSS configuration (Tailwind v4)
```

## Tailwind CSS v4 Implementation

### Inline Theming
Uses Tailwind's new `@theme inline` approach for CSS variables:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

### PostCSS Configuration
Minimal configuration using the new Tailwind v4 PostCSS plugin:

```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};
```

## Dark Mode Implementation

### Dual Approach
1. **Automatic**: Responds to `prefers-color-scheme: dark`
2. **Manual**: Uses `.dark` class for user toggle

### CSS Variables
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

### Usage in Components
Every component uses dark mode variants:
```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

## Typography System

### Font Configuration
- **Primary**: Geist Sans (via `next/font/google`)
- **Monospace**: Geist Mono (via `next/font/google`)
- **Implementation**: CSS variables set in `layout.tsx`

```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

### Typography Plugin
Uses `@tailwindcss/typography` for blog post content with extensive customization for both light and dark modes.

## Custom CSS Components

### 1. Fade In Animation
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}
```

**Usage**: Applied to hero sections and project cards for smooth entrance animations.

### 2. Custom Scrollbar
Webkit-based scrollbar styling with dark mode support:
- Light mode: Light gray track with darker thumb
- Dark mode: Dark gray track with lighter thumb
- Hover effects for better UX

### 3. Form Placeholders
Simplified cross-browser placeholder styling:
- Light mode: `#6b7280` (gray-500)
- Dark mode: `#9ca3af` (gray-400)

## Responsive Design

### Breakpoint Strategy
- **Mobile-first**: Base styles for mobile
- **sm**: 640px+ (small tablets)
- **lg**: 1024px+ (desktop)
- **Selective md**: Used sparingly for specific components

### Common Patterns
```jsx
// Layout responsive
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// Typography responsive  
<h1 className="text-4xl sm:text-5xl lg:text-6xl">

// Spacing responsive
<section className="py-16 lg:py-24">
```

## Color System

### Grayscale Palette
- **Light mode**: gray-900 (text) → gray-50 (backgrounds)
- **Dark mode**: gray-100 (text) → gray-900 (backgrounds)
- **Consistent mapping**: Each light color has corresponding dark variant

### Interactive States
- **Hover**: Subtle color shifts and transforms
- **Focus**: Ring-based focus indicators
- **Transitions**: 200-300ms duration for smooth interactions

## Best Practices

### 1. Component Styling
- Use Tailwind classes primarily
- Consistent dark mode variants on all visible elements
- Responsive utilities for layout changes

### 2. Custom CSS Usage
- Minimal custom CSS (only for animations and browser-specific styling)
- CSS variables for dynamic values
- Avoid component-specific CSS files

### 3. Performance
- Tailwind's purge system removes unused styles
- CSS variables reduce specificity conflicts
- Minimal custom CSS reduces bundle size

## Component Examples

### Typical Component Structure
```jsx
export default function Component() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
          Title
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content */}
        </div>
      </div>
    </section>
  );
}
```

This architecture provides:
- ✅ Consistent theming across all components
- ✅ Automatic dark mode support
- ✅ Responsive design patterns
- ✅ Performance optimization
- ✅ Maintainable CSS structure