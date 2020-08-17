export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (a = 1, b = 10) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  let number = (lower + Math.random() * (upper - lower + 1)).toFixed(1);

  if (number > 10) {
    number = Math.floor(number);
  }

  return number;
};

export const humanizeDate = (dueDate) => {
  return dueDate.toLocaleString(`en-ZA`, {year: `numeric`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`});
};

export const isFilmInFilter = () => {
  const isFilter = Boolean(getRandomInteger(0, 1));

  if(isFilter) {
    return [`film-card__controls-item--active`, true];
  } else {
    return [``, false];
  }
};
