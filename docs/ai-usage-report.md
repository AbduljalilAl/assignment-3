# AI Usage Report - Assignment 3

**Student:** Abbduljalil  
**Repo:** assignment-3  
**Date:** 25 Oct

This log lists how AI was used while building Assignment 3. For each case: tool, prompt summary, AI output summary, my edits, and what I learned.

---

## 1) Feature Planning & Copy Clean-up
- **Tool:** ChatGPT
- **Prompt (summary):** Help outline upgrades for Assignment 3 and fix corrupted UI copy.
- **AI Output (summary):** Suggested feature set (GitHub feed, persisted filters, timer, remembered name) and clean wording.
- **My Edits:** Chose specific behaviors (state keys, API endpoints, empty states) and rewrote text in my own style.
- **Learning:** Structured feature planning before coding reduces rework.

## 2) GitHub API Fetch Pattern
- **Tool:** ChatGPT
- **Prompt:** Sample fetch for latest repos with loading/error/empty states.
- **AI Output:** Fetch `https://api.github.com/users/{user}/repos` with try/catch and list rendering.
- **My Edits:** Added `per_page=5`, `sort=updated`, DOM-safe rendering (createElement), localStorage for username, and status card states.
- **Learning:** How to harden API UI states and avoid innerHTML for external data.

## 3) Projects Sorting + Persisted Filters
- **Tool:** ChatGPT
- **Prompt:** Sorting `.project-card` elements by data attributes and saving filter state.
- **AI Output:** Array sort on dataset values and storing a JSON blob in localStorage.
- **My Edits:** Added combined applySort+applyFilters, default states, empty-state toggle, and graceful parsing.
- **Learning:** DOM re-append patterns for stable sorting; simple state hydration pattern.

## 4) Session Timer & Greeting Enhancements
- **Tool:** ChatGPT
- **Prompt:** Lightweight mm:ss timer and greeting that uses a saved name.
- **AI Output:** Interval-based timer and template literal greeting.
- **My Edits:** Added padding for seconds, live aria updates, and integration with the remember-name block.
- **Learning:** Small UX touches (timer copy, aria-live) improve clarity.

## 5) Styling Ideas
- **Tool:** ChatGPT
- **Prompt:** Modern card/list styling for API results and button polish.
- **AI Output:** Suggestions for gradients, box-shadows, and spacing.
- **My Edits:** Normalized to existing palette, added dark-mode variables, and ensured reduced-motion safety.
- **Learning:** Translating style ideas into a consistent theme while keeping accessibility.

## Reflection
- **Benefits:** Faster iteration on fetch/state patterns and copy cleanup.
- **Challenges:** Keeping everything ASCII and removing prior encoding glitches.
- **Understanding:** I can explain and modify the AI-assisted code paths (GitHub fetch, sorting/state, timer/greeting, styling) and why each change was made.
