import {COMMENTS_MIN, COMMENTS_MAX} from "../const.js";
import {getRandomInteger, humanizeDate} from "../utils.js";

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

export const generateComments = () => {
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
      emoji: `./images/emoji/${img}`,
      alt
    };

    comments.push(comment);
  }

  return comments;
};
