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

export const humanizeDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {year: `numeric`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`});
};

export const isFilmInFilter = () => {
  const isFilter = Boolean(getRandomInteger(0, 1));

  if (isFilter) {
    return `film-card__controls-item--active`;
  } else {
    return ``;
  }
};
