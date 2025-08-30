class Theme {
  constructor() {
    this.cacheDOM();
    this.toggleTheme();

    this.ICONS = {
      light: "./img/svgsprite/sprite.symbol.svg#icon-moon",
      dark: "./img/svgsprite/sprite.symbol.svg#icon-sun",
    };
  }

  static {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
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
      });
  }

  static #switchTheme() {
    if (document.documentElement.dataset.theme === "light") {
      document.documentElement.dataset.theme = "dark";
      return;
    }
    document.documentElement.dataset.theme = "light";
  }

  cacheDOM() {
    this.themeBtn = document.querySelector(".navigation__theme-btn");
    this.themeIconWrapper = document.querySelector(".navigation__theme-icon");
    this.themeIcon = document.querySelector(".navigation__theme-icon use");
  }

  toggleTheme() {
    this.themeBtn.addEventListener("click", () => {
      Theme.#switchTheme();
      this.themeIcon.setAttribute(
        "href",
        document.documentElement.dataset.theme === "light"
          ? this.ICONS.dark
          : this.ICONS.light,
      );
    });
  }
}
new Theme();
