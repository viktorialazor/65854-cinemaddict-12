import {FILM_COUNT, RENDER_POSITION} from "./const.js";
import UserProfileView from "./view/user-profile.js";
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import FilmsBoardPresenter from "./presenter/films-board.js";
import {generateFilmCard} from "./mock/film-card.js";
import {generateComments} from "./mock/comments.js";
import {render} from "./utils/render.js";


const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);
const comments = new Array(FILM_COUNT).fill().map(generateComments);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement);

render(siteHeaderElement, new UserProfileView(cards), RENDER_POSITION.BEFOREEND);
render(siteMainElement, new SiteMenuView(cards), RENDER_POSITION.BEFOREEND);

filmsBoardPresenter.init(cards, comments);

render(siteFooterStatisticsElement, new StatisticsView(cards), RENDER_POSITION.BEFOREEND);
