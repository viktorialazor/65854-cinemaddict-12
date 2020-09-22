import AbstractView from "./abstract.js";

const createFilmsQuantityTemplate = (cards) => {
  let films = 0;

  if (cards.length !== 0) {
    films = cards.length;
  }

  return (
    `<p>${films} movies inside</p>`
  );
};

export default class FilmsQuantityView extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createFilmsQuantityTemplate(this._cards);
  }
}
