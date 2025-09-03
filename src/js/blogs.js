import { Utilities } from "./utilities";

class Blogs {
  constructor() {
    this.cacheDOM();
    this.renderArticles();
  }

  cacheDOM() {
    this.blogArticlesContainer = document.querySelector(".blogs__articles");
  }

  renderArticles() {
    const utilities = new Utilities();
    const data = utilities.data;
    const articles = data.map((article, index) => {
      const isLast = index === data.length - 1;
      return `${Utilities.renderArticles(article, true)} ${!isLast ? `<div class="divider"></div>` : ""}`;
    });
    this.blogArticlesContainer.innerHTML = articles.join("");
  }
}

new Blogs();
