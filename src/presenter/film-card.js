import {RenderPosition} from "../const.js";
import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import {render, replace, remove} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  DETAILS: `DETAILS`
};

export default class Card {
  constructor(filmsBoardContainer, changeData, changeMode) {
    this._filmsBoardContainer = filmsBoardContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._cardDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDetailsClick = this._handleDetailsClick.bind(this);
    this._clickCloseButton = this._clickCloseButton.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(position, card) {
    this._card = card;

    const prevCardComponent = this._cardComponent;
    const prevCardEditComponent = this._cardDetailsComponent;

    this._cardComponent = new FilmCardView(card);
    this._cardDetailsComponent = new FilmDetailsView(card, this._changeData);

    this._cardComponent.setDetailsClickHandler(this._handleDetailsClick, `.film-card__poster`);
    this._cardComponent.setDetailsClickHandler(this._handleDetailsClick, `.film-card__title`);
    this._cardComponent.setDetailsClickHandler(this._handleDetailsClick, `.film-card__comments`);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevCardComponent === null || prevCardEditComponent === null) {
      render(position, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    } else {
      replace(this._cardComponent, prevCardComponent);
    }
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._cardDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._clickCloseButton();
    }
  }

  _clickCloseButton() {
    this._cardDetailsComponent.getElement().remove();
    this._cardDetailsComponent.removeElement();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._cardDetailsComponent.reset(this._card);
      this._filmsBoardContainer.removeChild(this._cardDetailsComponent.getElement());
      this._cardDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
      this._mode = Mode.DEFAULT;
    }
  }

  _handleDetailsClick() {
    this._filmsBoardContainer.appendChild(this._cardDetailsComponent.getElement());
    this._cardDetailsComponent.setCloseClickHandler(this._clickCloseButton);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.DETAILS;
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              isFavorite: !this._card.isFavorite
            }
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              isInWatchlist: !this._card.isInWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              isWatched: !this._card.isWatched
            }
        )
    );
  }
}
