import React from "react";
import PropTypes from "prop-types";

const RatingValueToTitle = {
  "1": `terribly`,
  "2": `badly`,
  "3": `not bad`,
  "4": `good`,
  "5": `perfect`
};


const ReviewForm = (props) => {
  const {onReviewFormSubmit, onFieldChange, comment} = props;

  const handleFormFieldChange = (evt) => {
    const {name, value} = evt.target;
    onFieldChange(name, value);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onReviewFormSubmit();
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
              checked={comment.rating === value ? true : ``}
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
        value={comment.text}
        required
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  onReviewFormSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default ReviewForm;
