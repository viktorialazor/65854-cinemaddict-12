import {CARD_COUNT_PER_STEP, RenderPosition, SortType, UpdateType, FilterStatisticType} from "../const.js";
import {getTopCards, getMostCommentedCards, sortByDate, sortByRating} from "../utils/film-card.js";
import {render, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {getWatchedFilms} from "../utils/statistic.js";
import UserProfileView from "../view/user-profile.js";
import FilmsQuantityView from "../view/films-quantity.js";
import SortView from "../view/sort.js";
import FilmsBoardView from "../view/films-board.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import FilmsListTitleView from "../view/films-list-title.js";
import FilmsListExtraView from "../view/films-list-extra.js";
import NoFilmCardsView from "../view/no-film-card.js";
import StatisticsView from "../view/statistics.js";
import LoadingView from "../view/loading.js";
import CardPresenter from "./film-card.js";

export default class FilmsBoardPresenter {
  constructor(filmsBoardContainer, cardsModel, filterModel, api) {
    this._filmsBoardContainer = filmsBoardContainer;
    this._cardsModel = cardsModel;
    this._filterModel = filterModel;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._statisticType = FilterStatisticType.ALL;
    this._cardPresenter = {};
    this._cardRatedPresenter = [];
    this._cards = this._cardsModel.getCards();
    this._isLoading = true;
    this._api = api;

    this._cardsWatched = getWatchedFilms(this._getCards());

    this._statisticsComponet = null;
    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._filmsRatedList = null;
    this._filmsCommentedList = null;
    this._userProfileComponent = null;
    this._filmsQuantityViewComponent = null;

    this._filmsBoardComponent = new FilmsBoardView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsListTitleComponent = new FilmsListTitleView();
    this._noFilmCardsComponent = new NoFilmCardsView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleStatisticChange = this._handleStatisticChange.bind(this);

    this._cardsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsBoard();
  }

  _getCards() {
    const filterType = this._filterModel.getFilter();
    this._cards = this._cardsModel.getCards();
    const filtredCards = filter[filterType](this._cards);

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filtredCards.sort(sortByDate);
      case SortType.BY_RATING:
        return filtredCards.sort(sortByRating);
    }

    return filtredCards;
  }

  _handleViewAction(updateType, update) {
    this._api.updateCard(update).then((response) => {
      if (response) {
        this._cardsModel.updateCard(updateType, update);
      }
    });
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._cardPresenter[data.id].init(this._filmsListContainerComponent, data);
        this._cardRatedPresenter.forEach((cardRated) => {
          if (parseInt(Object.keys(cardRated), 10) === parseInt(data.id, 10)) {
            let cardRatedNew = Object.values(cardRated);
            cardRatedNew[0].init(this._filmsListContainerComponent, data);
          }
        });
        this._topRatedFilms = getTopCards(this._cards);
        this._mostCommentedFilms = getMostCommentedCards(this._cards);
        break;
      case UpdateType.COMMENT:
        this._cardPresenter[data.id].init(this._filmsListContainerComponent, data);
        this._cardRatedPresenter.forEach((cardRated) => {
          if (parseInt(Object.keys(cardRated), 10) === parseInt(data.id, 10)) {
            let cardRatedNew = Object.values(cardRated);
            cardRatedNew[0].init(this._filmsListContainerComponent, data);
          }
        });
        this._clearFilmsBoard();
        this._renderFilmsBoard();
        break;
      case UpdateType.MINOR:
        this._clearFilmsBoard();
        remove(this._statisticsComponet);
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsBoard({resetRenderedCardCount: true, resetSortType: true});
        remove(this._statisticsComponet);
        this._renderFilmsBoard();
        break;
      case UpdateType.STATS:
        this._clearFilmsBoard({resetRenderedCardCount: true, resetSortType: true});
        remove(this._statisticsComponet);
        this._cardsWatched = getWatchedFilms(this._getCards());
        this._renderStatistics();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderFilmsBoard();
        break;
    }
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

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearFilmsBoard({resetRenderedCardCount: true});
    this._renderFilmsBoard();
  }

  _handleStatisticChange(statisticType) {
    if (this._statisticType === statisticType) {
      return;
    }

    this._statisticType = statisticType;
    const filmsWatched = getWatchedFilms(this._getCards());

    switch (this._statisticType) {
      case FilterStatisticType.ALL:
        this._cardsWatched = filmsWatched.slice();
        break;
      case FilterStatisticType.TODAY:
        let nowDateStart = new Date();
        let nowDateEnd = new Date();
        this._cardsWatched = filmsWatched.slice().filter((card) => {
          return card.watchingDate > nowDateStart.setHours(0, 0, 0, 0) && card.watchingDate < nowDateEnd.setHours(23, 59, 59, 999);
        });
        break;
      case FilterStatisticType.WEEK:
        let nowDateWeek = new Date();
        const weekAgo = new Date(nowDateWeek.setDate(nowDateWeek.getDate() - 7));
        this._cardsWatched = filmsWatched.slice().filter((card) => {
          return card.watchingDate > weekAgo && card.watchingDate < new Date();
        });
        break;
      case FilterStatisticType.MONTH:
        let nowDateMonth = new Date();
        const monthAgo = new Date(nowDateMonth.setMonth(nowDateMonth.getMonth() - 1));
        this._cardsWatched = filmsWatched.slice().filter((card) => {
          return card.watchingDate > monthAgo && card.watchingDate < new Date();
        });
        break;
      case FilterStatisticType.YEAR:
        let nowDateYear = new Date();
        const yearAgo = new Date(nowDateYear.setFullYear(nowDateYear.getFullYear() - 1));
        this._cardsWatched = filmsWatched.slice().filter((card) => {
          return card.watchingDate > yearAgo && card.watchingDate < new Date();
        });
        break;
    }
    remove(this._statisticsComponet);
    this._renderStatistics();
  }

  _renderStatistics() {
    if (this._statisticsComponet !== null) {
      this._statisticsComponet = null;
    }

    this._statisticsComponet = new StatisticsView(this._cardsWatched, this._statisticType);
    this._statisticsComponet.setStatisticChangeHandler(this._handleStatisticChange);

    render(this._filmsBoardContainer, this._statisticsComponet, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmsBoardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderCard(position, card) {
    const cardPresenter = new CardPresenter(this._filmsBoardContainer, this._handleViewAction, this._handleModeChange, this._api);
    cardPresenter.init(position, card);
    if (!this._cardPresenter.hasOwnProperty([card.id])) {
      this._cardPresenter[card.id] = cardPresenter;
    } else {
      let cardRated = {[card.id]: cardPresenter};
      this._cardRatedPresenter.push(cardRated);
    }
  }

  _renderCards(cards, position) {
    cards.forEach((card) => this._renderCard(position, card));
  }

  _renderTopRated(position) {
    if (this._topRatedFilms.length > 0) {
      this._topRatedFilms
        .slice()
        .forEach((item) => {
          this._renderCard(position, item);
        });
    }
  }

  _renderMostCommented(position) {
    if (this._mostCommentedFilms.length > 0) {
      this._mostCommentedFilms
        .slice()
        .forEach((item) => {
          this._renderCard(position, item);
        });
    }
  }

  _renderFilmsExtra() {
    if (this._topRatedFilms.length !== 0) {
      this._filmsRatedList = new FilmsListExtraView();

      render(this._filmsBoardComponent, this._filmsRatedList, RenderPosition.BEFOREEND);

      const filmsRatedTitleElement = this._filmsRatedList.getElement().querySelector(`.films-list__title`);
      const filmsRatedContainerElement = this._filmsRatedList.getElement().querySelector(`.films-list__container`);

      filmsRatedTitleElement.textContent = `Top rated`;
      this._renderTopRated(filmsRatedContainerElement);
    }

    if (this._mostCommentedFilms.length !== 0) {
      this._filmsCommentedList = new FilmsListExtraView();

      render(this._filmsBoardComponent, this._filmsCommentedList, RenderPosition.BEFOREEND);

      const filmsCommentedTitleElement = this._filmsCommentedList.getElement().querySelector(`.films-list__title`);
      const filmsCommentedContainerElement = this._filmsCommentedList.getElement().querySelector(`.films-list__container`);

      filmsCommentedTitleElement.textContent = `Most commented`;
      this._renderMostCommented(filmsCommentedContainerElement);
    }
  }

  _renderLoading() {
    render(this._filmsBoardContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoCards() {
    render(this._filmsListComponent, this._noFilmCardsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const cardCount = this._getCards().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardCount + CARD_COUNT_PER_STEP);
    const cards = this._getCards().slice(this._renderedCardCount, newRenderedCardCount);

    this._renderCards(cards, this._filmsListContainerComponent);
    this._renderedCardCount = newRenderedCardCount;

    if (this._renderedCardCount >= cardCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _clearFilmsBoard({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardCount = this._getCards().length;
    this._topRatedFilms = getTopCards(this._cards);
    this._mostCommentedFilms = getMostCommentedCards(this._cards);
    this._statisticType = FilterStatisticType.ALL;

    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};

    this._cardRatedPresenter
      .forEach((cardRated) => {
        Object
          .values(cardRated)
          .forEach((cardPresenter) => cardPresenter.destroy());
      });

    this._cardRatedPresenter = [];

    remove(this._sortComponent);
    remove(this._noFilmCardsComponent);
    remove(this._showMoreButtonComponent);
    remove(this._filmsRatedList);
    remove(this._filmsCommentedList);
    remove(this._loadingComponent);
    remove(this._statisticsComponet);
    remove(this._userProfileComponent);
    remove(this._filmsQuantityViewComponent);

    if (resetRenderedCardCount) {
      this._renderedCardCount = CARD_COUNT_PER_STEP;
    } else {
      this._renderedCardCount = Math.min(cardCount, this._renderedCardCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilmsBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const cardCount = this._getCards().length;
    this._topRatedFilms = getTopCards(this._cards);
    this._mostCommentedFilms = getMostCommentedCards(this._cards);

    if (cardCount === 0) {
      this._renderNoCards();
      this._renderFilmsExtra();
      return;
    }

    const cards = this._getCards().slice(0, Math.min(cardCount, this._renderedCardCount));
    const siteHeaderElement = document.querySelector(`.header`);
    const siteFooterQuantityElement = document.querySelector(`.footer__statistics`);

    this._userProfileComponent = new UserProfileView(this._cards);
    this._filmsQuantityViewComponent = new FilmsQuantityView(this._cards);

    render(siteHeaderElement, this._userProfileComponent, RenderPosition.BEFOREEND);
    render(siteFooterQuantityElement, this._filmsQuantityViewComponent, RenderPosition.BEFOREEND);

    this._renderSort();

    render(this._filmsBoardContainer, this._filmsBoardComponent, RenderPosition.BEFOREEND);

    render(this._filmsBoardComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    render(this._filmsListComponent, this._filmsListTitleComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(cards, this._filmsListContainerComponent);

    this._renderFilmsExtra();

    if (cardCount > this._renderedCardCount) {
      this._renderShowMoreButton();
    }
  }
}
