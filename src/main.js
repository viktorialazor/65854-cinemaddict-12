import {UpdateType} from "./const.js";
import FilmsBoardPresenter from "./presenter/films-board.js";
import FilterPresenter from "./presenter/filter.js";
import CardsModel from "./model/cards.js";
import FilterModel from "./model/filter.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic gtz8S752fDN7G3Ua`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict/`;

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

const api = new Api(END_POINT, AUTHORIZATION);

const cardsModel = new CardsModel();
const filterModel = new FilterModel();
const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement, cardsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, cardsModel);

filterPresenter.init();
filmsBoardPresenter.init();

api.getCards().then((movies) => {
  movies.map((movie) => {
    api.getComments(movie.id).then((filmComments) => {
      movie.comments = filmComments.slice();
    })
    .catch(() => {
      movie.comments = [];
    });
  });
  // console.log(`movies`, movies);
  cardsModel.setCards(UpdateType.INIT, movies);
})
.catch(() => {
  cardsModel.setCards(UpdateType.INIT, []);
});
