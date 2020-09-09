import {EXTRA_CARD_KEY, FILM_EXTRA_COUNT} from "../const.js";
import {getRandomInteger} from "./common.js";

export const humanizeDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {year: `numeric`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`});
};

export const isFilmInFilter = () => {
  const isFilter = Boolean(getRandomInteger(0, 1));

  return isFilter ? `film-card__controls-item--active` : ``;
};

export const getExtraCard = (filmsCards, key) => {
  let number = 0;
  let indexCard = 0;

  if (key === EXTRA_CARD_KEY) {
    filmsCards.forEach((item, index) => {
      if (item !== ``) {
        if (parseFloat(item.rating) > number) {
          number = parseFloat(item.rating);
          indexCard = index;
        }
      }
    });
  } else {
    filmsCards.forEach((item, index) => {
      if (item !== ``) {
        if (parseInt(item.comments.length, 10) > number) {
          number = parseInt(item.comments.length, 10);
          indexCard = index;
        }
      }
    });
  }

  return {
    extraCard: filmsCards[indexCard],
    indexCard
  };
};

export const getTopCards = (filmsCards) => {
  let topCards = [];
  let filmsCardsList = filmsCards.slice();

  for (let i = 0; i < Math.min(filmsCards.length, FILM_EXTRA_COUNT); i++) {
    let topCard = getExtraCard(filmsCardsList, `rating`);
    topCards.push(topCard.extraCard);
    filmsCardsList.splice(topCard.indexCard, 1, ``);
  }

  return topCards;
};

export const getMostCommentedCards = (filmsCards) => {
  let mostCommentedCards = [];
  let filmsCardsList = filmsCards.slice();

  for (let i = 0; i < Math.min(filmsCards.length, FILM_EXTRA_COUNT); i++) {
    let mostCommentedCard = getExtraCard(filmsCardsList, `comments`);
    mostCommentedCards.push(mostCommentedCard.extraCard);
    filmsCardsList.splice(mostCommentedCard.indexCard, 1, ``);
  }

  return mostCommentedCards;
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
