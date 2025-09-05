const _location = new WeakMap();
const _data = new WeakMap();

export class Utilities {
  constructor() {
    this.data = Utilities.parse(sessionStorage.getItem("blogData"));
    Utilities.#initResizeObserver();
  }

  static #isInitialized = false;
  static #resizeObserver;

  static {
    if (!this.#isInitialized) {
      Utilities.#initData();
      this.#isInitialized = true;
    }
  }

  set location(url) {
    _location.set(this, url);
  }

  get location() {
    return _location.get(this);
  }

  set data(newData) {
    if (!Array.isArray(newData)) {
      throw new Error("Data must be an array!");
    }
    _data.set(this, newData);
  }

  get data() {
    return _data.get(this);
  }

  static #initData() {
    const data = require("./data.json");
    sessionStorage.setItem("blogData", JSON.stringify(data));
  }

  static #initResizeObserver() {
    //PERF: prevents duplicate observers
    if (this.#resizeObserver) return;

    this.#resizeObserver = new ResizeObserver(() => {
      document.body.classList.add("resizing");

      requestAnimationFrame(() => {
        document.body.classList.remove("resizing");
      });
    });

    this.#resizeObserver.observe(document.body);
  }

  static parse(rawData) {
    try {
      return JSON.parse(rawData) || [];
    } catch {
      return [];
    }
  }

  static formatDate(ISODate) {
    try {
      const date = new Date(ISODate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      throw new Error("Invalid date!");
    }
  }

  static renderArticles(article, isBlogsPage = false) {
    return `
      <article class="article">
          <h3 class="article__title"><a href="./blog.html?id=${article.slug}">${article.title}</a></h3>
          <p class="article__date">${Utilities.formatDate(article.publishedAt)}</p>
          ${isBlogsPage ? `<p class="page__desc">${article.description}</p>` : ""}
      </article>`;
  }

  static parseContentAsHTML(content) {
    const parser = new DOMParser();
    const document = parser.parseFromString(marked.parse(content), "text/html");
    const elements = document.body.children;
    return elements;
  }

  extractLocation(url = window.location.href) {
    const parts = url.split("/").filter(Boolean);
    if (url.endsWith("/")) {
      return "index.html";
    }
    return parts[parts.length - 1] || "index.html";
  }

  getLocation() {
    return this.location || this.extractLocation();
  }

  //PERF: there is no need for getData(), utilities.data will do the work, this is just for reference and readability
  getData() {
    return this.data;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
