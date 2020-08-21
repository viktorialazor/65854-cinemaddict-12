export const createFilmControlsTemplate = (card) => {
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
