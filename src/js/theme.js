class Theme {
  constructor() {
    this.cacheDOM();
    this.bindEvents();
    this.updateThemeAndIcon();
  }

  static {
    const savedTheme = sessionStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.dataset.theme = savedTheme;
    } else {
      document.documentElement.dataset.theme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
        ? "dark"
        : "light";
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const savedTheme = sessionStorage.getItem("theme");
        if (!savedTheme) {
          document.documentElement.dataset.theme = event.matches
            ? "dark"
            : "light";
          Theme.#notifyUpdate();
        }
      });
  }

  static ICONS = {
    light: "./img/svgsprite/sprite.symbol.svg#icon-moon",
    dark: "./img/svgsprite/sprite.symbol.svg#icon-sun",
  };

  static #switchTheme() {
    document.documentElement.dataset.theme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";

    sessionStorage.setItem("theme", document.documentElement.dataset.theme);
    Theme.#notifyUpdate();
  }

  static #instances = new Set();

  static #notifyUpdate() {
    Theme.#instances.forEach((instance) => instance.updateThemeAndIcon());
  }

  cacheDOM() {
    this.themeBtn = document.querySelector(".navigation__theme-btn");
    this.themeIcon = document.querySelector(".navigation__theme-icon use");
  }

  bindEvents() {
    Theme.#instances.add(this);
    this.themeBtn.addEventListener("click", () => {
      Theme.#switchTheme();
    });
  }

  updateThemeAndIcon() {
    const theme = document.documentElement.dataset.theme;
    this.themeIcon.setAttribute("href", Theme.ICONS[theme]);
  }
}

new Theme();
