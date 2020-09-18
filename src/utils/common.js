import moment from "moment";

export const getRandomInteger = (from = 0, to = 1) => {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (from = 1, to = 10) => {
  const lower = Math.min(from, to);
  const upper = Math.max(from, to);
  let number = (lower + Math.random() * (upper - lower + 1)).toFixed(1);

  if (number >= 10) {
    number = 10;
  }

  return number;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const getDate = () => {
  const currentDate = new Date();

  return moment(currentDate).format(`YYYY/MM/DD hh:mm`);
};
