import React from "react";
import {reviewsPropTypes} from "../review.prop";
import {formatDate, humanizeDate} from "../../offer/util";
import {getRatingInPercent} from "../../offer/util";


const Review = ({review}) => {
  const {comment, date, rating, user} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={formatDate(date)}>{humanizeDate(date)}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: reviewsPropTypes.isRequired
};

export default Review;
