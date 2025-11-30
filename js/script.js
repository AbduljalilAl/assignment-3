document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* -------------------------------------------------
   * 1) Dark mode toggle with localStorage persistence
   * ------------------------------------------------- */
  const THEME_KEY = "theme";
  const toggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  if (shouldUseDark) body.classList.add("dark-mode");

  const setToggleText = () => {
    if (toggleBtn) toggleBtn.textContent = body.classList.contains("dark-mode") ? "Light mode" : "Dark mode";
  };
  setToggleText();

  toggleBtn?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    setToggleText();
  });

  /* -------------------------------
   * 2) Personalized greeting (About)
   * ------------------------------- */
  const greetingEl = document.getElementById("greeting");
  const NAME_KEY = "remembered-name";
  const savedName = localStorage.getItem(NAME_KEY) || "";

  function updateGreeting(name = savedName) {
    if (!greetingEl) return;
    const hour = new Date().getHours();
    const period = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
    const trimmed = name.trim();
    greetingEl.textContent = trimmed ? `Good ${period}, ${trimmed}! Welcome to my portfolio.` : `Good ${period}, welcome to my portfolio.`;
  }
  updateGreeting();

  /* -------------------------------------------
   * 3) Remember visitor name + saved state
   * ------------------------------------------- */
  const rememberInput = document.getElementById("remember-name");
  const rememberSave = document.getElementById("remember-save");
  const rememberText = document.getElementById("remembered-name");

  function refreshRemembered(name) {
    if (rememberInput) rememberInput.value = name || "";
    if (rememberText) rememberText.textContent = name ? `Saved: ${name}` : "";
    updateGreeting(name || "");
  }
  refreshRemembered(savedName);

  rememberSave?.addEventListener("click", () => {
    const value = rememberInput?.value.trim() || "";
    localStorage.setItem(NAME_KEY, value);
    refreshRemembered(value);
  });

  /* -------------------------------------------
   * 4) Session timer (time on site)
   * ------------------------------------------- */
  const timerEl = document.getElementById("session-timer");
  const startedAt = Date.now();
  function formatSeconds(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  if (timerEl) {
    setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      timerEl.textContent = `Time on site: ${formatSeconds(elapsed)}`;
    }, 1000);
  }

  /* ---------------------------------------------------
   * 5) Projects: search + tag filter + sort + empty state
   * --------------------------------------------------- */
  const searchInput = document.getElementById("project-search");
  const filterSelect = document.getElementById("project-filter");
  const sortSelect = document.getElementById("project-sort");
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const container = document.querySelector(".projects-container");
  const emptyState = document.getElementById("project-empty");
  const PROJECT_STATE_KEY = "project-state";

  const savedState = (() => {
    try { return JSON.parse(localStorage.getItem(PROJECT_STATE_KEY) || "{}"); } catch { return {}; }
  })();

  if (searchInput && savedState.search) searchInput.value = savedState.search;
  if (filterSelect && savedState.filter) filterSelect.value = savedState.filter;
  if (sortSelect && savedState.sort) sortSelect.value = savedState.sort;

  function persistState() {
    const state = {
      search: searchInput?.value || "",
      filter: filterSelect?.value || "all",
      sort: sortSelect?.value || "latest",
    };
    localStorage.setItem(PROJECT_STATE_KEY, JSON.stringify(state));
  }

  function applySort() {
    if (!container) return;
    const order = sortSelect?.value || "latest";
    const sorted = [...cards].sort((a, b) => {
      if (order === "title") {
        return (a.dataset.title || "").localeCompare(b.dataset.title || "");
      }
      const aDate = new Date(a.dataset.date || 0).getTime();
      const bDate = new Date(b.dataset.date || 0).getTime();
      return order === "oldest" ? aDate - bDate : bDate - aDate;
    });
    sorted.forEach((card) => container.appendChild(card));
  }

  function applyFilters() {
    const q = (searchInput?.value || "").toLowerCase().trim();
    const tag = filterSelect?.value || "all";
    let visible = 0;

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const tags = (card.getAttribute("data-tags") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const matchesText = !q || text.includes(q);
      const matchesTag = tag === "all" || tags.includes(tag);
      const show = matchesText && matchesTag;

      card.style.display = show ? "block" : "none";
      if (show) visible++;
    });

    if (emptyState) emptyState.classList.toggle("hidden", visible !== 0);
    persistState();
  }

  function applyProjectView() {
    applySort();
    applyFilters();
  }

  searchInput?.addEventListener("input", applyProjectView);
  filterSelect?.addEventListener("change", applyProjectView);
  sortSelect?.addEventListener("change", applyProjectView);
  if (cards.length) applyProjectView();

  /* ------------------------------------------------------
   * 6) Random Dev Tip API (AdviceSlip) + retry + fallback
   * ------------------------------------------------------ */
  const factBox = document.getElementById("fact-box");
  const retryBtn = document.getElementById("fact-retry");

  async function loadTip() {
    if (!factBox) return;
    factBox.textContent = "Loading...";
    retryBtn && (retryBtn.disabled = true);
    try {
      const res = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      factBox.textContent = data?.slip?.advice || "Here is a tip: keep learning!";
    } catch (e) {
      factBox.innerHTML = "Could not load a tip. <span style=\"opacity:.8\">You can retry.</span>";
    } finally {
      retryBtn && (retryBtn.disabled = false);
    }
  }
  retryBtn?.addEventListener("click", loadTip);
  loadTip();

  /* -------------------------------------------------
   * 7) GitHub API integration (latest repos)
   * ------------------------------------------------- */
  const ghForm = document.getElementById("github-form");
  const ghInput = document.getElementById("github-username");
  const ghStatus = document.getElementById("github-status");
  const ghList = document.getElementById("github-repos");
  const GH_KEY = "github-username";

  const savedUser = localStorage.getItem(GH_KEY) || "";
  if (ghInput && savedUser) ghInput.value = savedUser;

  function setStatus(text, type = "info") {
    if (!ghStatus) return;
    ghStatus.textContent = text;
    ghStatus.className = `card status-${type}`;
  }

  function renderRepos(repos) {
    if (!ghList) return;
    ghList.innerHTML = "";
    repos.forEach((repo) => {
      const li = document.createElement("li");
      li.className = "github-item";

      const title = document.createElement("h3");
      const link = document.createElement("a");
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = repo.name;
      title.appendChild(link);

      const desc = document.createElement("p");
      desc.textContent = repo.description || "No description provided.";

      const meta = document.createElement("div");
      meta.className = "github-meta";
      const lang = repo.language ? `Language: ${repo.language}` : "Language: n/a";
      const updated = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : "n/a";
      meta.textContent = `${lang} | Updated: ${updated}`;

      li.append(title, desc, meta);
      ghList.appendChild(li);
    });
  }

  async function loadRepos(username) {
    if (!username) {
      setStatus("Please enter a GitHub username.", "error");
      return;
    }
    setStatus("Loading repositories...");
    ghList && (ghList.innerHTML = "");
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=5`, {
        headers: { Accept: "application/vnd.github+json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setStatus("No repositories found for that user.", "error");
        return;
      }
      setStatus("Showing most recently updated repositories.");
      renderRepos(data.slice(0, 5));
    } catch (err) {
      setStatus("Could not load GitHub data. Please try again later.", "error");
    }
  }

  ghForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = ghInput?.value.trim();
    if (username) localStorage.setItem(GH_KEY, username);
    loadRepos(username);
  });

  if (ghInput) {
    const initialUser = ghInput.value.trim();
    if (initialUser) loadRepos(initialUser);
  }

  /* ----------------------------------------------
   * 8) Contact form: validation + animated messages
   * ---------------------------------------------- */
  const form = document.querySelector(".contact-form");
  const msg = document.getElementById("form-msg");

  function showMsg(text, type = "success") {
    if (!msg) return;
    msg.textContent = text;
    msg.className = `form-msg show ${type}`;
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();
    const emailOk = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name) return showMsg("Please enter your name.", "error");
    if (!emailOk) return showMsg("Please enter a valid email.", "error");
    if (!message) return showMsg("Please write a message.", "error");

    showMsg("Thanks! Your message was recorded locally.", "success");
    form.reset();
  });
});
