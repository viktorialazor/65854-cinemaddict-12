import {createUserProfileTemplate} from "./view/user-profile.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsBoardTemplate} from "./view/films-board.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";

const FILM_COUNT = 5;
const FILM_LIST_COUNT = 2;
const FILM_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserProfileTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsContainerElement, createFilmCardTemplate(), `beforeend`);
}

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

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

for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  render(filmsTopRatedContainerElement, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  render(filmsMostCommentedContainerElement, createFilmCardTemplate(), `beforeend`);
}

render(siteFooterStatisticsElement, createStatisticsTemplate(), `beforeend`);
render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
