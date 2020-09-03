import {EXTRA_CARD_KEY, FILM_EXTRA_COUNT} from "../const.js";
import {getRandomInteger} from "./common.js";

export const humanizeDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {year: `numeric`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`});
};

export const isFilmInFilter = () => {
  const isFilter = Boolean(getRandomInteger(0, 1));

  return isFilter ? `film-card__controls-item--active` : ``;
};

export const getExtraCard = (filmsCards, commentsFilm, key) => {
  let number = 0;
  let index = 0;

  if (key === EXTRA_CARD_KEY) {
    filmsCards.forEach((filmCard, indexCard) => {
      if (parseFloat(filmCard.rating) > number) {
        number = parseFloat(filmCard.rating);
        index = indexCard;
      }
    });
  } else {
    commentsFilm.forEach((comment, indexCard) => {
      if (parseInt(comment.length, 10) > number) {
        number = parseInt(comment.length, 10);
        index = indexCard;
      }
    });
  }

  return {
    extraCard: filmsCards[index],
    commentsCard: commentsFilm[index],
    indexCard: index
  };
};

export const getTopCards = (filmsCards, commentsFilm) => {
  let topCards = [];
  let commentsList = [];
  let filmsCardsList = filmsCards.slice();
  let filmsCommentsList = commentsFilm.slice();

  for (let i = 0; i < Math.min(filmsCards.length, FILM_EXTRA_COUNT); i++) {
    let topCard = getExtraCard(filmsCardsList, filmsCommentsList, `rating`);
    topCards.push(topCard.extraCard);
    commentsList.push(topCard.commentsCard);
    filmsCardsList.splice(topCard.indexCard, 1, ``);
    filmsCommentsList.splice(topCard.indexCard, 1, ``);
  }

  return [topCards, commentsList];
};

export const getMostCommentedCards = (filmsCards, commentsFilm) => {
  let mostCommentedCards = [];
  let cardsList = [];
  let filmsCommentsList = commentsFilm.slice();
  let filmsCardsList = filmsCards.slice();

  for (let i = 0; i < Math.min(filmsCards.length, FILM_EXTRA_COUNT); i++) {
    let mostCommentedCard = getExtraCard(filmsCardsList, filmsCommentsList, `comments`);
    cardsList.push(mostCommentedCard.extraCard);
    mostCommentedCards.push(mostCommentedCard.commentsCard);
    filmsCommentsList.splice(mostCommentedCard.indexCard, 1, ``);
    filmsCardsList.splice(mostCommentedCard.indexCard, 1, ``);
  }
  return [cardsList, mostCommentedCards];
};
