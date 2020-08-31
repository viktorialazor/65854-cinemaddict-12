import AbstractView from "./abstract.js";
import {getRandomInteger} from "../utils/common.js";

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

export default class StatisticsView extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createStatisticsTemplate(this._cards);
  }
}
