class Navigation {
  constructor() {
    this.cacheDOM();
    this.toggleMobileNavigation();
    Navigation.#initResizeObserver();
  }

  static #initResizeObserver() {
    const resizeObserver = new ResizeObserver(() => {
      document.body.classList.add("resizing");

      requestAnimationFrame(() => {
        document.body.classList.remove("resizing");
      });
    });
    resizeObserver.observe(document.body);
  }

  cacheDOM() {
    this.navigationToggleBtn = document.querySelector(
      "[aria-controls='navigation-list']",
    );
    this.manuItems = document.querySelectorAll(".navigation__list li");
    this.menuIconWrapper = document.querySelector(".navigation__menu-icon");
    this.menuIcon = document.querySelector(".navigation__menu-icon use");
  }

  toggleMobileNavigation() {
    const ICONS = {
      open: "./img/svgsprite/sprite.symbol.svg#icon-menu-close",
      close: "./img/svgsprite/sprite.symbol.svg#icon-menu",
    };

    this.navigationToggleBtn.addEventListener("click", () => {
      const isNavigationOpen =
        this.navigationToggleBtn.getAttribute("aria-expanded") === "true";

      const navigationState = !isNavigationOpen;

      this.navigationToggleBtn.setAttribute("aria-expanded", navigationState);
      this.navigationToggleBtn.classList.toggle(
        "navigation__menu-btn--close",
        navigationState,
      );

      this.menuIcon.setAttribute(
        "href",
        navigationState ? ICONS.open : ICONS.close,
      );
      this.menuIconWrapper.classList.toggle(
        "navigation__menu-icon--close",
        navigationState,
      );
    });
  }
}

new Navigation();
