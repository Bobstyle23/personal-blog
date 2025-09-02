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

export class DataManager {
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

export class Renderer {
  static renderArticle(article, isBlogsPage = false) {
    return `
      <article class="article">
          <h3 class="article__title"><a href="./blog.html?id=${article.slug}">${article.title}</a></h3>
          <p class="article__date">${DataManager.formatDate(article.publishedAt)}</p>
          ${isBlogsPage ? `<p class="page__desc">${article.description}</p>` : ""}
      </article>`;
  }
}
