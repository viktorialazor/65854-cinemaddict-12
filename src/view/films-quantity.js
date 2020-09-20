import AbstractView from "./abstract.js";
import {getRandomInteger} from "../utils/common.js";

const FILMS_MIN = 1000;
const FILMS_MAX = 200000;

const createFilmsQuantityTemplate = (cards) => {
  let films = 0;

  if (cards.length !== 0) {
    films = getRandomInteger(FILMS_MIN, FILMS_MAX);
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
