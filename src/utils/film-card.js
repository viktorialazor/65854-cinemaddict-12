import {FILM_EXTRA_COUNT, COMMENT_AUTHORS, COMMENT_DATE, RELEASE_FILM_DATE, FILM_DURATION} from "../const.js";
import {getRandomInteger} from "./common.js";
import moment from "moment";
import momentDurationFormat from "moment-duration-format";

momentDurationFormat(moment);

export const humanizeDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {year: `numeric`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`});
};

export const formatCommentDate = (commentDate) => {
  if (!(commentDate instanceof Date)) {
    return ``;
  }

  return moment(commentDate).format(COMMENT_DATE);
};

export const formatReleaseDate = (releaseDate) => {
  if (!(releaseDate instanceof Date)) {
    return ``;
  }

  return moment(releaseDate).format(RELEASE_FILM_DATE);
};

export const formatFilmDuration = (filmDuration) => {
  return moment.duration(filmDuration, `minutes`).format(FILM_DURATION);
};

export const isFilmInFilter = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const getTopCards = (filmsCards) => {
  let filmsCardsList = filmsCards.slice().filter((filmsCard) => filmsCard.rating !== 0);
  filmsCardsList = filmsCardsList.sort((cardA, cardB) => parseFloat(cardB.rating) - parseFloat(cardA.rating));
  filmsCardsList = filmsCardsList.slice(0, Math.min(filmsCardsList.length, FILM_EXTRA_COUNT));

  return filmsCardsList;
};

export const getMostCommentedCards = (filmsCards) => {
  let filmsCardsList = filmsCards.slice().filter((filmsCard) => filmsCard.comments.length !== 0);
  filmsCardsList = filmsCardsList.sort((cardA, cardB) => parseInt(cardB.comments.length, 10) - parseInt(cardA.comments.length, 10));
  filmsCardsList = filmsCardsList.slice(0, Math.min(filmsCardsList.length, FILM_EXTRA_COUNT));

  return filmsCardsList;
};

const getWeightData = (dataA, dataB) => {
  if (dataA === dataB) {
    return 0;
  } else if (dataA < dataB) {
    return 1;
  } else if (dataA > dataB) {
    return -1;
  } else {
    return null;
  }
};

export const sortByDate = (cardA, cardB) => {
  const weight = getWeightData(cardA.year, cardB.year);

  if (weight !== null) {
    return weight;
  }

  return cardB.year - cardA.year;
};

export const sortByRating = (cardA, cardB) => {
  const weight = getWeightData(cardA.rating, cardB.rating);

  if (weight !== null) {
    return weight;
  }

  return cardB.rating - cardA.rating;
};

export const generateCommentAuthor = () => {
  const randomIndex = getRandomInteger(0, COMMENT_AUTHORS.length - 1);

  return COMMENT_AUTHORS[randomIndex];
};

export const getShortDescription = (description) => {
  let shortDescription = description;

  if (shortDescription.length > 139) {
    shortDescription = shortDescription.slice(0, 139) + `...`;
  }

  return shortDescription;
};
