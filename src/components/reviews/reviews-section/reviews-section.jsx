import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reviewsPropTypes} from "../review.prop";
import {sortByDate} from "../../offer/util";
import ReviewForm from "../review-form/review-form";
import Review from "../review/review";
import {ActionCreator} from "../../../store/action";
import {getPropertyReviews} from "../../../core";
import withReviewForm from "../../../hocs/with-review-form/with-review-form";

const ReviewFormWrapped = withReviewForm(ReviewForm);


const ReviewsSection = (props) => {
  const {id, reviews, onFormSubmit} = props;
  const offerReviews = getPropertyReviews(id, reviews);
  const isAnyReviews = offerReviews.length ? true : false;

  const handleReviewAdd = (offerId, newReview) => {
    onFormSubmit(offerId, newReview);
  };

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span>
      </h2>
      {isAnyReviews && <ul className="reviews__list">
        {offerReviews.sort(sortByDate).map((review) =>
          <Review
            key={`${review.author}-${review.text}`}
            review={review}
          />
        )}
      </ul>}
      <ReviewFormWrapped
        onFormSubmit={handleReviewAdd}
        id={id}
      />
    </section>
  );

};

ReviewsSection.propTypes = {
  id: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(reviewsPropTypes),
  onFormSubmit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  reviews: state.reviews
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(id, review) {
    dispatch(ActionCreator.addReview(id, review));
  }
});

export {ReviewsSection};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsSection);
