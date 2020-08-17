import {getRandomInteger, getRandomFloat, humanizeDate, isFilmInFilter} from "../utils.js";

const RATING_MIN = 1;
const RATING_MAX = 10;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 5;

const generateRating = () => {
  return getRandomFloat(RATING_MIN, RATING_MAX);
};

const generateInfo = () => {

  const info = [
    {
      name: `The Dance of Life`,
      image: `the-dance-of-life.jpg`,
      director: `John Cromwell, A. Edward Sutherland`,
      writers: `Benjamin Glazer, Arthur Hopkins, Julian Johnson`,
      actors: `Hal Skelly, Nancy Carroll, Dorothy Revier`,
      releaseDate: `28 August 1929`,
      country: `USA`,
      year: `1929`,
      duration: `1h 55m`,
      age: `18`,
      genre: [`Musical`, `Film-Noir`, `Mystery`]
    },
    {
      name: `Sagebrush Trail`,
      image: `sagebrush-trail.jpg`,
      director: `JArmand Schaefer`,
      writers: `Lindsley Parsons`,
      actors: `John Wayne, Nancy Shubert, Lane Chandler`,
      releaseDate: `15 December 1933`,
      country: `USA`,
      year: `1933`,
      duration: `54m`,
      age: `16`,
      genre: [`Western`, `Action`, `Drama`, `Romance`]
    },
    {
      name: `The Man with the Golden Arm`,
      image: `the-man-with-the-golden-arm.jpg`,
      director: `Otto Preminger`,
      writers: `Walter Newman, Lewis Meltzer`,
      actors: `Frank Sinatra, Kim Novak, Eleanor Parker`,
      releaseDate: `15 December 1955`,
      country: `USA`,
      year: `1955`,
      duration: `1h 59m`,
      age: `16`,
      genre: [`Drama`, `Crime`, `Romance`]
    },
    {
      name: `Santa Claus Conquers the Martians`,
      image: `santa-claus-conquers-the-martians.jpg`,
      director: `Nicholas Webster`,
      writers: `Glenville Mareth, Paul L. Jacobson`,
      actors: `John Call, Leonard Hicks, Vincent Beck`,
      releaseDate: `14 November 1964`,
      country: `USA`,
      year: `1964`,
      duration: `1h 21m`,
      age: `8`,
      genre: [`Comedy`, `Adventure`, `Family`]
    },
    {
      name: `Popeye the Sailor Meets Sindbad the Sailor`,
      image: `popeye-meets-sinbad.png`,
      director: `Dave Fleischer`,
      writers: `Max Fleischer, Adolph Zukor`,
      actors: `Jack Mercer, Mae Questel, Gus Wickie, Lou Fleischer`,
      releaseDate: `November 27 1936`,
      country: `USA`,
      year: `1936`,
      duration: `16m`,
      age: `8`,
      genre: [`Cartoon`, `Comedy`, `Family`]
    },
    {
      name: `The Great Flamarion`,
      image: `the-great-flamarion.jpg`,
      director: `Anthony Mann`,
      writers: `Anne Wigton, Heinz Herald, Richard Weil`,
      actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
      releaseDate: `30 March 1945`,
      country: `USA`,
      year: `1945`,
      duration: `1h 18m`,
      age: `18`,
      genre: [`Mystery`, `Drama`, `Film-Noir`, `Romance`]
    },
    {
      name: `Made for Each Other`,
      image: `made-for-each-other.png`,
      director: `John Cromwell`,
      writers: `Jo Swerling, Rose Franken`,
      actors: `Carole Lombard, James Stewart, Charles Coburn`,
      releaseDate: `February 10 1939`,
      country: `USA`,
      year: `1939`,
      duration: `1h 32m`,
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

const generateCommentDate = () => {

  const year = 2019;
  const maxMonthGap = 11;
  const maxDaysGap = 6;
  const maxHoursGap = 24;
  const maxMinutesGap = 60;
  const monthGap = getRandomInteger(-maxMonthGap, maxMonthGap);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  const currentDate = new Date();

  currentDate.setFullYear(year, monthGap, daysGap);
  currentDate.setHours(hoursGap, minutesGap);

  return new Date(currentDate);
};

const generateCommentEmoji = () => {

  const commentEmoji = [
    `angry.png`,
    `puke.png`,
    `sleeping.png`,
    `smile.png`
  ];
  const randomIndex = getRandomInteger(0, commentEmoji.length - 1);

  return commentEmoji[randomIndex];
};

const generateCommentAuthor = () => {

  const commentAuthors = [
    `Tim Macoveev`,
    `John Doe`
  ];
  const randomIndex = getRandomInteger(0, commentAuthors.length - 1);

  return commentAuthors[randomIndex];
};

const generateCommentText = () => {

  const commentText = [
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`
  ];
  const randomIndex = getRandomInteger(0, commentText.length - 1);

  return commentText[randomIndex];
};

const generateComment = () => {
  const commentsQuantity = getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);
  let comments = [];

  for (let i = 0; i < commentsQuantity; i++) {
    const commentDate = generateCommentDate();
    const img = generateCommentEmoji();
    const alt = img.replace(`.png`, ``);

    let comment = {
      author: generateCommentAuthor(),
      date: humanizeDate(commentDate),
      text: generateCommentText(),
      emoji: `./images/emoji/` + img,
      alt
    };

    comments.push(comment);
  }

  return comments;
};

export const generateFilmCard = () => {
  const comments = generateComment();
  const info = generateInfo();
  const commentsQuantity = comments.length;

  return {
    name: info.name,
    image: `./images/posters/` + info.image,
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
    commentsQuantity,
    comments
  };
};
