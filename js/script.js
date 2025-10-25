document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------
   * 1) Dark mode toggle with localStorage persistence
   * ------------------------------------------------- */
  const toggleBtn = document.getElementById("theme-toggle");

  // Apply saved preference (or OS dark mode if no saved pref)
  const savedTheme = localStorage.getItem("theme"); // "dark" | "light" | null
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
  }
  if (toggleBtn) {
    toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "Light mode☀️" : "Dark mode🌙";
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      toggleBtn.textContent = isDark ? "Light mode☀️" : "Dark mode🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  /* -------------------------------
   * 2) Personalized greeting (About)
   * ------------------------------- */
  const greetingEl = document.getElementById("greeting");
  if (greetingEl) {
    const hour = new Date().getHours();
    const period = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
    greetingEl.textContent = `Good ${period}, welcome to my portfolio.`;
  }

  /* ---------------------------------------------------
   * 3) Projects: live search + tag filter + empty state
   * --------------------------------------------------- */
  const searchInput = document.getElementById("project-search");
  const filterSelect = document.getElementById("project-filter");
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const emptyState = document.getElementById("project-empty");

  function applyProjectFilters() {
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
  }

  if (searchInput) searchInput.addEventListener("input", applyProjectFilters);
  if (filterSelect) filterSelect.addEventListener("change", applyProjectFilters);
  if (cards.length) applyProjectFilters();

  /* ------------------------------------------------------
   * 4) “Random Dev Tip” API (AdviceSlip) + retry + fallback
   * ------------------------------------------------------ */
  const factBox = document.getElementById("fact-box");
  const retryBtn = document.getElementById("fact-retry");

  async function loadTip() {
    if (!factBox) return;
    factBox.textContent = "Loading…";
    try {
      const res = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      factBox.textContent = data?.slip?.advice || "Here’s a tip: keep learning!";
    } catch (e) {
      factBox.innerHTML = `Couldn’t load a tip. <span style="opacity:.8">(You can retry.)</span>`;
    }
  }
  if (retryBtn) retryBtn.addEventListener("click", loadTip);
  loadTip();

  /* ----------------------------------------------
   * 5) Contact form: validation + animated messages
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

    // Simulate success (no backend)
    showMsg("Thanks! Your message was recorded locally.", "success");
    form.reset();
  });
});
