import Observer from "../utils/observer.js";
import {formatReleaseDate, formatFilmDuration, formatCommentDate} from "../utils/film-card.js";

export default class Cards extends Observer {
  constructor() {
    super();
    this._cards = [];
  }

  setCards(updateType, cards) {
    this._cards = cards.slice();

    this._notify(updateType);
  }

  getCards() {
    return this._cards;
  }

  updateCard(updateType, update) {
    const index = this._cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting card`);
    }

    this._cards = [
      ...this._cards.slice(0, index),
      update,
      ...this._cards.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptCardToClient(movie) {
    const adaptedCard = Object.assign(
        {},
        movie,
        {
          actors: movie.film_info.actors,
          age: movie.film_info.age_rating,
          name: movie.film_info.alternative_title,
          description: movie.film_info.description,
          director: movie.film_info.director,
          genre: movie.film_info.genre,
          image: movie.film_info.poster,
          releaseDate: movie.film_info.release.date !== null ? formatReleaseDate(new Date(movie.film_info.release.date)) : null,
          country: movie.film_info.release.release_country,
          duration: movie.film_info.runtime !== null ? formatFilmDuration(movie.film_info.runtime) : movie.film_info.runtime(0),
          title: movie.film_info.title,
          rating: movie.film_info.total_rating,
          writers: movie.film_info.writers,
          isInWatchlist: movie.user_details.watchlist,
          isWatched: movie.user_details.already_watched,
          watchingDate: movie.user_details.watching_date !== null ? new Date(movie.user_details.watching_date) : null,
          isFavorite: movie.user_details.favorite,
        }
    );

    delete adaptedCard.film_info.actors;
    delete adaptedCard.film_info.age_rating;
    delete adaptedCard.film_info.alternative_title;
    delete adaptedCard.film_info.description;
    delete adaptedCard.film_info.director;
    delete adaptedCard.film_info.genre;
    delete adaptedCard.film_info.poster;
    delete adaptedCard.film_info.release.release_country;
    delete adaptedCard.film_info.title;
    delete adaptedCard.film_info.total_rating;
    delete adaptedCard.film_info.writers;
    delete adaptedCard.user_details;

    return adaptedCard;
  }

  static adaptCardToServer(movie) {
    let commentsNew = [];

    if (movie.comments[0].id) {
      movie.comments.forEach((comment) => {
        commentsNew.push(comment.id);
      });
    } else {
      commentsNew = movie.comments;
    }

    const adaptedCard = Object.assign(
        {},
        movie,
        {
          "film_info": {
            "actors": movie.actors,
            "age_rating": movie.age,
            "alternative_title": movie.name,
            "description": movie.description,
            "director": movie.director,
            "genre": movie.genre,
            "poster": movie.image,
            "title": movie.title,
            "total_rating": movie.rating,
            "writers": movie.writers,
            "runtime": movie.film_info.runtime,
            "release": {
              "release_country": movie.country,
              "date": movie.film_info.release.date
            },
          },
          "user_details": {
            "watchlist": movie.isInWatchlist,
            "already_watched": movie.isWatched,
            "watching_date": movie.watchingDate instanceof Date ? movie.watchingDate.toISOString() : null,
            "favorite": movie.isFavorite
          },
          "comments": commentsNew
        }
    );

    delete adaptedCard.actors;
    delete adaptedCard.age;
    delete adaptedCard.name;
    delete adaptedCard.description;
    delete adaptedCard.director;
    delete adaptedCard.genre;
    delete adaptedCard.image;
    delete adaptedCard.releaseDate;
    delete adaptedCard.country;
    delete adaptedCard.duration;
    delete adaptedCard.title;
    delete adaptedCard.rating;
    delete adaptedCard.writers;
    delete adaptedCard.isInWatchlist;
    delete adaptedCard.isWatched;
    delete adaptedCard.watchingDate;
    delete adaptedCard.isFavorite;

    return adaptedCard;
  }

  static adaptCommentToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          date: comment.date !== null ? formatCommentDate(new Date(comment.date)) : null,
          commentDate: comment.date,
          text: comment.comment,
          emoji: `./images/emoji/${comment.emotion}.png`,
          alt: comment.emotion,
        }
    );

    delete adaptedComment.comment;
    delete adaptedComment.emotion;

    return adaptedComment;
  }

  static adaptCommentToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          date: comment.commentDate instanceof Date ? comment.commentDate.toISOString() : null,
          comment: comment.text,
          emotion: comment.alt,
        }
    );

    delete adaptedComment.commentDate;
    delete adaptedComment.text;
    delete adaptedComment.alt;

    return adaptedComment;
  }
}
