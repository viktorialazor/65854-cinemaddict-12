import SmartView from "./smart.js";
import {createFilmInfoTemplate} from "./film-details-info.js";
import {createFilmControlsTemplate} from "./film-details-controls.js";
import {createFilmCommentsTemplate} from "./film-details-comments.js";

const createFilmDetailsTemplate = (data) => {
  const infoTemplate = createFilmInfoTemplate(data);
  const controlsTemplate = createFilmControlsTemplate(data);
  const commentsList = createFilmCommentsTemplate(data);
  const {comments} = data;
  const commentsQuantity = comments.length;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${infoTemplate}
          ${controlsTemplate}
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>
            <ul class="film-details__comments-list">
              ${commentsList}
            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetailsView extends SmartView {
  constructor(card, changeEditData) {
    super();
    this._changeEditData = changeEditData;
    this._data = FilmDetailsView.parseCardToData(card);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);
    this._watchlistChangeHandler = this._watchlistChangeHandler.bind(this);
    this._watchedChangeHandler = this._watchedChangeHandler.bind(this);
    this._closeDetailsCard = this._closeDetailsCard.bind(this);

    this._setInnerHandlers();
  }

  reset(card) {
    this.updateData(
        FilmDetailsView.parseCardToData(card)
    );
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`#favorite`)
      .addEventListener(`click`, this._favoriteChangeHandler);
    this.getElement()
      .querySelector(`#watchlist`)
      .addEventListener(`click`, this._watchlistChangeHandler);
    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`click`, this._watchedChangeHandler);
  }

  _favoriteChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavoriteOn: !this._data.isFavoriteOn
    });
  }

  _watchlistChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isInWatchlistOn: !this._data.isInWatchlistOn
    });
  }

  _watchedChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatchedOn: !this._data.isWatchedOn
    });
  }

  _closeDetailsCard(newData) {
    this._changeEditData(FilmDetailsView.parseDataToCard(newData));
    this.getElement().remove();
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick(this._closeDetailsCard(this._data));
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  static parseCardToData(card) {
    return Object.assign(
        {},
        card,
        {
          isFavoriteOn: card.isFavorite,
          isInWatchlistOn: card.isInWatchlist,
          isWatchedOn: card.isWatched
        }
    );
  }

  static parseDataToCard(data) {
    data = Object.assign(
        {},
        data,
        {
          isFavorite: data.isFavoriteOn,
          isInWatchlist: data.isInWatchlistOn,
          isWatched: data.isWatchedOn
        }
    );

    delete data.isFavoriteOn;
    delete data.isInWatchlistOn;
    delete data.isWatchedOn;

    return data;
  }
}
