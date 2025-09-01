const _data = new WeakMap();

class Home {
  constructor() {
    Home.init();
    _data.set(this, Home.#parseData(sessionStorage.getItem("blogData")));
  }

  static #isInitialized = false;

  static #parseData(data) {
    try {
      return JSON.parse(data) || [];
    } catch {
      return [];
    }
  }

  static init() {
    if (!this.#isInitialized) {
      const data = require("./data.json");
      sessionStorage.setItem("blogData", JSON.stringify(data));
      this.#isInitialized = true;
    }
  }

  cacheDOM() {}

  bindEvents() {}

  getData() {
    return _data.get(this);
  }
}

new Home();
