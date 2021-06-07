import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {reviewsPropTypes} from "../review.prop";
import Review from "../review/review";
import {sortByDate} from "../../offer/util";


const ReviewsList = ({reviews}) => {
  return (
    <Fragment>
      <ul className="reviews__list">
        {[...reviews].sort(sortByDate).map((review, i) =>
          <Review
            key={`${review.user.name}-${review.comment}-${review.date}-${i}`}
            review={review}
          />
        )}
      </ul>
    </Fragment>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewsPropTypes),
};

export default React.memo(ReviewsList);
