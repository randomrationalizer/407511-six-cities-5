import React, {useCallback} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import PropTypes from "prop-types";
import {reviewsPropTypes} from "../review.prop";
import ReviewsList from "../reviews-list/reviews-list";
import ReviewForm from "../review-form/review-form";
import withErrorMessage from "../../../hocs/with-error-message/with-error-message";
import {postNewReview} from "../../../store/api-actions";
import {getOfferReviews} from "../../../store/current-offer/selectors";
import {getAuthorizationStatus} from "../../../store/user/selectors";
import {AuthorizationStatus} from "../../../const";


const ReviewsSection = (props) => {
  const {id, reviews, onFormSubmit, authorizationStatus, showErrorMessage} = props;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const isAnyReviews = reviews.length ? true : false;

  const handleReviewAdd = useCallback((offerId, newReview) => {
    onFormSubmit(offerId, newReview)
      .catch((error) => showErrorMessage(error.message));
  }, []);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>

      {isAnyReviews &&
        <ReviewsList reviews={reviews}/>
      }

      {isAuthorized &&
        <ReviewForm
          key={`${id}-${reviews.length}`}
          onFormSubmit={handleReviewAdd}
          id={id}
        />
      }
    </section>
  );
};

ReviewsSection.propTypes = {
  id: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(reviewsPropTypes),
  onFormSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  showErrorMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  reviews: getOfferReviews(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(id, review) {
    return dispatch(postNewReview(id, review));
  }
});

export {ReviewsSection};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withErrorMessage
)(ReviewsSection);
