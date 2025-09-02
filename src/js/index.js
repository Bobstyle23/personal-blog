const _data = new WeakMap();

class Home {
  constructor() {
    _data.set(this, Home.#parseData(sessionStorage.getItem("blogData")));
    this.cacheDOM();
    this.bindEvents();
    this.renderArticles();
  }

  static #isInitialized = false;

  static {
    if (!this.#isInitialized) {
      const data = require("./data.json");
      sessionStorage.setItem("blogData", JSON.stringify(data));
      this.#isInitialized = true;
    }
  }

  static #parseData(data) {
    try {
      return JSON.parse(data) || [];
    } catch {
      return [];
    }
  }

  static #parseDate(isoDate) {
    try {
      const date = new Date(isoDate);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return formattedDate;
    } catch {
      throw new Error("Invalid date!");
    }
  }

  cacheDOM() {
    this.articlesContainer = document.querySelector(".articles__container");
  }

  bindEvents() {}

  getData() {
    return _data.get(this);
  }

  renderArticles() {
    const data = this.getData();
    const articles = data.slice(0, 5).map((article) => {
      return `
        <article class="article">
            <h3 class="article__title"><a href="./blog.html?id=${article.slug}">${article.title}</a></h3>
            <p class="article__date">${Home.#parseDate(article.publishedAt)}</p>
        </article>
             `;
    });
    this.articlesContainer.innerHTML = articles.join("");
  }
}

new Home();
