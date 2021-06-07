import React, {useState} from "react";
import PropTypes from "prop-types";
import {checkCommentValidity, checkRatingValidity} from "../util";
import {extend} from "../../../utils/common";

const RatingValueToTitle = {
  "1": `terribly`,
  "2": `badly`,
  "3": `not bad`,
  "4": `good`,
  "5": `perfect`
};


const ReviewForm = ({onFormSubmit, id}) => {
  const [review, setReview] = useState({
    value: ``,
    isValid: false
  });
  const [rating, setRating] = useState({
    value: 0,
    isValid: false
  });

  const handleFormFieldChange = (evt) => {
    const {name, value} = evt.target;

    switch (name) {
      case `review`:
        setReview(extend(review, {
          value,
          isValid: checkCommentValidity(value)
        }));
        break;
      case `rating`:
        setRating(extend(rating, {
          value,
          isValid: checkRatingValidity(value)
        }));
        break;
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (rating.isValid && review.isValid) {
      onFormSubmit(id, {
        comment: review.value,
        rating: Number(rating.value)
      });
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(RatingValueToTitle).sort((a, b) => b[0] - a[0]).map(([value, title]) =>
          <React.Fragment key={value}>
            <input
              onChange={handleFormFieldChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating.value === value ? true : false}
              required
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        )}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormFieldChange}
        value={review.value}
        minLength={50}
        maxLength={300}
        required
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!(rating.isValid && review.isValid)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default ReviewForm;
