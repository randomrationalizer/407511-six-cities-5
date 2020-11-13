import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {sortByDate} from "../../offer/util";
import ReviewForm from "../review-form/review-form";
import Review from "../review/review";


class ReviewsSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.reviews !== prevProps.reviews) {
      this.setState({
        reviews: this.props.reviews
      });
    }
  }

  render() {
    const isAnyReviews = this.state.reviews.length !== 0 ? true : false;

    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">
          Reviews &middot; <span className="reviews__amount">{this.state.reviews.length}</span>
        </h2>
        {isAnyReviews && <ul className="reviews__list">
          {this.state.reviews.sort(sortByDate).map((review) =>
            <Review
              key={`${review.author}-${review.text}`}
              review={review}
            />
          )}
        </ul>}
        <ReviewForm
          onFormSubmit={(newReview) => {
            this.setState((prevState) => ({
              reviews: [...prevState.reviews, newReview]
            }));
          }}
        />
      </section>
    );
  }
}

ReviewsSection.propTypes = {
  reviews: PropTypes.array
};

export default ReviewsSection;
