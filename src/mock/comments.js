import {YEAR, MAX_MONTH_GAP, MAX_DAYS_GAP, MAX_HOURS_GAP, MAX_MINUTES_GAP, COMMENT_EMOJI, COMMENT_AUTHORS, COMMENT_TEXT, COMMENTS_MIN, COMMENTS_MAX} from "../const.js";
import {getRandomInteger} from "../utils/common.js";
import {humanizeDate} from "../utils/film-card.js";

const generateCommentDate = () => {
  const monthGap = getRandomInteger(-MAX_MONTH_GAP, MAX_MONTH_GAP);
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const hoursGap = getRandomInteger(-MAX_HOURS_GAP, MAX_HOURS_GAP);
  const minutesGap = getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP);
  const currentDate = new Date();

  currentDate.setFullYear(YEAR, monthGap, daysGap);
  currentDate.setHours(hoursGap, minutesGap);

  return new Date(currentDate);
};

const generateCommentEmoji = () => {
  const randomIndex = getRandomInteger(0, COMMENT_EMOJI.length - 1);

  return COMMENT_EMOJI[randomIndex];
};

const generateCommentAuthor = () => {
  const randomIndex = getRandomInteger(0, COMMENT_AUTHORS.length - 1);

  return COMMENT_AUTHORS[randomIndex];
};

const generateCommentText = () => {
  const randomIndex = getRandomInteger(0, COMMENT_TEXT.length - 1);

  return COMMENT_TEXT[randomIndex];
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
