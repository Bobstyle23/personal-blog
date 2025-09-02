const _data = new WeakMap();

class DataManager {
  static parse(rawData) {
    try {
      return JSON.parse(rawData) || [];
    } catch {
      return [];
    }
  }

  static formatDate(isoDate) {
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      throw new Error("Invalid date!");
    }
  }
}

class Renderer {
  static renderArticle(article) {
    return `
      <article class="article">
          <h3 class="article__title"><a href="./blog.html?id=${article.slug}">${article.title}</a></h3>
          <p class="article__date">${DataManager.formatDate(article.publishedAt)}</p>
      </article>`;
  }
}

class Home {
  constructor() {
    _data.set(this, DataManager.parse(sessionStorage.getItem("blogData")));
    this.cacheDOM();
    this.bindEvents();
    this.renderArticles();
  }

  set data(newData) {
    if (!Array.isArray(newData)) {
      throw new Error("Data must be an array");
    }
    _data.set(this, newData);
  }

  get data() {
    return _data.get(this);
  }

  static #isInitialized = false;

  static {
    if (!this.#isInitialized) {
      Home.#initData();
      this.#isInitialized = true;
    }
  }

  static #initData() {
    const data = require("./data.json");
    sessionStorage.setItem("blogData", JSON.stringify(data));
  }

  cacheDOM() {
    this.articlesContainer = document.querySelector(".articles__container");
  }

  bindEvents() {}

  renderArticles() {
    const data = this.data;
    const articles = data
      .slice(0, 5)
      .map((article) => Renderer.renderArticle(article));
    this.articlesContainer.innerHTML = articles.join("");
  }
}

new Home();
