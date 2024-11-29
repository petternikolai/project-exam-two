# Project Exam Two - Style Guide

## Custom Fonts

- **Primary Font**: `"Inter", sans-serif` for body text and UI elements.
- **Logo Font**: `"Cookie-Regular", "Inter", sans-serif`.

- ## Colors
- **Accent Color**:
  - **Hex Code**: `#AFBF36`.
  - Utility Classes: `bg-accent`, `text-accent`, `border-accent`, etc.
- Recommended Use:
  - Primary buttons, highlights, and key UI elements.

## Global Design Tokens

- **Header Height**: `96px`.
- **Minimum Page Height**: `.custom-height` (`calc(100vh - 96px)`).

## Typography

- **Logo**: `font-size: 2rem;` with the `"Cookie-Regular"` font.
- **Body Text**: Tailwind's `font-sans` (uses "Inter").
- Tailwind utilities: `text-xl`, `leading-relaxed`, etc.

## Color Palette

- **Primary Green**: `#afbf36` (used for `start-date` and `end-date`).
- **Light Background**: `rgba(175, 191, 54, 0.5)` (intermediate dates).
- **Skeleton Loader**:
  - Base: `#e0e0e0`.
  - Highlight: `#f0f0f0`.
- **Spinner**:
  - Base: `#f3f3f3`.
  - Accent: `#afbf36`.

## Grid Layout

- **Custom Grid Template**:
  - Key Template: `[auto, auto, 1fr]`.
  - Tailwind Utility Class: `grid-rows-[auto,auto,1fr]`.
- Recommended Use:
  - Layouts where the first two rows size automatically, and the last row takes up remaining space (e.g., modals or pages).

## Plugins

- **Tailwind Forms Plugin**:
  - Automatically styles form elements with accessible and consistent defaults.
  - Includes utilities such as:
    - `form-input`
    - `form-select`
    - `form-checkbox`
- Recommended Use:
  - Simplifies form design without custom CSS.

## Animations

- **Keyframes and Animations**:
  - `fadeInOut`: A smooth opacity fade animation.
    ```javascript
    keyframes: {
      fadeInOut: {
        "0%, 100%": { opacity: 0 },
        "50%": { opacity: 1 },
      },
    }
    animation: {
      fadeInOut: "fadeInOut 4s infinite",
    }
    ```
  - `skeleton-loading`: Creates a shimmer effect for skeleton loaders.
    ```javascript
    keyframes: {
      skeletonLoading: {
        "0%": { backgroundPosition: "200% center" },
        "100%": { backgroundPosition: "-200% center" },
      },
    }
    animation: {
      skeleton: "skeleton-loading 1s infinite",
    }
    ```

## Responsive Design

- **Breakpoints**:
  - Default Tailwind breakpoints:
    - `sm`: 640px
    - `md`: 768px
    - `lg`: 1024px
    - `xl`: 1280px
    - `2xl`: 1536px
  - Suggested Addition:
    - `xs`: 480px (for extra-small screens).
