export const createFilmInfoTemplate = (card) => {
  const {name, image, rating, director, writers, actors, releaseDate, country, duration, age, genre, description} = card[0];

  const getFilmGenre = () => {
    let filmGenre = ``;

    genre.forEach((item) => {
      filmGenre += `<span class="film-details__genre">` + item + `</span>`;
    });

    return filmGenre;
  };

  const genres = getFilmGenre();

  return `<div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${image}" alt="">
              <p class="film-details__age">${age}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${name}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${genres}</tr>
              </table>
              <p class="film-details__film-description">${description}</p>
            </div>
          </div>`;
};
