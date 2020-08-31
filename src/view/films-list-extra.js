import AbstractView from "./abstract.js";

const createFilmsListExtraTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsListExtraView extends AbstractView {
  getTemplate() {
    return createFilmsListExtraTemplate();
  }
}
