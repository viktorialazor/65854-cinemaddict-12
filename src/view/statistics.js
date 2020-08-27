import {getRandomInteger, createElement} from "../utils.js";

const STATISTICS_MIN = 1000;
const STATISTICS_MAX = 200000;

const createStatisticsTemplate = (cards) => {
  let statistics = 0;

  if (cards.length !== 0) {
    statistics = getRandomInteger(STATISTICS_MIN, STATISTICS_MAX);
  }

  return (
    `<p>${statistics} movies inside</p>`
  );
};

export default class Statistics {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }

  getTemplate() {
    return createStatisticsTemplate(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
