import {FILM_COUNT, CARD_COUNT_PER_STEP, FILM_LIST_COUNT, FILM_EXTRA_COUNT} from "./const.js";
import UserProfileView from "./view/user-profile.js";
import SiteMenuView from "./view/site-menu.js";
import SortView from "./view/sort.js";
import FilmsBoardView from "./view/films-board.js";
import FilmsListView from "./view/films-list.js";
import FilmCardView from "./view/film-card.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmsListExtraView from "./view/films-list-extra.js";
import StatisticsView from "./view/statistics.js";
import FilmDetailsView from "./view/film-details.js";
import NoFilmCardsView from "./view/no-film-card.js";
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

const renderCard = (position, card, commentsFilm) => {
  const cardComponent = new FilmCardView(card, commentsFilm);
  const cardDetailsComponent = new FilmDetailsView(card, commentsFilm);

  const clickCloseButton = (evt) => {
    evt.preventDefault();
    siteMainElement.removeChild(cardDetailsComponent.getElement());
    cardDetailsComponent.removeElement();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      siteMainElement.removeChild(cardDetailsComponent.getElement());
      cardDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  cardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    siteMainElement.appendChild(cardDetailsComponent.getElement());
    cardDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, clickCloseButton);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  cardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    siteMainElement.appendChild(cardDetailsComponent.getElement());
    cardDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, clickCloseButton);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  cardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    siteMainElement.appendChild(cardDetailsComponent.getElement());
    cardDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, clickCloseButton);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(position, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

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

  return {
    extraCard: filmsCards[index],
    commentsList: commentsFilm[index],
    indexCard: index
  };
};

const getTopCards = (filmsCards, commentsFilm) => {
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

const getMostCommentedCards = (filmsCards, commentsFilm) => {
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

const renderTopRated = (position) => {
  let topCardsFilms = getTopCards(cards, comments);
  let cardsTop = topCardsFilms[0];
  let cardsComments = topCardsFilms[1];

  for (let i = 0; i < Math.min(cards.length, FILM_EXTRA_COUNT); i++) {
    renderCard(position, cardsTop[i], cardsComments[i]);
  }
};

const renderMostCommented = (position) => {
  let mostCommentedFilms = getMostCommentedCards(cards, comments);
  let cardsFilms = mostCommentedFilms[0];
  let cardsComments = mostCommentedFilms[1];

  for (let i = 0; i < Math.min(cards.length, FILM_EXTRA_COUNT); i++) {
    renderCard(position, cardsFilms[i], cardsComments[i]);
  }
};

const renderFilms = (cardsFilm) => {
  const filmsBoard = new FilmsBoardView();
  const filmsList = new FilmsListView();
  const noFilmCards = new NoFilmCardsView();

  render(siteMainElement, filmsBoard.getElement(), RenderPosition.BEFOREEND);

  if (cardsFilm.length === 0) {
    render(filmsBoard.getElement(), noFilmCards.getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(filmsBoard.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);

  const filmsContainerElement = filmsList.getElement().querySelector(`.films-list__container`);

  cardsFilm
    .slice(0, Math.min(cardsFilm.length, CARD_COUNT_PER_STEP))
    .forEach((card, index) => renderCard(filmsContainerElement, card, comments[index]));

  for (let i = 0; i < FILM_LIST_COUNT; i++) {
    render(filmsBoard.getElement(), new FilmsListExtraView().getElement(), RenderPosition.BEFOREEND);
  }

  const filmsExtraElements = siteMainElement.querySelectorAll(`.films-list--extra`);
  const filmsTopRatedTitleElement = filmsExtraElements[0].querySelector(`.films-list__title`);
  const filmsMostCommentedTitleElement = filmsExtraElements[1].querySelector(`.films-list__title`);
  const filmsTopRatedContainerElement = filmsExtraElements[0].querySelector(`.films-list__container`);
  const filmsMostCommentedContainerElement = filmsExtraElements[1].querySelector(`.films-list__container`);

  filmsTopRatedTitleElement.textContent = `Top rated`;
  filmsMostCommentedTitleElement.textContent = `Most commented`;

  renderTopRated(filmsTopRatedContainerElement);
  renderMostCommented(filmsMostCommentedContainerElement);

  if (cardsFilm.length > CARD_COUNT_PER_STEP) {
    let renderedCardCount = CARD_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmsList.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      cardsFilm
        .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
        .forEach((card, index) => renderCard(filmsContainerElement, card, comments[index + renderedCardCount]));

      renderedCardCount += CARD_COUNT_PER_STEP;

      if (renderedCardCount >= cardsFilm.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }
};

renderFilms(cards);

render(siteFooterStatisticsElement, new StatisticsView(cards).getElement(), RenderPosition.BEFOREEND);
