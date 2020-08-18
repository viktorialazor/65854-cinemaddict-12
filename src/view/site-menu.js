export const createSiteMenuTemplate = (cards) => {

  const getQuantityCards = (filter) => {
    let quantity = 0;

    if (filter === `watchlist`) {
      cards.forEach((item) => {
        if (item.isInWatchlist.isFilter) {
          quantity += 1;
        }
      });
    } else if (filter === `watched`) {
      cards.forEach((item) => {
        if (item.isWatched.isFilter) {
          quantity += 1;
        }
      });
    } else {
      cards.forEach((item) => {
        if (item.isFavorite.isFilter) {
          quantity += 1;
        }
      });
    }

    return quantity;
  };

  const watchlistCardsQuantity = getQuantityCards(`watchlist`);
  const watchedCardsQuantity = getQuantityCards(`watched`);
  const favoriteCardsQuantity = getQuantityCards(`favorite`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCardsQuantity}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedCardsQuantity}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteCardsQuantity}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
