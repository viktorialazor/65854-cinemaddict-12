import {getRandomInteger} from "../utils.js";

const STATISTICS_MIN = 1000;
const STATISTICS_MAX = 200000;

export const createStatisticsTemplate = () => {
  const statistics = getRandomInteger(STATISTICS_MIN, STATISTICS_MAX);

  return (
    `<p>${statistics} movies inside</p>`
  );
};
