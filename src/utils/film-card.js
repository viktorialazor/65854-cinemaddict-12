import {FILM_EXTRA_COUNT, COMMENT_AUTHORS, COMMENT_DATE, RELEASE_FILM_DATE, FILM_DURATION, MAX_SYMBOLS, USER_FAN_MIN, USER_FAN_MAX} from "../const.js";
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
  const cardAYear = cardA.releaseDate.slice(-4);
  const cardBYear = cardB.releaseDate.slice(-4);
  const weight = getWeightData(parseInt(cardAYear, 10), parseInt(cardBYear, 10));

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

  if (shortDescription.length > MAX_SYMBOLS) {
    shortDescription = shortDescription.slice(0, MAX_SYMBOLS) + `...`;
  }

  return shortDescription;
};

const getFilmWatchedQuantity = (cards) => {
  let filmWatchedQuantity = 0;

  cards.forEach((item) => {
    if (item.isWatched) {
      filmWatchedQuantity += 1;
    }
  });

  return filmWatchedQuantity;
};

export const generateProfileRating = (cards) => {
  const filmQuantity = getFilmWatchedQuantity(cards);
  let rating = ``;

  if (filmQuantity === 0) {
    rating = ``;
  } else if (filmQuantity > 0 && filmQuantity <= USER_FAN_MIN) {
    rating = `Novice`;
  } else if (filmQuantity > USER_FAN_MIN && filmQuantity <= USER_FAN_MAX) {
    rating = `Fan`;
  } else {
    rating = `Movie Buff`;
  }

  return rating;
};
