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
    this.toggleNavigation = document.querySelector(
      "[aria-controls='navigation-list']",
    );
    this.navigationMenu = document.querySelectorAll(".navigation__list li");

    this.menuIcon = document.querySelector(".navigation__menu-icon use");
    this.menuIconSvg = document.querySelector(".navigation__menu-icon");
    console.log(this.menuIcon.getAttribute("href"));
  }

  toggleMobileNavigation() {
    this.toggleNavigation.addEventListener("click", () => {
      const isOpen =
        this.toggleNavigation.getAttribute("aria-expanded") === "true";
      this.toggleNavigation.setAttribute("aria-expanded", !isOpen);
      this.toggleNavigation.classList.toggle("navigation__menu-btn--close");
      if (!isOpen) {
        this.menuIcon.setAttribute(
          "href",
          "./img/svgsprite/sprite.symbol.svg#icon-menu-close",
        );
      } else {
        this.menuIcon.setAttribute(
          "href",
          "./img/svgsprite/sprite.symbol.svg#icon-menu",
        );
      }
      this.menuIconSvg.classList.toggle("navigation__menu-icon--close");
    });
  }
}

new Navigation();
