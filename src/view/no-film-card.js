import AbstractView from "./abstract.js";

const createNoFilmCardsTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilmCardsView extends AbstractView {
  getTemplate() {
    return createNoFilmCardsTemplate();
  }
}
