import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reviewsPropTypes} from "../review.prop";
import {sortByDate} from "../../offer/util";
import ReviewForm from "../review-form/review-form";
import Review from "../review/review";
import {postNewReview} from "../../../store/api-actions";
import {getOfferReviews, getAuthorizationStatus} from "../../../store/selectors";
import withReviewForm from "../../../hocs/with-review-form/with-review-form";
import {AuthorizationStatus} from "../../../const";

const ReviewFormWrapped = withReviewForm(ReviewForm);


const ReviewsSection = (props) => {
  const {id, offerReviews, onFormSubmit, authorizationStatus} = props;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
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
            key={`${review.user.name}-${review.comment}`}
            review={review}
          />
        )}
      </ul>}

      {isAuthorized ?
        <ReviewFormWrapped
          key={`${id}-${offerReviews.length}`}
          onFormSubmit={handleReviewAdd}
          id={id}
        />
        :
        ``
      }
    </section>
  );
};

ReviewsSection.propTypes = {
  id: PropTypes.number.isRequired,
  offerReviews: PropTypes.arrayOf(reviewsPropTypes),
  onFormSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  offerReviews: getOfferReviews(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(id, review) {
    dispatch(postNewReview(id, review));
  }
});

export {ReviewsSection};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsSection);
