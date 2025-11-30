# Assignment 3 - Advanced Functionality (Portfolio)

A personal portfolio with advanced interactivity: persisted theme, remembered visitor name, session timer, live project search/filter/sort with saved state, GitHub API feed, AdviceSlip API tips, and validated contact form. Performance tweaks include lazy-loaded images and fixed dimensions to avoid layout shifts.

**Student:** Abbduljalil  
**Repo:** assignment-3 (local working copy)

## Features
- Theme persistence: Dark/Light mode saved in `localStorage`, respects system preference, accessible toggle copy.
- Personalized greeting: Time-of-day greeting that uses the remembered visitor name.
- Remember my name: Input + save button stores a visitor name locally and updates the greeting.
- Session timer: Shows how long the visitor has been on the page.
- Projects search/filter/sort: Live text search, tag filter, and sort (newest/oldest/title). State (search/filter/sort) is saved locally. Empty state message when nothing matches.
- GitHub repos API: Fetches the latest updated repositories for a username with loading, error, and empty handling. Username is stored locally.
- Random Dev Tip API: AdviceSlip fetch with loading, retry, and error fallback.
- Contact form validation: Name/email/message checks with inline, animated feedback; no backend required.
- Performance: Lazy-loaded images with explicit width/height to reduce layout shifts; trimmed CSS/JS and reduced repeated work.

## Project Structure
```
assignment-3/
+-- index.html
+-- css/
�   +-- styles.css
+-- js/
�   +-- script.js
+-- assets/
�   +-- images/
+-- docs/
�   +-- ai-usage-report.md
�   +-- technical-documentation.md
+-- .gitignore
```

## Run Locally
1) Clone the repository.  
2) Open `index.html` in a browser (or use any simple static server).  
   - VS Code: use the "Live Server" extension and open `index.html`.  
   - Or run a simple server: `python -m http.server 8000` and open `http://localhost:8000`.
3) No build step needed (plain HTML/CSS/JS).

## Usage
- Theme toggle: Click "Dark mode"/"Light mode" in the navbar; preference persists.
- Greeting + name: Enter a name in "Remember your name" and Save; greeting updates and the value persists.
- Timer: "Time on site" updates every second.
- Projects: Type to search, choose a tag, and sort via the dropdown. State is saved between visits. If no projects match, an empty state appears.
- GitHub feed: Enter a GitHub username and click "Load repos" to fetch the latest 5 updated repos. Saved locally for convenience. Shows loading, errors, or empty results.
- Dev Tip: Click "Try another" to fetch a new tip; shows loading and error fallback.
- Contact form: Validates name/email/message; shows inline success/error messages (simulated submit).

## AI Usage (summary)
- ChatGPT was used for brainstorming feature ideas, copy clean-up, and code scaffolding for sorting/state, GitHub fetch patterns, and UX wording. All code was reviewed, adapted, and tested locally. Details are logged in `docs/ai-usage-report.md` (tool, prompts, outputs, edits, and learnings).

## Deployment
- GitHub Pages: push to GitHub, then enable Pages on the repository (root).  
- Netlify/Vercel: deploy as a static site (no build step required).
