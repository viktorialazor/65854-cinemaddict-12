import {FILM_COUNT, RenderPosition} from "./const.js";
import UserProfileView from "./view/user-profile.js";
import StatisticsView from "./view/statistics.js";
import FilmsBoardPresenter from "./presenter/films-board.js";
import FilterPresenter from "./presenter/filter.js";
import CardsModel from "./model/cards.js";
import FilterModel from "./model/filter.js";
import {generateFilmCard} from "./mock/film-card.js";
import {render} from "./utils/render.js";

const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);

const cardsModel = new CardsModel();
cardsModel.setCards(cards);

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new UserProfileView(cards), RenderPosition.BEFOREEND);

const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement, cardsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, cardsModel);
filterPresenter.init();
filmsBoardPresenter.init();

render(siteFooterStatisticsElement, new StatisticsView(cards), RenderPosition.BEFOREEND);
