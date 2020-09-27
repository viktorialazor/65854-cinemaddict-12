import {UpdateType, AUTHORIZATION, END_POINT} from "./const.js";
import FilmsBoardPresenter from "./presenter/films-board.js";
import FilterPresenter from "./presenter/filter.js";
import CardsModel from "./model/cards.js";
import FilterModel from "./model/filter.js";
import Api from "./api.js";

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

const api = new Api(END_POINT, AUTHORIZATION);

const cardsModel = new CardsModel();
const filterModel = new FilterModel();
const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement, cardsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, cardsModel);

filterPresenter.init();
filmsBoardPresenter.init();

api.getCards()
.then((movies) => {
  const getCommentsRequests = [];

  movies.map((movie) => {
    getCommentsRequests.push(api.getComments(movie.id));
  });

  Promise.all(getCommentsRequests)
  .then((filmsComments) => {
    movies.map((movie, index) => {
      movie.comments = filmsComments[index];
    });
    cardsModel.setCards(UpdateType.INIT, movies);
  })
  .catch(() => {
    movies.map((movie) => {
      movie.comments = [];
    });
    cardsModel.setCards(UpdateType.INIT, movies);
  });
})
.catch(() => {
  cardsModel.setCards(UpdateType.INIT, []);
});
