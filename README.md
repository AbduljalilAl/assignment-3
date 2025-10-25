Assignment 2 – Interactive Features (Portfolio)

A lightweight, accessible personal portfolio enhanced with interactive features: saved dark/light theme, time-based greeting, live project search & filter with empty states, an API-powered “Random Dev Tip,” and a validated contact form — all with smooth transitions and reduced-motion support.

Student: Abbduljalil
Repo: assignment-2

✨ Features

Theme persistence: Dark/Light mode saved in localStorage and applied on load.

Personalized greeting: Time-of-day message in the About section.

Projects search & filter: Real-time text search + tag filter (data-tags), with an empty state.

Random Dev Tip (API): Fetches advice from AdviceSlip, shows loading, error fallback, and retry.

Contact form validation: Inline feedback (name/email/message), accessible alerts, animated messages.

Smooth UX: Gentle color/hover transitions, entrance fades (disabled for reduced-motion users).

Mobile-friendly: Responsive layout with flexible cards and wrapping controls.

🗂️ Project Structure
assignment-2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/           # profile + project images (add screenshots if you like)
└── docs/
    ├── ai-usage-report.md
    └── technical-documentation.md

🚀 Getting Started
Run locally

Clone the repository.

Open index.html directly in your browser or use a local server:

VS Code → “Live Server” extension → Open with Live Server

Or run any simple static server.

No build tools required — plain HTML/CSS/JS.

🛠️ How to Use

Theme toggle: Click Dark mode🌙 / Light mode☀️ in the navbar. Preference persists across reloads.

Greeting: See a “Good morning/afternoon/evening” message in About.

Search & filter: In Projects, type in the search bar or choose a tag from the dropdown.

If nothing matches, it shows “No projects found.”

Random Dev Tip: In Random Dev Tip, click Try another to fetch a new tip.

Shows Loading…, disables the button with a spinner (if enabled), and handles errors gracefully.

Contact form: Fill in Name, Email, Message → Submit.

Inline errors appear for missing/invalid fields.

On success, the form resets and a success message appears.

🧩 Key Implementation Details

Storage: Theme saved under localStorage["theme"] ("dark"/"light"). If absent, respects OS prefers-color-scheme.

Filtering: Each .project-card has data-tags (e.g., web, testing). Text search checks the card’s text content.

API: GET https://api.adviceslip.com/advice with { cache: "no-store" } to avoid stale results.

Loading/Error states: “Loading…” text; friendly error with a retry option.

Accessibility: aria-live="polite" (greeting, tip box), role="alert" & aria-live="assertive" for form messages, strong :focus-visible styles, reduced motion support.

🧪 Compatibility & Performance

Tested on modern browsers (Chrome, Edge, Firefox).

Animations use transform/opacity for smoothness.

Reduced motion users get minimal movement (color/hover kept gentle).

📄 Documentation

AI Usage Report: docs/ai-usage-report.md
Details of prompts, outputs, edits, and learning.

Technical Documentation: docs/technical-documentation.md
How features work (data flow, validation, API behavior, accessibility).

🌐 Deployment (GitHub Pages)

Push to GitHub.

Repo Settings → Pages.

Source: main branch → / (root) → Save.

Use the URL shown (add it to the top of this README).

(Netlify/Vercel also work: drag-and-drop the folder or connect the repo.)

✅ Assignment Checklist

 Public repo with clear structure

 Dynamic content (greeting, search/filter)

 Data handling (localStorage + public API)

 Animations & transitions (theme/hover/fade)

 Error handling & user feedback (loading, retry, empty state, form validation)

 AI enhancement + documented usage

 Updated README + technical docs

🔮 Future Ideas

Tag chips with multi-select filters.

Load projects from a JSON file or API.

Real form submission via a serverless endpoint.

Unit tests for filtering and validation.

🙌 Credits

Advice API: AdviceSlip
.

Everything else: plain HTML/CSS/JS authored and adapted by Abbduljalil.