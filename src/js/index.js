import { Utilities } from "./utilities";

class Home {
  constructor() {
    this.cacheDOM();
    this.bindEvents();
    this.renderArticles();
  }

  cacheDOM() {
    this.articlesContainer = document.querySelector(".articles__container");
  }

  bindEvents() {}

  renderArticles() {
    const utilities = new Utilities();
    const data = utilities.getData();
    const articles = data
      .slice(0, 5)
      .map((article) => Utilities.renderArticles(article));
    this.articlesContainer.innerHTML = articles.join("");
  }
}

new Home();
