window.SUPABASE_URL = "https://sogccwzcjeifrnbkoyrd.supabase.co";
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZ2Njd3pjamVpZnJuYmtveXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNTA3MTcsImV4cCI6MjA5MTYyNjcxN30.w6g0tIOVClsxIQuMHB-JZ2nf7sWNqfbLAPNoinDSNMw";

(function () {
  const KEYS = {
    backgroundImage: "lakis_theme_bg_dataurl",
    homeImage: "lakis_theme_home_image_dataurl",
    welcomeText: "lakis_theme_welcome_text",
    themeTextColor: "lakis_theme_text_color",
    contentTextColor: "lakis_content_text_color"
  };

  const DEFAULTS = {
    backgroundImage: "",
    homeImage: "",
    welcomeText: "欢迎来访^^",
    themeTextColor: "#1b3a28",
    contentTextColor: "#3f5f4b"
  };

  function getAppearance() {
    const output = { ...DEFAULTS };
    try {
      const bg = localStorage.getItem(KEYS.backgroundImage);
      const home = localStorage.getItem(KEYS.homeImage);
      const welcome = localStorage.getItem(KEYS.welcomeText);
      const color = localStorage.getItem(KEYS.themeTextColor);
      const contentColor = localStorage.getItem(KEYS.contentTextColor);
      if (bg) output.backgroundImage = bg;
      if (home) output.homeImage = home;
      if (welcome) output.welcomeText = welcome;
      if (color) output.themeTextColor = color;
      if (contentColor) output.contentTextColor = contentColor;
    } catch {
      // ignore
    }
    return output;
  }

  function setAppearance(patch) {
    if (!patch || typeof patch !== "object") return;
    try {
      Object.entries(patch).forEach(([k, v]) => {
        if (!(k in KEYS)) return;
        if (v == null || v === "") localStorage.removeItem(KEYS[k]);
        else localStorage.setItem(KEYS[k], String(v));
      });
    } catch {
      // ignore
    }
    applyAppearance();
  }

  function resetAppearance() {
    try {
      Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
    } catch {
      // ignore
    }
    applyAppearance();
  }

  function applyAppearance() {
    const cfg = getAppearance();
    const root = document.documentElement;
    if (!root) return;

    if (cfg.backgroundImage) {
      const safe = cfg.backgroundImage.replace(/"/g, '\\"');
      root.style.setProperty("--site-bg-image", `url("${safe}")`);
    } else {
      root.style.removeProperty("--site-bg-image");
    }

    const color = String(cfg.themeTextColor || "").trim();
    if (color) {
      root.style.setProperty("--text", color);
      root.style.setProperty("--accent", color);
      root.style.setProperty("--accent-2", color);
    }
    const contentColor = String(cfg.contentTextColor || "").trim();
    if (contentColor) {
      root.style.setProperty("--content-text-color", contentColor);
    }

    const homeImg = document.getElementById("homeMainImage") || document.querySelector(".home__image");
    if (homeImg && cfg.homeImage) {
      homeImg.src = cfg.homeImage;
    }

    const welcome = document.getElementById("homeWelcome") || document.querySelector(".home__subtitle");
    if (welcome && cfg.welcomeText) {
      welcome.textContent = cfg.welcomeText;
    }
  }

  window.LAKIS_APPEARANCE = {
    keys: KEYS,
    defaults: DEFAULTS,
    get: getAppearance,
    update: setAppearance,
    reset: resetAppearance,
    apply: applyAppearance
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyAppearance, { once: true });
  } else {
    applyAppearance();
  }

  window.addEventListener("storage", (event) => {
    if (Object.values(KEYS).includes(event.key)) applyAppearance();
  });
})();
