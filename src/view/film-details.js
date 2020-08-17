const createFilmInfoTemplate = (card) => {
  const {name, image, rating, director, writers, actors, releaseDate, country, duration, age, genre, description} = card;

  const getFilmGenre = () => {
    let filmGenre = ``;

    genre.forEach((item) => {
      filmGenre += `<span class="film-details__genre">` + item + `</span>`;
    });

    return filmGenre;
  };

  const genres = getFilmGenre();

  return `<div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${image}" alt="">
              <p class="film-details__age">${age}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${name}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${genres}</tr>
              </table>
              <p class="film-details__film-description">${description}</p>
            </div>
          </div>`;
};

const createFilmControlsTemplate = (card) => {
  const {isInWatchlist, isWatched, isFavorite} = card;

  const isFilmInWatchlist = isInWatchlist[1] ? `checked` : ``;
  const isFilmWatched = isWatched[1] ? `checked` : ``;
  const isFilmFavorite = isFavorite[1] ? `checked` : ``;

  return `<section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isFilmInWatchlist}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isFilmWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFilmFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>`;
};

const createFilmCommentTemplate = (card) => {
  const {comments} = card;
  let filmComments = ``;

  if (comments.length >= 1) {
    for (let i = 0; i < comments.length; i++) {
      filmComments += `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="` + comments[i].emoji + `" width="55" height="55" alt="emoji-` + comments[i].alt + `">
              </span>
              <div>
                <p class="film-details__comment-text">` + comments[i].text + `</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">` + comments[i].author + `</span>
                  <span class="film-details__comment-day">` + comments[i].date + `</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`;
    }
  }

  return filmComments;
};

export const createFilmDetailsTemplate = (card) => {
  const {commentsQuantity} = card;

  const infoTemplate = createFilmInfoTemplate(card);
  const controlsTemplate = createFilmControlsTemplate(card);
  const commentsList = createFilmCommentTemplate(card);

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
