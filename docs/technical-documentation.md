# Technical Documentation - Assignment 3

## Overview
Personal portfolio with advanced interactivity: persisted theme, remembered visitor name, session timer, project search/filter/sort with saved state, GitHub API feed, AdviceSlip tip fetch, and validated contact form. Performance improvements include lazy images and defined dimensions to reduce layout shift.

## Stack
- HTML5 / CSS3 / JavaScript (ES6)
- Static site (no build tool or framework)

## Structure
```
assignment-3/
├── index.html
├── css/styles.css
├── js/script.js
├── assets/images/
└── docs/
    ├── ai-usage-report.md
    └── technical-documentation.md
```

## Key UI Elements
- `#theme-toggle`: toggles `body.dark-mode`, persists theme.
- `#greeting`: time-of-day greeting, includes remembered visitor name.
- `#remember-name`, `#remember-save`, `#remembered-name`: store and display visitor name locally.
- `#session-timer`: shows time on site.
- Projects: `.project-card` with `data-tags`, `data-date`, `data-title`; controls `#project-search`, `#project-filter`, `#project-sort`; empty state `#project-empty`.
- GitHub feed: `#github-form`, `#github-username`, `#github-status`, `#github-repos`.
- Dev Tip: `#fact-box`, `#fact-retry` (AdviceSlip API).
- Contact: `.contact-form` with inputs `#name`, `#email`, `#message`, feedback `#form-msg`.

## Interactive Features - How They Work

### Theme Persistence
- Storage key: `theme` (`dark` | `light`).
- Init: applies saved theme; if none, respects `prefers-color-scheme: dark`.
- Toggle updates class and localStorage; button text reflects current mode.

### Greeting + Remembered Name
- Greeting chooses morning/afternoon/evening via `Date.getHours()`.
- Name is stored under `remembered-name`; saving updates greeting and a status line.

### Session Timer
- On page load, start time is captured; a 1s interval updates `Time on site: m:ss`.

### Projects: Search, Filter, Sort, Persisted State
- Inputs: text search, tag filter, sort (latest/oldest/title).
- Sorting uses `data-date` (parsed) or `data-title`; DOM nodes are re-appended in sorted order.
- Filtering matches text content and `data-tags`.
- Empty state toggles when no visible cards.
- State (search/filter/sort) is stored in `localStorage` under `project-state` and re-applied on load.

### GitHub API Integration
- Endpoint: `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=5` with `Accept: application/vnd.github+json`.
- Username stored locally under `github-username` and prefilled on load.
- States: waiting, loading, success (renders list), error, empty.
- Renders repo name/link, description, language, and last updated date.

### Random Dev Tip (AdviceSlip)
- Endpoint: `GET https://api.adviceslip.com/advice` with `{ cache: "no-store" }`.
- States: loading, success (`slip.advice`), error fallback with retry button.
- Retry button is disabled while fetching.

### Contact Form Validation
- Validates name non-empty, email regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`, and message non-empty.
- Feedback via `#form-msg` with animated classes; simulated success clears the form.

## Styling & Performance
- Lazy-loaded images (`loading="lazy"`, `decoding="async"`) with explicit `width/height` to prevent layout shifts.
- Theme colors defined via CSS variables for light/dark modes.
- Smooth transitions on background/color; hover states use transform/opacity.
- Reduced-motion support disables heavy animations.
- GitHub/feed cards share the card style and reuse utility classes.

## Accessibility
- `aria-live` on greeting, timer, fact box, and form message.
- `role="status"` on timer and empty states; `role="alert"` on form feedback.
- Focus-visible states maintained for interactive elements.

## Data/State Keys
- `theme`: "dark" | "light"
- `remembered-name`: visitor name string
- `project-state`: JSON `{ search, filter, sort }`
- `github-username`: last used username
