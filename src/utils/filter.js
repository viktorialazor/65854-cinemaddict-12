import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL]: (cards) => cards.filter((card) => card),
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.isInWatchlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.isWatched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.isFavorite),
};
