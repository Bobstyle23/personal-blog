const _activeMenu = new WeakMap();
import { Utilities } from "./utilities";

class Navigation {
  constructor() {
    this.cacheDOM();
    this.toggleMobileNavigation();
    this.checkActiveMenu();
  }

  set activeMenuName(menuName) {
    if (!String(menuName)) {
      throw new Error("Menu name must be a string!");
    }
    _activeMenu.set(this, menuName);
  }

  get activeMenuName() {
    return _activeMenu.get(this);
  }

  cacheDOM() {
    this.navigationToggleBtn = document.querySelector(
      "[aria-controls='navigation-list']",
    );
    this.menuItems = document.querySelectorAll(".navigation__list li a");
    this.menuIconWrapper = document.querySelector(".navigation__menu-icon");
    this.menuIcon = document.querySelector(".navigation__menu-icon use");
  }

  checkActiveMenu() {
    const utilities = new Utilities();
    const currentLocation = utilities.getLocation();

    //NOTE: update activeMenu with setter
    this.activeMenuName = currentLocation;

    this.menuItems.forEach((menu) => {
      menu.removeAttribute("data-active");
      //NOTE: checking activeMenu with getter
      if (menu.getAttribute("href").includes(this.activeMenuName)) {
        menu.setAttribute("data-active", "true");
      }
    });
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
