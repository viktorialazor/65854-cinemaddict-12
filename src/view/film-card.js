import {createElement} from "../utils.js";

const createFilmCardTemplate = (card, comments) => {
  const {name, image, rating, year, duration, genre, description, isInWatchlist, isWatched, isFavorite} = card;
  const genreFilm = genre[0];
  const commentsQuantity = comments.length;

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
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsQuantity} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard {
  constructor(card, comments) {
    this._card = card;
    this._comments = comments;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card, this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
