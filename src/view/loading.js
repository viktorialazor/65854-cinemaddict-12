import AbstractView from "./abstract.js";

const createLoadingTemplate = () => {
  return `<p class="filmBoard__loading">
    Loading...
  </p>`;
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
