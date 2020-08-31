import {CARD_COUNT_PER_STEP, FILM_EXTRA_COUNT} from "../const.js";
import {getTopCards, getMostCommentedCards} from "../utils/card.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import SortView from "../view/sort.js";
import FilmsBoardView from "../view/films-board.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import FilmsListTitleView from "../view/films-list-title.js";
import FilmCardView from "../view/film-card.js";
import FilmsListExtraView from "../view/films-list-extra.js";
import FilmDetailsView from "../view/film-details.js";
import NoFilmCardsView from "../view/no-film-card.js";

export default class FilmsBoard {
  constructor(filmsBoardContainer) {
    this._filmsBoardContainer = filmsBoardContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;

    this._sortViewComponent = new SortView();
    this._filmsBoardComponent = new FilmsBoardView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsListTitleComponent = new FilmsListTitleView();
    this._noFilmCardsComponent = new NoFilmCardsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(cardsFilm, commentsFilms) {
    this._cardsFilm = cardsFilm.slice();
    this._commentsFilms = commentsFilms.slice();

    this._renderSort();

    render(this._filmsBoardContainer, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBoard();
  }

  _renderSort() {
    render(this._filmsBoardContainer, this._sortViewComponent, RenderPosition.BEFOREEND);
  }

  _renderCard(position, card, commentsFilm) {
    const cardComponent = new FilmCardView(card, commentsFilm);
    const cardDetailsComponent = new FilmDetailsView(card, commentsFilm);

    const clickCloseButton = () => {
      this._filmsBoardContainer.removeChild(cardDetailsComponent.getElement());
      cardDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        this._filmsBoardContainer.removeChild(cardDetailsComponent.getElement());
        cardDetailsComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    cardComponent.setDetailsClickHandler(() => {
      this._filmsBoardContainer.appendChild(cardDetailsComponent.getElement());
      cardDetailsComponent.setCloseClickHandler(clickCloseButton);
      document.addEventListener(`keydown`, onEscKeyDown);
    }, `.film-card__poster`);

    cardComponent.setDetailsClickHandler(() => {
      this._filmsBoardContainer.appendChild(cardDetailsComponent.getElement());
      cardDetailsComponent.setCloseClickHandler(clickCloseButton);
      document.addEventListener(`keydown`, onEscKeyDown);
    }, `.film-card__title`);

    cardComponent.setDetailsClickHandler(() => {
      this._filmsBoardContainer.appendChild(cardDetailsComponent.getElement());
      cardDetailsComponent.setCloseClickHandler(clickCloseButton);
      document.addEventListener(`keydown`, onEscKeyDown);
    }, `.film-card__comments`);

    render(position, cardComponent, RenderPosition.BEFOREEND);
  }

  _renderCards(from, to, position, isButton) {
    if (isButton === `isButton`) {
      this._cardsFilm
        .slice(from, to)
        .forEach((card, index) => this._renderCard(position, card, this._commentsFilms[index + from]));
    } else {
      this._cardsFilm
        .slice(from, to)
        .forEach((card, index) => this._renderCard(position, card, this._commentsFilms[index]));
    }
  }

  _renderTopRated(position) {
    const topCardsFilms = getTopCards(this._cardsFilm, this._commentsFilms);
    const cardsTop = topCardsFilms[0];
    const cardsComments = topCardsFilms[1];

    for (let i = 0; i < Math.min(this._cardsFilm.length, FILM_EXTRA_COUNT); i++) {
      this._renderCard(position, cardsTop[i], cardsComments[i]);
    }
  }

  _renderMostCommented(position) {
    const mostCommentedFilms = getMostCommentedCards(this._cardsFilm, this._commentsFilms);
    const cardsFilms = mostCommentedFilms[0];
    const cardsComments = mostCommentedFilms[1];

    for (let i = 0; i < Math.min(this._cardsFilm.length, FILM_EXTRA_COUNT); i++) {
      this._renderCard(position, cardsFilms[i], cardsComments[i]);
    }
  }

  _renderFilmsExtra() {
    for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
      render(this._filmsBoardComponent, new FilmsListExtraView(), RenderPosition.BEFOREEND);
    }

    const filmsExtraElements = document.querySelectorAll(`.films-list--extra`);
    const filmsTopRatedTitleElement = filmsExtraElements[0].querySelector(`.films-list__title`);
    const filmsMostCommentedTitleElement = filmsExtraElements[1].querySelector(`.films-list__title`);
    const filmsTopRatedContainerElement = filmsExtraElements[0].querySelector(`.films-list__container`);
    const filmsMostCommentedContainerElement = filmsExtraElements[1].querySelector(`.films-list__container`);

    filmsTopRatedTitleElement.textContent = `Top rated`;
    filmsMostCommentedTitleElement.textContent = `Most commented`;

    this._renderTopRated(filmsTopRatedContainerElement);
    this._renderMostCommented(filmsMostCommentedContainerElement);
  }

  _renderNoCards() {
    render(this._filmsListComponent, this._noFilmCardsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedCardCount, this._renderedCardCount + CARD_COUNT_PER_STEP, this._filmsListContainerComponent, `isButton`);

    this._renderedCardCount += CARD_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._cardsFilm.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsBoard() {
    if (this._cardsFilm.length === 0) {
      this._renderNoCards();
      return;
    }

    render(this._filmsListComponent, this._filmsListTitleComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(0, Math.min(this._cardsFilm.length, CARD_COUNT_PER_STEP), this._filmsListContainerComponent, `noButton`);

    this._renderFilmsExtra();

    if (this._cardsFilm.length > CARD_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }
}
