import {UserAction, UpdateType, CommentAlt, CommentImgPath} from "../const.js";
import {generateId, getDate} from "../utils/common.js";
import {generateCommentAuthor} from "../utils/film-card.js";
import SmartView from "./smart.js";
import {createFilmInfoTemplate} from "./film-details-info.js";
import {createFilmControlsTemplate} from "./film-details-controls.js";
import {createFilmCommentsTemplate} from "./film-details-comments.js";

const createFilmDetailsTemplate = (data) => {
  const infoTemplate = createFilmInfoTemplate(data);
  const controlsTemplate = createFilmControlsTemplate(data);
  const commentsTemplate = createFilmCommentsTemplate(data);
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

                  <ul class="film-details__comments-list">${commentsTemplate}</ul><div class="film-details__new-comment">
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
    this._commentsList = ``;

    this._filmCommentsList = card.comments;
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);
    this._watchlistChangeHandler = this._watchlistChangeHandler.bind(this);
    this._watchedChangeHandler = this._watchedChangeHandler.bind(this);
    this._closeDetailsCard = this._closeDetailsCard.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
    this._enterKeyDownHandler = this._enterKeyDownHandler.bind(this);
    this._getEmojiId = this._getEmojiId.bind(this);

    this._newCommentForm = this.getElement().querySelector(`.film-details__new-comment`);

    this._setInnerHandlers();
    this._setCommentHandler();
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
    this._setCommentHandler();
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
    this.getElement()
      .querySelector(`.film-details__new-comment`)
      .addEventListener(`keydown`, this._enterKeyDownHandler);
    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._getEmojiId);
  }

  _setCommentHandler() {
    this._commentsList = this.getElement().querySelectorAll(`.film-details__comment`);
    this._commentsList.forEach((commentItem) => {
      commentItem.addEventListener(`click`, this._deleteCommentHandler);
    });
  }

  _deleteCommentHandler(evt) {
    if (evt.target.tagName !== `BUTTON`) {
      return;
    }

    evt.preventDefault();
    const comment = evt.target.closest(`.film-details__comment`);
    comment.remove();
    this._deleteComment(evt.target.dataset.commentId);
  }

  _getNewCommentText(evt) {
    const text = evt.target.value;
    return text;
  }

  _getEmojiId() {
    const id = event.target.id;
    return id;
  }

  _getEmojiImg(emoji) {
    let emojiImg = ``;

    switch (emoji) {
      case `emoji-smile`:
        emojiImg = CommentImgPath.SMILE;
        break;
      case `emoji-sleeping`:
        emojiImg = CommentImgPath.SLEEPING;
        break;
      case `emoji-puke`:
        emojiImg = CommentImgPath.PUKE;
        break;
      case `emoji-angry`:
        emojiImg = CommentImgPath.ANGRY;
        break;
    }

    return emojiImg;
  }

  _getEmojiAlt(alt) {
    let emojiAlt = ``;

    switch (alt) {
      case `emoji-smile`:
        emojiAlt = CommentAlt.SMILE;
        break;
      case `emoji-sleeping`:
        emojiAlt = CommentAlt.SLEEPING;
        break;
      case `emoji-puke`:
        emojiAlt = CommentAlt.PUKE;
        break;
      case `emoji-angry`:
        emojiAlt = CommentAlt.ANGRY;
        break;
    }

    return emojiAlt;
  }

  _enterKeyDownHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      evt.preventDefault();

      this._newCommentText = this.getElement().querySelector(`.film-details__comment-input`);

      if (this._newCommentText.value !== `` && this._getEmojiId()) {
        const newComment = {
          id: generateId(),
          author: generateCommentAuthor(),
          date: getDate(),
          text: this._newCommentText.value,
          emoji: this._getEmojiImg(this._getEmojiId()),
          alt: this._getEmojiAlt(this._getEmojiId())
        };

        this._addComment(newComment);
      }
    } else if (evt.key === `Enter`) {
      evt.preventDefault();
      this.getElement()
        .querySelector(`.film-details__new-comment`)
        .addEventListener(`keydown`, this._enterKeyDownHandler);
    }
  }

  _addComment(update) {
    this._filmCommentsList = [
      update,
      ...this._filmCommentsList
    ];
    this.updateData({
      comments: this._filmCommentsList
    });
  }

  _deleteComment(update) {
    const index = this._filmCommentsList.findIndex((comments) => parseInt(comments.id, 10) === parseInt(update, 10));

    if (index === -1) {
      throw new Error(`Can't delete unexisting comments`);
    }

    this._filmCommentsList = [
      ...this._filmCommentsList.slice(0, index),
      ...this._filmCommentsList.slice(index + 1)
    ];

    this.updateData({
      comments: this._filmCommentsList
    });
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
      isWatchedOn: !this._data.isWatchedOn,
      watchingDate: this._data.isWatchedOn === false ? new Date() : null
    });
  }

  _closeDetailsCard(newData) {
    this._changeEditData(UserAction.UPDATE_CARD, UpdateType.COMMENT, FilmDetailsView.parseDataToCard(newData));
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
    card = Object.assign(
        {},
        card,
        {
          isFavoriteOn: card.isFavorite,
          isInWatchlistOn: card.isInWatchlist,
          isWatchedOn: card.isWatched
        }
    );

    return card;
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
