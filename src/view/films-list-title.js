import AbstractView from "./abstract.js";

const createFilmsListTitleTemplate = () => {
  return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
};

export default class FilmsListTitleView extends AbstractView {
  getTemplate() {
    return createFilmsListTitleTemplate();
  }
}
