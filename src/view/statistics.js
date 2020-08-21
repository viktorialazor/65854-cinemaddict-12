import {getRandomInteger, createElement} from "../utils.js";

const STATISTICS_MIN = 1000;
const STATISTICS_MAX = 200000;

const createStatisticsTemplate = () => {
  const statistics = getRandomInteger(STATISTICS_MIN, STATISTICS_MAX);

  return (
    `<p>${statistics} movies inside</p>`
  );
};

export default class Statistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
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
