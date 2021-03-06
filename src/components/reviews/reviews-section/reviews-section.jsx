import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reviewsPropTypes} from "../review.prop";
import ReviewForm from "../review-form/review-form";
import Review from "../review/review";
import withReviewForm from "../../../hocs/with-review-form/with-review-form";
import {postNewReview} from "../../../store/api-actions";
import {getOfferReviews, getAuthorizationStatus} from "../../../store/selectors";
import {setErrorMessage} from "../../../store/action";
import {sortByDate} from "../../offer/util";
import {AuthorizationStatus} from "../../../const";

const ReviewFormWrapped = withReviewForm(ReviewForm);


const ReviewsSection = (props) => {
  const {id, offerReviews, onFormSubmit, authorizationStatus, setError} = props;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const isAnyReviews = offerReviews.length ? true : false;

  const handleReviewAdd = (offerId, newReview) => {
    onFormSubmit(offerId, newReview)
      .catch((err) => setError(err));
  };

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span>
      </h2>
      {isAnyReviews && <ul className="reviews__list">
        {offerReviews.sort(sortByDate).map((review) =>
          <Review
            key={`${review.user.name}-${review.comment}`}
            review={review}
          />
        )}
      </ul>}

      {isAuthorized &&
        <ReviewFormWrapped
          key={`${id}-${offerReviews.length}`}
          onFormSubmit={handleReviewAdd}
          id={id}
        />
      }
    </section>
  );
};

ReviewsSection.propTypes = {
  id: PropTypes.number.isRequired,
  offerReviews: PropTypes.arrayOf(reviewsPropTypes),
  onFormSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offerReviews: getOfferReviews(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(id, review) {
    return dispatch(postNewReview(id, review));
  },
  setError(err) {
    dispatch(setErrorMessage(err.message));
  }
});

export {ReviewsSection};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsSection);
