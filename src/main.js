import {createUserProfileTemplate} from "./view/user-profile.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsBoardTemplate} from "./view/films-board.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {generateFilmCard} from "./mock/film-card.js";
import {getRandomInteger} from "./utils.js";

const FILM_COUNT = 30;
const CARD_COUNT_PER_STEP = 5;
const FILM_LIST_COUNT = 2;
const FILM_EXTRA_COUNT = 2;

const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);
const cardIndex = getRandomInteger(0, cards.length - 1);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserProfileTemplate(cards), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(cards), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_LIST_COUNT; i++) {
  render(filmsElement, createFilmsListExtraTemplate(), `beforeend`);
}

const filmsExtraElements = siteMainElement.querySelectorAll(`.films-list--extra`);
const filmsTopRatedTitleElement = filmsExtraElements[0].querySelector(`.films-list__title`);
const filmsMostCommentedTitleElement = filmsExtraElements[1].querySelector(`.films-list__title`);
const filmsTopRatedContainerElement = filmsExtraElements[0].querySelector(`.films-list__container`);
const filmsMostCommentedContainerElement = filmsExtraElements[1].querySelector(`.films-list__container`);

filmsTopRatedTitleElement.textContent = `Top rated`;
filmsMostCommentedTitleElement.textContent = `Most commented`;

const getExtraCard = (filmsCards, key) => {
  let number = 0;
  let index = 0;

  if (key === `rating`) {
    for(let i = 0; i < filmsCards.length; i++) {
      if (parseFloat(filmsCards[i].rating) > number) {
        number = parseFloat(filmsCards[i].rating);
        index = i;
      }
    }
  } else {
    for(let i = 0; i < filmsCards.length; i++) {
      if (parseFloat(filmsCards[i].commentsQuantity) > number) {
        number = parseFloat(filmsCards[i].commentsQuantity);
        index = i;
      }
    }
  }

  return [cards[index], index];
};

const getExtraCards = (filmsCards, key) => {
  let extraCards = [];
  let listCards = filmsCards.slice();

  for(let i = 0; i < 2; i++) {
    let extraCard = getExtraCard(listCards, key);
    extraCards.push(extraCard[0]);
    listCards.splice(extraCard[1], 1 , ``);
  }
  return extraCards;
};

const renderTopRated = () => {
  let topRatedFilms = getExtraCards(cards, `rating`);

  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    render(filmsTopRatedContainerElement, createFilmCardTemplate(topRatedFilms[i]), `beforeend`);
  }
};

renderTopRated();

const renderMostCommented = () => {
  let mostCommentedFilms = getExtraCards(cards, `commentsQuantity`);

  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  render(filmsMostCommentedContainerElement, createFilmCardTemplate(mostCommentedFilms[i]), `beforeend`);
}
};

renderMostCommented();

for (let i = 0; i < Math.min(cards.length, CARD_COUNT_PER_STEP); i++) {
  render(filmsContainerElement, createFilmCardTemplate(cards[i]), `beforeend`);
}

if (cards.length > CARD_COUNT_PER_STEP) {
  let renderedCardCount = CARD_COUNT_PER_STEP;

  render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

  const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((card) => render(filmsContainerElement, createFilmCardTemplate(card), `beforeend`));

    renderedCardCount += CARD_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

render(siteFooterStatisticsElement, createStatisticsTemplate(), `beforeend`);
render(siteFooterElement, createFilmDetailsTemplate(cards[cardIndex]), `afterend`);
