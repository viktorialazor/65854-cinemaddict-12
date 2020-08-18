import {USER_FAN_MIN, USER_FAN_MAX} from "../const.js";

const getFilmWatchedQuantity = (cards) => {
  let filmWatchedQuantity = 0;

  cards.forEach((item) => {
    if (item.isWatched.isFilter) {
      filmWatchedQuantity += 1;
    }
  });

  return filmWatchedQuantity;
};

export const generateProfileRating = (cards) => {
  const filmQuantity = getFilmWatchedQuantity(cards);
  let rating = ``;

  if (filmQuantity === 0) {
    rating = ``;
  } else if (filmQuantity > 0 && filmQuantity <= USER_FAN_MIN) {
    rating = `Novice`;
  } else if (filmQuantity > USER_FAN_MIN && filmQuantity <= USER_FAN_MAX) {
    rating = `Fan`;
  } else {
    rating = `Movie Buff`;
  }

  return rating;
};
