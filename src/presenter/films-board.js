import {CARD_COUNT_PER_STEP, FILM_EXTRA_COUNT, RENDER_POSITION} from "../const.js";
import {getTopCards, getMostCommentedCards} from "../utils/card.js";
import {render, remove} from "../utils/render.js";
import SortView from "../view/sort.js";
import FilmsBoardView from "../view/films-board.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import FilmsListTitleView from "../view/films-list-title.js";
import FilmCardView from "../view/film-card.js";
import FilmsListExtraView from "../view/films-list-extra.js";
import FilmDetailsView from "../view/film-details.js";
import NoFilmCardsView from "../view/no-film-card.js";

export default class FilmsBoardPresenter {
  constructor(filmsBoardContainer) {
    this._filmsBoardContainer = filmsBoardContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;

    this._sortViewComponent = new SortView();
    this._filmsBoardComponent = new FilmsBoardView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsListTitleComponent = new FilmsListTitleView();
    this._noFilmCardsComponent = new NoFilmCardsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(cardsFilm, commentsFilms) {
    this._cardsFilm = cardsFilm.slice();
    this._commentsFilms = commentsFilms.slice();

    this._renderSort();

    render(this._filmsBoardContainer, this._filmsBoardComponent, RENDER_POSITION.BEFOREEND);
    render(this._filmsBoardComponent, this._filmsListComponent, RENDER_POSITION.BEFOREEND);

    this._renderFilmsBoard();
  }

  _renderSort() {
    render(this._filmsBoardContainer, this._sortViewComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderCard(position, card, commentsFilm) {
    const cardComponent = new FilmCardView(card, commentsFilm);
    const cardDetailsComponent = new FilmDetailsView(card, commentsFilm);

    const clickCloseButton = () => {
      this._filmsBoardContainer.removeChild(cardDetailsComponent.getElement());
      cardDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        this._filmsBoardContainer.removeChild(cardDetailsComponent.getElement());
        cardDetailsComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    cardComponent.setDetailsClickHandler(() => {
      this._filmsBoardContainer.appendChild(cardDetailsComponent.getElement());
      cardDetailsComponent.setCloseClickHandler(clickCloseButton);
      document.addEventListener(`keydown`, onEscKeyDown);
    }, `.film-card__poster`);

    cardComponent.setDetailsClickHandler(() => {
      this._filmsBoardContainer.appendChild(cardDetailsComponent.getElement());
      cardDetailsComponent.setCloseClickHandler(clickCloseButton);
      document.addEventListener(`keydown`, onEscKeyDown);
    }, `.film-card__title`);

    cardComponent.setDetailsClickHandler(() => {
      this._filmsBoardContainer.appendChild(cardDetailsComponent.getElement());
      cardDetailsComponent.setCloseClickHandler(clickCloseButton);
      document.addEventListener(`keydown`, onEscKeyDown);
    }, `.film-card__comments`);

    render(position, cardComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderCards(from, to, position, isButton) {
    let indexStep = 0;

    if (isButton === `isButton`) {
      indexStep = from;
    }

    this._cardsFilm
      .slice(from, to)
      .forEach((card, index) => this._renderCard(position, card, this._commentsFilms[index + indexStep]));
  }

  _renderTopRated(position) {
    const [cardsTop, cardsComments] = getTopCards(this._cardsFilm, this._commentsFilms);

    // for (let i = 0; i < Math.min(this._cardsFilm.length, FILM_EXTRA_COUNT); i++) {
    //   this._renderCard(position, cardsTop[i], cardsComments[i]);
    // }

    [cardsTop, cardsComments]
      .slice()
      .forEach((item, index) => {
        // Поставила   условие "if", потому  что  если карточка  т олько одна, что  карточка  пытается   отрисоваться  два раза и второй раз у нее значения underfind и выводится  ошибка
        // Я думаю, что  вариант , который  я написала неправильный, потому  что  если нам нужно будет  отривать   больше двух карточек  в блоках "Top rated" и "Most commented", то  все равно отрисуется  только  две
        if (cardsTop[index]) {
          this._renderCard(position, cardsTop[index], cardsComments[index]);
        }
      });
  }

  _renderMostCommented(position) {
    const [cardsFilms, cardsComments] = getMostCommentedCards(this._cardsFilm, this._commentsFilms);

    // for (let i = 0; i < Math.min(this._cardsFilm.length, FILM_EXTRA_COUNT); i++) {
    //   this._renderCard(position, cardsFilms[i], cardsComments[i]);
    // }

    [cardsFilms, cardsComments]
      .slice()
      .forEach((item, index) => {
        if (cardsFilms[index]) {
          this._renderCard(position, cardsFilms[index], cardsComments[index]);
        }
      });
  }

  _renderFilmsExtra() {
    for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
      render(this._filmsBoardComponent, new FilmsListExtraView(), RENDER_POSITION.BEFOREEND);
    }

    const filmsExtraElements = document.querySelectorAll(`.films-list--extra`);
    const filmsTopRatedTitleElement = filmsExtraElements[0].querySelector(`.films-list__title`);
    const filmsMostCommentedTitleElement = filmsExtraElements[1].querySelector(`.films-list__title`);
    const filmsTopRatedContainerElement = filmsExtraElements[0].querySelector(`.films-list__container`);
    const filmsMostCommentedContainerElement = filmsExtraElements[1].querySelector(`.films-list__container`);

    filmsTopRatedTitleElement.textContent = `Top rated`;
    filmsMostCommentedTitleElement.textContent = `Most commented`;

    this._renderTopRated(filmsTopRatedContainerElement);
    this._renderMostCommented(filmsMostCommentedContainerElement);
  }

  _renderNoCards() {
    render(this._filmsListComponent, this._noFilmCardsComponent, RENDER_POSITION.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedCardCount, this._renderedCardCount + CARD_COUNT_PER_STEP, this._filmsListContainerComponent, `isButton`);

    this._renderedCardCount += CARD_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._cardsFilm.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RENDER_POSITION.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsBoard() {
    if (this._cardsFilm.length === 0) {
      this._renderNoCards();
      return;
    }

    render(this._filmsListComponent, this._filmsListTitleComponent, RENDER_POSITION.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RENDER_POSITION.BEFOREEND);

    this._renderCards(0, Math.min(this._cardsFilm.length, CARD_COUNT_PER_STEP), this._filmsListContainerComponent, `noButton`);

    this._renderFilmsExtra();

    if (this._cardsFilm.length > CARD_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }
}
