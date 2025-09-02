const _data = new WeakMap();
import { DataManager, Renderer } from "./utilities";

class Blogs {
  constructor() {
    this.cacheDOM();
    this.getData();
    this.renderArticles();
  }

  set data(newData) {
    _data.set(this, newData);
  }

  get data() {
    return _data.get(this);
  }

  getData() {
    const newData = DataManager.parse(sessionStorage.getItem("blogData"));
    this.data = newData;
  }

  cacheDOM() {
    this.blogArticlesContainer = document.querySelector(".blogs__articles");
  }

  renderArticles() {
    const data = this.data;
    const articles = data.map((article, index) => {
      const isLast = index === data.length - 1;
      return `${Renderer.renderArticle(article, true)} ${!isLast ? `<div class="divider"></div>` : ""}`;
    });
    this.blogArticlesContainer.innerHTML = articles.join("");
  }
}

new Blogs();
