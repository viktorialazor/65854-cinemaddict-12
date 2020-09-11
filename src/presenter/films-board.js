import {CARD_COUNT_PER_STEP, FILM_EXTRA_COUNT, RenderPosition, SortType} from "../const.js";
import {getTopCards, getMostCommentedCards, sortByDate, sortByRating} from "../utils/film-card.js";
import {render, remove} from "../utils/render.js";
import {updateCard} from "../utils/common.js";
import SortView from "../view/sort.js";
import FilmsBoardView from "../view/films-board.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import FilmsListTitleView from "../view/films-list-title.js";
import FilmsListExtraView from "../view/films-list-extra.js";
import NoFilmCardsView from "../view/no-film-card.js";
import CardPresenter from "./film-card.js";

export default class FilmsBoardPresenter {
  constructor(filmsBoardContainer) {
    this._filmsBoardContainer = filmsBoardContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._cardPresenter = {};
    this._cardRatedPresenter = [];

    this._sortComponent = new SortView();
    this._filmsBoardComponent = new FilmsBoardView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsListTitleComponent = new FilmsListTitleView();
    this._noFilmCardsComponent = new NoFilmCardsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(cardsFilms) {
    this._cardsFilms = cardsFilms.slice();
    this._cardsFilmsList = cardsFilms.slice();

    this._renderSort();

    render(this._filmsBoardContainer, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBoard();
  }

  _handleCardChange(updatedCard) {
    this._cardsFilms = updateCard(this._cardsFilms, updatedCard);
    this._cardsFilmsList = updateCard(this._cardsFilmsList, updatedCard);
    this._cardPresenter[updatedCard.id].init(this._filmsListContainerComponent, updatedCard);
    this._cardRatedPresenter.forEach((cardRated) => {
      if (parseInt(Object.keys(cardRated), 10) === parseInt(updatedCard.id, 10)) {
        let cardRatedNew = Object.values(cardRated);
        cardRatedNew[0].init(this._filmsListContainerComponent, updatedCard);
      }
    });
  }

  _handleModeChange() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => {
        presenter.resetView();
      });
    this._cardRatedPresenter.forEach((presenter) => {
      let ratedPresenter = Object.values(presenter);
      ratedPresenter[0].resetView();
    });
  }

  _sortCards(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._cardsFilms.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this._cardsFilms.sort(sortByRating);
        break;
      default:
        this._cardsFilms = this._cardsFilmsList.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortCards(sortType);
    this._clearCradsList();
    this._renderCards(0, Math.min(this._cardsFilms.length, CARD_COUNT_PER_STEP), this._filmsListContainerComponent);
  }

  _clearCradsList() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => {
        presenter.destroy();
      });
    this._cardPresenter = {};
    this._renderedCardCount = CARD_COUNT_PER_STEP;
  }

  _renderSort() {
    render(this._filmsBoardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderCard(position, card) {
    const cardPresenter = new CardPresenter(this._filmsBoardContainer, this._handleCardChange, this._handleModeChange);
    cardPresenter.init(position, card);
    if (!this._cardPresenter.hasOwnProperty([card.id])) {
      this._cardPresenter[card.id] = cardPresenter;
    } else {
      let cardRated = {[card.id]: cardPresenter};
      this._cardRatedPresenter.push(cardRated);
    }
  }

  _renderCards(from, to, position) {
    this._cardsFilms
      .slice(from, to)
      .forEach((card) => {
        this._renderCard(position, card);
      });
  }

  _renderTopRated(position) {
    const cardsFilms = getTopCards(this._cardsFilms);

    cardsFilms
      .slice()
      .forEach((item) => {
        this._renderCard(position, item);
      });
  }

  _renderMostCommented(position) {
    const cardsFilms = getMostCommentedCards(this._cardsFilms);

    cardsFilms
      .slice()
      .forEach((item) => {
        this._renderCard(position, item);
      });
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
    this._renderCards(this._renderedCardCount, this._renderedCardCount + CARD_COUNT_PER_STEP, this._filmsListContainerComponent);

    this._renderedCardCount += CARD_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._cardsFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsBoard() {
    if (this._cardsFilms.length === 0) {
      this._renderNoCards();
      return;
    }

    render(this._filmsListComponent, this._filmsListTitleComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(0, Math.min(this._cardsFilms.length, CARD_COUNT_PER_STEP), this._filmsListContainerComponent);

    this._renderFilmsExtra();

    if (this._cardsFilms.length > CARD_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }
}
