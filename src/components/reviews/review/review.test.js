import React from "react";
import renderer from "react-test-renderer";
import Review from "./review";
import mockReviews from "../../../mocks/test-data/reviews";


const review = mockReviews[1];


test(`Should Review component renders correctly`, () => {
  const tree = renderer
    .create(
        <Review
          review={review}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

