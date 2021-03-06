import {MINUTES_LENGTH, MINUTES_IN_HOUR} from "../const.js";
import moment from "moment";
import momentDurationFormat from "moment-duration-format";

momentDurationFormat(moment);

export const getFilmsQuantity = (cards) => {
  let filmsQuantity = 0;

  cards.forEach((card) => {
    if (card.isWatched) {
      filmsQuantity += 1;
    }
  });

  return filmsQuantity;
};

export const getFilmDuration = (duration) => {
  duration = duration.slice(0, -1);
  let findLetter = false;
  let hours = ``;
  let minutes = ``;
  let totalTime = 0;

  if (duration.length < MINUTES_LENGTH) {
    totalTime = parseInt(duration, 10);
  } else {
    for (let i = 0; i < duration.length; i++) {
      if (duration[i] !== `h` && findLetter === false) {
        hours += duration[i];
      } else if (duration[i] === `h`) {
        findLetter = true;
      } else if (duration[i] !== `h` && findLetter === true) {
        minutes += duration[i];
      }
    }

    totalTime = (parseInt(hours, 10) * MINUTES_IN_HOUR) + parseInt(minutes, 10);
  }

  return totalTime;
};

export const getFilmsDuration = (cards) => {
  let totalTime = 0;
  let totalHours = 0;
  let totalMinutes = 0;

  cards.forEach((card) => {
    totalTime += getFilmDuration(card.duration);
  });

  if (totalTime > MINUTES_IN_HOUR) {
    totalHours = parseInt((totalTime / MINUTES_IN_HOUR), 10);
    totalMinutes = totalTime - (totalHours * MINUTES_IN_HOUR);
  } else {
    totalMinutes = totalTime;
  }

  return {
    hours: totalHours,
    minutes: totalMinutes
  };
};

export const getGenresRate = (allGenres) => {
  const resultReduce = allGenres.reduce((acc, cur) => {
    if (!acc.hash[cur]) {
      acc.hash[cur] = {[cur]: 1};
      acc.map.set(acc.hash[cur], 1);
      acc.result.push(acc.hash[cur]);
    } else {
      acc.hash[cur][cur] += 1;
      acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
    }
    return acc;
  }, {
    hash: {},
    map: new Map(),
    result: []
  });

  const genresRated = resultReduce.result.sort((elemA, elemB) => {
    return resultReduce.map.get(elemB) - resultReduce.map.get(elemA);
  });

  return genresRated;
};

export const getTopGenre = (cards) => {
  let genres = [];

  cards.forEach((card) => {
    genres = genres.concat(card.genre);
  });

  let number = 0;
  let genre = ``;

  const genresRated = getGenresRate(genres);

  genresRated.forEach((item) => {
    if (Object.values(item) > number) {
      number = Object.values(item);
      genre = Object.keys(item).toString();
    }
  });

  return genre;
};

export const getWatchedFilms = (cards) => {
  const watchedFilmsAll = cards.filter((card) => card.isWatched);
  return watchedFilmsAll;
};

export const getGenresList = (cards) => {
  let genres = [];
  const genresList = [];
  const quantityList = [];

  cards.forEach((card) => {
    genres = genres.concat(card.genre);
  });

  const genresRated = getGenresRate(genres);
  genresRated.forEach((item) => {
    genresList.push(Object.keys(item).toString());
    quantityList.push(parseInt(Object.values(item), 10));
  });

  return {
    genres: genresList,
    quantity: quantityList
  };
};
