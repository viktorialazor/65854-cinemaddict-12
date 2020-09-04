import {CARD_COUNT_PER_STEP, FILM_EXTRA_COUNT, RENDER_POSITION, SORT_TYPE} from "../const.js";
import {getTopCards, getMostCommentedCards, sortByDate, sortByRating} from "../utils/card.js";
import {render, remove} from "../utils/render.js";
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

export default class FilmsBoardPresenter {
  constructor(filmsBoardContainer) {
    this._filmsBoardContainer = filmsBoardContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._currentSortType = SORT_TYPE.DEFAULT;

    this._sortComponent = new SortView();
    this._filmsBoardComponent = new FilmsBoardView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsListTitleComponent = new FilmsListTitleView();
    this._noFilmCardsComponent = new NoFilmCardsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(cardsFilms) {
    this._cardsFilms = cardsFilms.slice();
    this._cardsFilmsList = cardsFilms.slice();

    this._renderSort();

    render(this._filmsBoardContainer, this._filmsBoardComponent, RENDER_POSITION.BEFOREEND);
    render(this._filmsBoardComponent, this._filmsListComponent, RENDER_POSITION.BEFOREEND);

    this._renderFilmsBoard();
  }

  _sortCards(sortType) {
    switch (sortType) {
      case SORT_TYPE.BY_DATE:
        this._cardsFilms.sort(sortByDate);
        break;
      case SORT_TYPE.BY_RATING:
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
    this._renderCards(0, Math.min(this._cardsFilms.length, CARD_COUNT_PER_STEP), this._filmsListContainerComponent, `noButton`);
  }

  _clearCradsList() {
    this._filmsListContainerComponent.getElement().innerHTML = ``;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
  }

  _renderSort() {
    render(this._filmsBoardContainer, this._sortComponent, RENDER_POSITION.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderCard(position, card) {
    const cardComponent = new FilmCardView(card);
    const cardDetailsComponent = new FilmDetailsView(card);

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

    render(position, cardComponent, RENDER_POSITION.BEFOREEND);
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
      render(this._filmsBoardComponent, new FilmsListExtraView(), RENDER_POSITION.BEFOREEND);
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
    render(this._filmsListComponent, this._noFilmCardsComponent, RENDER_POSITION.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedCardCount, this._renderedCardCount + CARD_COUNT_PER_STEP, this._filmsListContainerComponent);

    this._renderedCardCount += CARD_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._cardsFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RENDER_POSITION.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsBoard() {
    if (this._cardsFilms.length === 0) {
      this._renderNoCards();
      return;
    }

    render(this._filmsListComponent, this._filmsListTitleComponent, RENDER_POSITION.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RENDER_POSITION.BEFOREEND);

    this._renderCards(0, Math.min(this._cardsFilms.length, CARD_COUNT_PER_STEP), this._filmsListContainerComponent, `noButton`);

    this._renderFilmsExtra();

    if (this._cardsFilms.length > CARD_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }
}
