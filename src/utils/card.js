import {getRandomInteger} from "./common.js";

export const humanizeDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {year: `numeric`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`});
};

export const isFilmInFilter = () => {
  const isFilter = Boolean(getRandomInteger(0, 1));

  if (isFilter) {
    return `film-card__controls-item--active`;
  } else {
    return ``;
  }
};

export const getExtraCard = (filmsCards, commentsFilm, key) => {
  let number = 0;
  let index = 0;

  if (key === `rating`) {
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
    commentsList: commentsFilm[index],
    indexCard: index
  };
};

export const getTopCards = (filmsCards, commentsFilm) => {
  let topCards = [];
  let commentsList = [];
  let cardsList = filmsCards.slice();

  for (let i = 0; i < 2; i++) {
    let topCard = getExtraCard(cardsList, commentsFilm, `rating`);
    topCards.push(topCard.extraCard);
    commentsList.push(topCard.commentsList);
    cardsList.splice(topCard.indexCard, 1, ``);
  }

  return [topCards, commentsList];
};

export const getMostCommentedCards = (filmsCards, commentsFilm) => {
  let mostCommentedCards = [];
  let cardsList = [];
  let commentsList = commentsFilm.slice();

  for (let i = 0; i < 2; i++) {
    let mostCommentedCard = getExtraCard(filmsCards, commentsList, `comments`);
    cardsList.push(mostCommentedCard.extraCard);
    mostCommentedCards.push(mostCommentedCard.commentsList);
    commentsList.splice(mostCommentedCard.indexCard, 1, ``);
  }
  return [cardsList, mostCommentedCards];
};
