import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import ReviewForm from "./review-form";
import store from "../../../mocks/test-data/store";
import mockReviews from "../../../mocks/test-data/reviews";
import {getMockStore, noop} from "../../../mocks/util";


const review = mockReviews[1];
const mockStore = getMockStore(store);


describe(`Should ReviewForm component renders correctly`, () => {
  it(`when review is valid`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <ReviewForm
              onReviewFormSubmit={noop}
              onFieldChange={noop}
              review={review}
              id={1}
              isValid={true}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when review is invalid`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <ReviewForm
              onReviewFormSubmit={noop}
              onFieldChange={noop}
              review={{}}
              id={1}
              isValid={false}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
