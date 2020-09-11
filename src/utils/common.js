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

export const updateCard = (cards, cardUpdate) => {
  const index = cards.findIndex((card) => card.id === cardUpdate.id);

  if (index === -1) {
    return cards;
  }

  return [
    ...cards.slice(0, index),
    cardUpdate,
    ...cards.slice(index + 1)
  ];
};