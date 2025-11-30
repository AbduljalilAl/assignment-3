# AI Usage Report - Assignment 3

**Student:** Abbduljalil  
**Repo:** assignment-3  
**Date:** 25 Oct

I used AI (ChatGPT) to speed up planning and coding. Below is a concise record of where AI helped; I reviewed and edited everything to fit my project and to ensure I understand it.

---

## Planning and Copy Fixes
- **Prompt:** Outline Assignment 3 upgrades and fix corrupted UI text.
- **AI Output:** Suggested adding GitHub feed, saved filters, timer, remembered name, and cleaner wording.
- **My Edits:** Chose the exact behaviors/state keys and rewrote the copy.
- **Learning:** Up-front planning avoided rework.

## GitHub API Section
- **Prompt:** Fetch latest repos with loading/error/empty states.
- **AI Output:** Fetch pattern for `users/{user}/repos` with try/catch.
- **My Edits:** Added `per_page=5`, `sort=updated`, DOM-safe rendering, saved username, and status cards.
- **Learning:** Safer API UI states and avoiding innerHTML for external data.

## Projects Sorting + Saved State
- **Prompt:** Sort `.project-card` by data attributes and persist filters.
- **AI Output:** Array sort and localStorage example.
- **My Edits:** Combined sort+filter, empty-state toggle, default hydration, gentle parsing.
- **Learning:** Reliable DOM reordering and simple state hydration.

## Timer + Greeting
- **Prompt:** Simple mm:ss timer and greeting that uses a saved name.
- **AI Output:** Interval timer and template literal greeting.
- **My Edits:** Added aria-live, padded seconds, and integration with the remember-name block.
- **Learning:** Small UX details improve clarity.

## Styling Pass
- **Prompt:** Modern card/list styling and button polish.
- **AI Output:** Gradient/button ideas and spacing hints.
- **My Edits:** Fit into the existing palette, added dark-mode variables, kept reduced-motion safety.
- **Learning:** How to adapt design ideas without breaking accessibility.

## Reflection
- **Benefits:** Faster iteration on fetch/state patterns and copy cleanup.
- **Challenges:** Keeping everything ASCII and removing prior encoding glitches.
- **Understanding:** I can explain and modify the AI-assisted code paths (GitHub fetch, sorting/state, timer/greeting, styling) and why each change was made.
