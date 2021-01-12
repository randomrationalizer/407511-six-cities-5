import React from "react";
import PropTypes from "prop-types";
import {withErrorMessage} from "../../../hocs/with-error-message/with-error-message";

const RatingValueToTitle = {
  "1": `terribly`,
  "2": `badly`,
  "3": `not bad`,
  "4": `good`,
  "5": `perfect`
};


const ReviewForm = (props) => {
  const {onReviewFormSubmit, onFieldChange, review, isValid} = props;
  const submitBtnRef = React.createRef();

  const handleFormFieldChange = (evt) => {
    const {name, value} = evt.target;
    onFieldChange(name, value);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (isValid) {
      onReviewFormSubmit();
      submitBtnRef.current.disabled = false;
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
              checked={review.rating === value ? true : ``}
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
        value={review.comment}
        minLength={50}
        maxLength={300}
        required
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          ref={submitBtnRef}
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isValid ? false : true}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  onReviewFormSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  isValid: PropTypes.bool.isRequired
};

export default withErrorMessage(ReviewForm);
