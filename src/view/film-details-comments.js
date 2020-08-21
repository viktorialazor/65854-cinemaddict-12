export const createFilmCommentsTemplate = (comments) => {

  let filmComments = ``;

  if (comments.length >= 1) {
    for (let i = 0; i < comments.length; i++) {
      filmComments += `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="` + comments[i].emoji + `" width="55" height="55" alt="emoji-` + comments[i].alt + `">
              </span>
              <div>
                <p class="film-details__comment-text">` + comments[i].text + `</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">` + comments[i].author + `</span>
                  <span class="film-details__comment-day">` + comments[i].date + `</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`;
    }
  }

  return filmComments;
};
