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
      console.log("clicked", e);

      this.menuList.toggleAttribute(
        "hidden",
        !this.menuList.hasAttribute("hidden"),
      );
    });
  }
}

new Navigation();
