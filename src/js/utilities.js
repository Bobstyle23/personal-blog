export class Observer {
  constructor() {
    Observer.#initResizeObserver();
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

  extractLocation(location) {
    return location.split("/").filter(Boolean).splice(2, 1).join("");
  }

  getLocation() {
    return this.extractLocation(window.location.href);
  }
}
