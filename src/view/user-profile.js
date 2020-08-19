import {generateProfileRating} from "../mock/user-profile.js";

export const createUserProfileTemplate = (cards) => {
  const profileRating = generateProfileRating(cards);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
