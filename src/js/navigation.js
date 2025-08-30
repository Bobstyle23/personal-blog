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
  }

  toggleMobileNavigation() {
    this.toggleNavigation.addEventListener("click", () => {
      const isOpen =
        this.toggleNavigation.getAttribute("aria-expanded") === "true";
      this.toggleNavigation.setAttribute("aria-expanded", !isOpen);
    });
  }
}

new Navigation();
