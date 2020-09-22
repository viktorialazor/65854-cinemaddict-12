// import he from "he";

export const createFilmCommentsTemplate = () => { /* data */

  // const {comments} = data;
  let filmComments = ``;

  // console.log(`data`, data);
  // if (comments.length >= 1) {
  //   comments.forEach((comment) => {
  //     filmComments += `<li class="film-details__comment">
  //       <span class="film-details__comment-emoji">
  //         <img src="` + comment.emoji + `" width="55" height="55" alt="emoji-` + comment.alt + `">
  //       </span>
  //       <div>
  //         <p class="film-details__comment-text">` + he.encode(comment.text) + `</p>
  //         <p class="film-details__comment-info">
  //           <span class="film-details__comment-author">` + comment.author + `</span>
  //           <span class="film-details__comment-day">` + comment.date + `</span>
  //           <button class="film-details__comment-delete" data-comment-id="${comment.id}">Delete</button>
  //         </p>
  //       </div>
  //     </li>`;
  //   });
  // }

  return filmComments;
};
