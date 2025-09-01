class Theme {
  constructor() {
    this.cacheDOM();
    this.bindEvents();
    this.updateThemeAndIcon();
  }

  static {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.dataset.theme = "light";
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        document.documentElement.dataset.theme = event.matches
          ? "dark"
          : "light";
        Theme.#notifyUpdate();
      });
  }

  static ICONS = {
    light: "./img/svgsprite/sprite.symbol.svg#icon-moon",
    dark: "./img/svgsprite/sprite.symbol.svg#icon-sun",
  };

  static #switchTheme() {
    document.documentElement.dataset.theme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
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
