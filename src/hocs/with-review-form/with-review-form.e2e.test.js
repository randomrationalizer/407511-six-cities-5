import React from "react";
import {shallow} from "enzyme";
import withReviewForm from "./with-review-form";
import {noop} from "../../mocks/util";
import mockReviews from "../../mocks/test-data/reviews";


const MockComponent = () => <div></div>;
const MockComponentWrapped = withReviewForm(MockComponent);
const review = mockReviews[1];

test(`Should withReviewForm changes review data passed to the wrapped component props`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        onFormSubmit={noop}
        id={review.id}
      >
      </MockComponentWrapped>
  );

  expect(wrapper.props().review).toEqual({comment: ``, rating: 0});
  expect(wrapper.props().isValid).toEqual(false);

  wrapper.props().onFieldChange(`review`, review.comment);
  expect(wrapper.props().review).toEqual({comment: review.comment, rating: 0});
  expect(wrapper.props().isValid).toEqual(false);

  wrapper.props().onFieldChange(`rating`, review.rating);
  expect(wrapper.props().review).toEqual({comment: review.comment, rating: review.rating});
  expect(wrapper.props().isValid).toEqual(true);
});
