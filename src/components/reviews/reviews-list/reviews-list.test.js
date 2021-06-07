import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list";
import mockReviews from "../../../mocks/test-data/reviews";


const reviews = mockReviews;


test(`Should Reviews List component renders correctly`, () => {
  const tree = renderer
    .create(
        <ReviewsList
          reviews={reviews}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

