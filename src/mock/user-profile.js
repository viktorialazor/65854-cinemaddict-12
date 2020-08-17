const getFilmWatchedQuantity = (cards) => {
  let filmWatchedQuantity = 0;

  cards.forEach((item) => {
    if(item.isWatched[1]) {
      filmWatchedQuantity += 1;
    }
  })

  return filmWatchedQuantity;
};

export const generateProfileRating = (cards) => {
  const filmQuantity = getFilmWatchedQuantity(cards);
  let rating = ``;

  if(filmQuantity === 0) {
    rating = ``;
  } else if (filmQuantity > 0 && filmQuantity <= 10) {
    rating = `Novice`;
  } else if (filmQuantity > 10 && filmQuantity <= 20) {
    rating = `Fan`;
  } else {
    rating = `Movie Buff`;
  }

  return rating;
};
