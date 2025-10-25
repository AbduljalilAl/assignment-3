# Technical Documentation – Assignment 2

## Overview
A personal portfolio site enhanced with interactive features: theme persistence, greeting, project search/filter, an API-powered “Dev Tip,” and accessible form validation. Smooth transitions and reduced-motion support improve UX.

## Stack
- **HTML5 / CSS3 / JavaScript (ES6)**
- No framework, no build step (static site)

## Structure
assignment-2/
├── index.html
├── css/
│ └── styles.css
├── js/
│ └── script.js
├── assets/
│ └── images/
└── docs/
├── ai-usage-report.md
└── technical-documentation.md 


## Key UI Elements
- **Theme toggle:** `#theme-toggle` toggles `body.dark-mode` and persists preference.
- **Greeting:** `#greeting` shows time-based message.
- **Projects:** `.project-card` with `data-tags` for filtering.
- **Controls:** `#project-search`, `#project-filter`, empty state `#project-empty`.
- **Dev Tip:** `#fun-fact` section with `#fact-box` and `#fact-retry`.
- **Contact form:** `.contact-form` with inputs `#name`, `#email`, `#message` and feedback `#form-msg`.

## Interactive Features – How They Work

### 1) Theme Persistence
- **Storage key:** `theme` with values `"dark"` or `"light"`.
- **Init:** On `DOMContentLoaded`, apply saved theme; if none, fall back to `prefers-color-scheme: dark`.
- **Toggle:** Clicking the button toggles the class and updates localStorage and button text.

### 2) Greeting
- **Logic:** `new Date().getHours()` → morning/afternoon/evening copy.
- **Accessibility:** `aria-live="polite"` on the greeting text.

### 3) Project Search & Filter
- **Search:** Case-insensitive text match on `.project-card` textContent.
- **Filter:** `data-tags` (e.g., `web`, `testing`); select “All” shows all.
- **Empty state:** If no visible cards, show `#project-empty`.

### 4) Random Dev Tip (API)
- **Endpoint:** `GET https://api.adviceslip.com/advice`
- **Cache:** `fetch` with `{ cache: "no-store" }`.
- **States:** 
  - Loading → “Loading…”
  - Success → display `data.slip.advice`
  - Error → friendly fallback + retry button
- **Optional UX:** Button spinner via `.is-loading` class (CSS `::after` spinner).

### 5) Contact Form Validation
- **Validation:**
  - Name: required (non-empty)
  - Email: required + regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`
  - Message: required
- **Feedback:** `#form-msg` shows error/success with `.form-msg.show` animation.
- **Submission:** Simulated (no backend); success clears the form.

## Styling & Animation

### Color Transitions
- **Why:** Section backgrounds change in dark mode.
- **Rules:** `body` and `.section` have `transition: background-color, color` to avoid a hard jump.

### Image Hover
- `.project-card img` transitions `transform` and `filter` on hover for a subtle zoom/brighten.

### Reduced Motion
- **Policy:** Keep gentle hover/colour transitions; disable heavy entrance animation:
  ```css
  @media (prefers-reduced-motion: reduce) { .fade-in { animation: none !important; } }
