# AI Usage Report – Assignment 2 (Interactive Features)

**Student:** Abbduljalil  
**Repo:** assignment-2  
**Date:** 25 oct

> This report documents how I used AI tools during development. For each use, I include the tool, my prompt, a summary of the AI output, the edits I made, and what I learned.

---

I use AI to write the report 

## 1) Persist Dark/Light Theme with localStorage
- **Tool:** ChatGPT (code suggestion)
- **My prompt (summary):** “Add a dark mode toggle that remembers the user’s preference using localStorage and updates the button text.”
- **AI output (summary):** Provided a `DOMContentLoaded` handler, reads `localStorage.theme`, toggles `body.dark-mode`, and updates button text.
- **My edits:** 
  - Added OS fallback using `prefers-color-scheme: dark`.
  - Ensured button text syncs on first load.
- **Understanding:** I can explain how localStorage works and why we check `matchMedia` if no saved theme exists.
- **Ethics note:** I verified and tested AI code; I didn’t submit unmodified output.

---

## 2) Personalized Greeting (Time of Day)
- **Tool:** ChatGPT (snippet)
- **Prompt:** “Generate a greeting message based on current hour.”
- **AI output:** A small function that sets text to morning/afternoon/evening.
- **My edits:** Wrote clear copy and attached it to `#greeting` with `aria-live="polite"`.
- **Learning:** DOM selection and time-based logic basics.

---

## 3) Projects Live Search + Filter + Empty State
- **Tool:** ChatGPT (scaffold)
- **Prompt:** “Implement search input and filter select that hide/show `.project-card` elements using data attributes.”
- **AI output:** Provided filter function reading `data-tags` and text content.
- **My edits:** Added empty state (`#project-empty`) and ensured robust null checks.
- **Learning:** Efficient DOM filtering and empty state UX.

---

## 4) “Random Dev Tip” API Widget (AdviceSlip)
- **Tool:** ChatGPT (pattern)
- **Prompt:** “Fetch from a public API, show loading text, handle errors, and add a retry button.”
- **AI output:** `fetch("https://api.adviceslip.com/advice")` with try/catch and retry.
- **My edits:** Added `cache: "no-store"`, better error copy, and optional loading spinner on the button.
- **Learning:** Basic fetch lifecycle and user feedback patterns.

---

## 5) Contact Form Validation + Animated Feedback
- **Tool:** ChatGPT (starter)
- **Prompt:** “Validate name/email/message on submit and show inline messages.”
- **AI output:** Regex-based email validation and message area update.
- **My edits:** Added accessibility roles (`role="alert"`, `aria-live="assertive"`), success reset, and animation classes.
- **Learning:** Client-side validation and accessible alerts.

---

## 6) Smooth Transitions & Reduced Motion Accessibility
- **Tool:** ChatGPT (review)
- **Prompt:** “Why do my color transitions not animate? How to fix with `.section` and keep accessibility?”
- **AI output:** Add `transition` to `.section` and `body`, narrow `prefers-reduced-motion` to only disable `.fade-in`.
- **My edits:** Kept hover/colour transitions, disabled only heavy animations for reduced motion users.
- **Learning:** Transitions aren’t inherited; animate on the element where the change occurs.

---

## 7) Modern Button Styling (Retry Button)
- **Tool:** ChatGPT (design help)
- **Prompt:** “Make `#fact-retry` look modern with gradient, elevation, focus ring, and hover sheen—no HTML changes.”
- **AI output:** Gradient, box-shadow, pseudo-element sheen, focus-visible styles.
- **My edits:** Tuned colors for dark mode and added optional spinner state via `.is-loading`.
- **Learning:** Balancing aesthetics with accessibility and reduced motion.

---

## Reflection
- **Benefits:** Faster iteration, exposure to best practices, and reminders about accessibility.
- **Challenges:** Ensuring no over-reliance; adapting generic snippets to my exact markup.
- **What I learned:** DOM patterns, accessible feedback, CSS transitions, and state handling.

