import AbstractView from "./abstract.js";

const createFilmsListTemplate = () => {
  return `<section class="films-list"></section>`;
};

export default class FilmsListView extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
