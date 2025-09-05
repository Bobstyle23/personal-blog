import { Utilities } from "./utilities";

class Newsletter {
  constructor() {
    this.cacheDOM();
    this.bindEvents();

    this.inputFieldValue = "";
    this.valid = true;
  }

  cacheDOM() {
    this.inputField = document.querySelector(".input");
    this.submitEmailBtn = document.querySelector(".newsletter__btn");
    this.inputFeebackContainer = document.querySelector(".input__feedback");
    this.inputFeedbackMessages = document.querySelectorAll(".input__message");
    this.inputFeedbackIcons = document.querySelectorAll(".input__icon");
  }

  bindEvents() {
    this.inputField.addEventListener("input", (e) => {
      this.inputFieldValue = e.target.value;
    });

    this.submitEmailBtn.addEventListener("click", () =>
      this.checkInputFieldState(),
    );
  }

  resetInputFieldState() {
    this.inputField.classList.remove("input--error", "input--success");
    this.inputFeebackContainer.removeAttribute("hidden");
    this.inputFeedbackMessages.forEach((message) =>
      message.setAttribute("hidden", true),
    );
    this.inputFeedbackIcons.forEach((icon) =>
      icon.setAttribute("hidden", true),
    );
  }

  checkInputFieldState() {
    const utilities = new Utilities();
    const isEmailValid = utilities.validateEmail(this.inputFieldValue);
    this.resetInputFieldState();

    // PERF: Invalid email
    if (!isEmailValid) {
      this.inputField.classList.add("input--error");
      this.inputFeedbackMessages.forEach((message) => {
        if (message.classList.contains("input__message--error")) {
          message.removeAttribute("hidden");
        }
      });
      this.inputFeedbackIcons.forEach((icon) => {
        if (icon.classList.contains("input__icon--error")) {
          icon.removeAttribute("hidden");
        }
      });
      this.valid = false;
      return;
    }

    this.inputField.classList.add("input--success");
    this.inputFeedbackMessages.forEach((message) => {
      if (message.classList.contains("input__message--success")) {
        message.removeAttribute("hidden");
      }
    });
    this.inputFeedbackIcons.forEach((icon) => {
      if (icon.classList.contains("input__icon--success")) {
        icon.removeAttribute("hidden");
      }
    });
    this.valid = true;
  }
}

new Newsletter();
