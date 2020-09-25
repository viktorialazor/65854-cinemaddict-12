import {generateProfileRating} from "../utils/film-card.js";
import AbstractView from "./abstract.js";

const createUserProfileTemplate = (cards) => {
  const profileRating = generateProfileRating(cards);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfileView extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createUserProfileTemplate(this._cards);
  }
}
