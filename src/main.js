import {FILM_COUNT, CARD_COUNT_PER_STEP, FILM_LIST_COUNT, FILM_EXTRA_COUNT} from "./const.js";
import UserProfileView from "./view/user-profile.js";
import SiteMenuView from "./view/site-menu.js";
import SortView from "./view/sort.js";
import FilmsBoardView from "./view/films-board.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/show-more-button.js";
import FilmsListExtra from "./view/films-list-extra.js";
import StatisticsView from "./view/statistics.js";
import FilmDetails from "./view/film-details.js";
import {generateFilmCard} from "./mock/film-card.js";
import {generateComments} from "./mock/comments.js";
import {render, RenderPosition} from "./utils.js";

const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);
const comments = new Array(FILM_COUNT).fill().map(generateComments);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new UserProfileView(cards).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(cards).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsBoardView().getElement(), RenderPosition.BEFOREEND);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

const renderCard = (position, card, commentsFilm) => {
  const cardComponent = new FilmCard(card, commentsFilm);
  const cardDetailsComponent = new FilmDetails(card, commentsFilm);

  const clickCloseButton = (evt) => {
    evt.preventDefault();
    siteMainElement.removeChild(cardDetailsComponent.getElement());
    cardDetailsComponent.removeElement();
  };

  cardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    siteMainElement.appendChild(cardDetailsComponent.getElement());
    cardDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, clickCloseButton);
  });

  cardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    siteMainElement.appendChild(cardDetailsComponent.getElement());
    cardDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, clickCloseButton);
  });

  cardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    siteMainElement.appendChild(cardDetailsComponent.getElement());
    cardDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, clickCloseButton);
  });

  render(position, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < FILM_LIST_COUNT; i++) {
  render(filmsElement, new FilmsListExtra().getElement(), RenderPosition.BEFOREEND);
}

const filmsExtraElements = siteMainElement.querySelectorAll(`.films-list--extra`);
const filmsTopRatedTitleElement = filmsExtraElements[0].querySelector(`.films-list__title`);
const filmsMostCommentedTitleElement = filmsExtraElements[1].querySelector(`.films-list__title`);
const filmsTopRatedContainerElement = filmsExtraElements[0].querySelector(`.films-list__container`);
const filmsMostCommentedContainerElement = filmsExtraElements[1].querySelector(`.films-list__container`);

filmsTopRatedTitleElement.textContent = `Top rated`;
filmsMostCommentedTitleElement.textContent = `Most commented`;

const getExtraCard = (filmsCards, commentsFilm, key) => {
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

  return [filmsCards[index], commentsFilm[index], index];
};

const getTopCards = (filmsCards, commentsFilm) => {
  let topCards = [];
  let commentsList = [];
  let cardsList = filmsCards.slice();

  for (let i = 0; i < 2; i++) {
    let topCard = getExtraCard(cardsList, commentsFilm, `rating`);
    topCards.push(topCard[0]);
    commentsList.push(topCard[1]);
    cardsList.splice(topCard[2], 1, ``);
  }

  return [topCards, commentsList];
};

const getMostCommentedCards = (filmsCards, commentsFilm) => {
  let mostCommentedCards = [];
  let cardsList = [];
  let commentsList = commentsFilm.slice();

  for (let i = 0; i < 2; i++) {
    let mostCommentedCard = getExtraCard(filmsCards, commentsList, `comments`);
    cardsList.push(mostCommentedCard[0]);
    mostCommentedCards.push(mostCommentedCard[1]);
    commentsList.splice(mostCommentedCard[2], 1, ``);
  }
  return [cardsList, mostCommentedCards];
};

const renderTopRated = () => {
  let topCardsFilms = getTopCards(cards, comments);
  let cardsTop = topCardsFilms[0];
  let cardsComments = topCardsFilms[1];

  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    renderCard(filmsTopRatedContainerElement, cardsTop[i], cardsComments[i]);
  }
};

renderTopRated();

const renderMostCommented = () => {
  let mostCommentedFilms = getMostCommentedCards(cards, comments);
  let cardsFilms = mostCommentedFilms[0];
  let cardsComments = mostCommentedFilms[1];

  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    renderCard(filmsMostCommentedContainerElement, cardsFilms[i], cardsComments[i]);
  }
};

renderMostCommented();

cards
  .slice(0, Math.min(cards.length, CARD_COUNT_PER_STEP))
  .forEach((card, index) => renderCard(filmsContainerElement, card, comments[index]));

if (cards.length > CARD_COUNT_PER_STEP) {
  let renderedCardCount = CARD_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButton();
  render(filmsListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((card, index) => renderCard(filmsContainerElement, card, comments[index + renderedCardCount]));

    renderedCardCount += CARD_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

render(siteFooterStatisticsElement, new StatisticsView().getElement(), RenderPosition.BEFOREEND);
