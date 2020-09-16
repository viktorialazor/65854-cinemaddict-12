import {RATING_MIN, RATING_MAX} from "../const.js";
import {getRandomInteger, getRandomFloat, generateId} from "../utils/common.js";
import {isFilmInFilter} from "../utils/film-card.js";
import {generateComments} from "./comments.js";
import {formatReleaseDate, formatFilmDuration} from "../utils/film-card.js";

// const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateRating = () => {
  return getRandomFloat(RATING_MIN, RATING_MAX);
};

const generateReleaseDate = (year, month, day) => {
  const releaseDate = new Date();
  releaseDate.setFullYear(year, month, day);

  return new Date(releaseDate);
};

const generateInfo = () => {

  const info = [
    {
      name: `The Dance of Life`,
      image: `the-dance-of-life.jpg`,
      director: `John Cromwell, A. Edward Sutherland`,
      writers: `Benjamin Glazer, Arthur Hopkins, Julian Johnson`,
      actors: `Hal Skelly, Nancy Carroll, Dorothy Revier`,
      releaseDate: formatReleaseDate(generateReleaseDate(`1929`, `07`, `28`)),
      country: `USA`,
      year: `1929`,
      duration: formatFilmDuration(115),
      age: `18`,
      genre: [`Musical`, `Film-Noir`, `Mystery`]
    },
    {
      name: `Sagebrush Trail`,
      image: `sagebrush-trail.jpg`,
      director: `JArmand Schaefer`,
      writers: `Lindsley Parsons`,
      actors: `John Wayne, Nancy Shubert, Lane Chandler`,
      releaseDate: formatReleaseDate(generateReleaseDate(`1933`, `11`, `15`)),
      country: `USA`,
      year: `1933`,
      duration: formatFilmDuration(54),
      age: `16`,
      genre: [`Western`, `Action`, `Drama`, `Romance`]
    },
    {
      name: `The Man with the Golden Arm`,
      image: `the-man-with-the-golden-arm.jpg`,
      director: `Otto Preminger`,
      writers: `Walter Newman, Lewis Meltzer`,
      actors: `Frank Sinatra, Kim Novak, Eleanor Parker`,
      releaseDate: formatReleaseDate(generateReleaseDate(`1955`, `11`, `15`)),
      country: `USA`,
      year: `1955`,
      duration: formatFilmDuration(119),
      age: `16`,
      genre: [`Drama`, `Crime`, `Romance`]
    },
    {
      name: `Santa Claus Conquers the Martians`,
      image: `santa-claus-conquers-the-martians.jpg`,
      director: `Nicholas Webster`,
      writers: `Glenville Mareth, Paul L. Jacobson`,
      actors: `John Call, Leonard Hicks, Vincent Beck`,
      releaseDate: formatReleaseDate(generateReleaseDate(`1964`, `10`, `14`)),
      country: `USA`,
      year: `1964`,
      duration: formatFilmDuration(81),
      age: `8`,
      genre: [`Comedy`, `Adventure`, `Family`]
    },
    {
      name: `Popeye the Sailor Meets Sindbad the Sailor`,
      image: `popeye-meets-sinbad.png`,
      director: `Dave Fleischer`,
      writers: `Max Fleischer, Adolph Zukor`,
      actors: `Jack Mercer, Mae Questel, Gus Wickie, Lou Fleischer`,
      releaseDate: formatReleaseDate(generateReleaseDate(`1936`, `10`, `27`)),
      country: `USA`,
      year: `1936`,
      duration: formatFilmDuration(16),
      age: `8`,
      genre: [`Cartoon`, `Comedy`, `Family`]
    },
    {
      name: `The Great Flamarion`,
      image: `the-great-flamarion.jpg`,
      director: `Anthony Mann`,
      writers: `Anne Wigton, Heinz Herald, Richard Weil`,
      actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
      releaseDate: formatReleaseDate(generateReleaseDate(`1945`, `02`, `30`)),
      country: `USA`,
      year: `1945`,
      duration: formatFilmDuration(78),
      age: `18`,
      genre: [`Mystery`, `Drama`, `Film-Noir`, `Romance`]
    },
    {
      name: `Made for Each Other`,
      image: `made-for-each-other.png`,
      director: `John Cromwell`,
      writers: `Jo Swerling, Rose Franken`,
      actors: `Carole Lombard, James Stewart, Charles Coburn`,
      releaseDate: formatReleaseDate(generateReleaseDate(`1939`, `01`, `10`)),
      country: `USA`,
      year: `1939`,
      duration: formatFilmDuration(92),
      age: `16`,
      genre: [`Comedy`, `Drama`, `Romance`]
    }
  ];

  const randomIndex = getRandomInteger(0, info.length - 1);

  return info[randomIndex];
};

const generateDescription = () => {

  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const totalStrings = getRandomInteger(1, 5);
  let description = ``;
  let descriptionsFilms = descriptions.slice();

  for (let i = 0; i < totalStrings; i++) {
    let randomIndex = getRandomInteger(0, descriptionsFilms.length - 1);

    if (i > 0 && i < totalStrings) {
      description += ``;
    }

    description += descriptionsFilms[randomIndex];
    descriptionsFilms.splice(randomIndex, 1);
  }

  return description;
};

export const generateFilmCard = () => {
  const info = generateInfo();

  return {
    id: generateId(),
    name: info.name,
    image: `./images/posters/${info.image}`,
    rating: generateRating(),
    director: info.director,
    writers: info.writers,
    actors: info.actors,
    releaseDate: info.releaseDate,
    country: info.country,
    year: info.year,
    duration: info.duration,
    age: info.age,
    genre: info.genre,
    description: generateDescription(),
    isInWatchlist: isFilmInFilter(),
    isWatched: isFilmInFilter(),
    isFavorite: isFilmInFilter(),
    comments: generateComments()
  };
};
