import AbstractView from "./abstract.js";
import {getShortDescription} from "../utils/film-card.js";

const createFilmCardTemplate = (card) => {
  const {name, image, rating, releaseDate, duration, genre, description, isInWatchlist, isWatched, isFavorite, comments} = card;
  const year = releaseDate.slice(-4);
  const genreFilm = genre[0];
  const commentsQuantity = comments.length;
  const watchlist = isInWatchlist ? `film-card__controls-item--active` : ``;
  const watched = isWatched ? `film-card__controls-item--active` : ``;
  const favorite = isFavorite ? `film-card__controls-item--active` : ``;
  const shortDescription = getShortDescription(description);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genreFilm}</span>
      </p>
      <img src="${image}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsQuantity} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._detailsClickHandler = this._detailsClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  _detailsClickHandler(evt) {
    evt.preventDefault();
    this._callback.detailsClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setDetailsClickHandler(callback, selector) {
    this._callback.detailsClick = callback;
    this.getElement().querySelector(selector).addEventListener(`click`, this._detailsClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }
}
