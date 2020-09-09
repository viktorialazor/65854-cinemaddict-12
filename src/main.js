import {FILM_COUNT, RenderPosition} from "./const.js";
import UserProfileView from "./view/user-profile.js";
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import FilmsBoardPresenter from "./presenter/films-board.js";
import {generateFilmCard} from "./mock/film-card.js";
import {render} from "./utils/render.js";

const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement);

render(siteHeaderElement, new UserProfileView(cards), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(cards), RenderPosition.BEFOREEND);

filmsBoardPresenter.init(cards);

render(siteFooterStatisticsElement, new StatisticsView(cards), RenderPosition.BEFOREEND);
