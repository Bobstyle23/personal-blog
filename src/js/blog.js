import { Utilities } from "./utilities";

class Blog {
  constructor({ container, title, date }) {
    this.utilities = new Utilities();
    this.data = this.utilities.data;

    this.searchParam = new URLSearchParams(window.location.search);
    this.id = this.searchParam.get("id");
    this.blogContainer = document.querySelector(container);
    this.blogTitle = document.querySelector(title);
    this.blogDate = document.querySelector(date);

    this.init();
  }

  init() {
    const blogPost = this.data.find((item) => item.slug === this.id);

    if (!blogPost) {
      this.blogContainer.innerHTML = "<p>Blog post not found!</p>";
      return;
    }

    this.blogTitle.textContent = blogPost.title;
    this.blogDate.textContent = Utilities.formatDate(blogPost.publishedAt);
    const elements = Utilities.parseContentAsHTML(blogPost.content);

    const elementStyles = {
      p: "blog__text",
      hr: "blog__divider",
      h2: "blog__subtitle",
      h3: "blog__sub-subtitle",
      ul: "blog__list",
      ol: "blog__list",
      blockquote: "blog__blockquote",
      pre: "blog__pre",
      table: "blog__table",
    };

    [...elements].forEach((el) => {
      const tag = el.tagName.toLowerCase();
      this.blogContainer.appendChild(el);
      if (elementStyles[tag]) {
        el.classList.add(elementStyles[tag]);
      }
    });
  }
}

new Blog({
  container: ".blog__content",
  title: ".blog__title",
  date: ".blog__date",
});
