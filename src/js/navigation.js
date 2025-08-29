class Navigation {
  constructor() {
    this.cacheDom();
    this.handleEvents();
  }

  cacheDom() {
    this.menuBtn = document.querySelector(".navigation__menu-btn");
    this.menuList = document.querySelector(".navigation__list");
  }

  handleEvents() {
    this.menuBtn.addEventListener("click", (e) => {
      const isNavigationOpen =
        this.menuBtn.getAttribute("aria-expanded") === "true";

      this.menuBtn.setAttribute("aria-expanded", !isNavigationOpen);
      this.menuList.dataset.state = isNavigationOpen ? "closed" : "open";
    });
  }
}

new Navigation();
