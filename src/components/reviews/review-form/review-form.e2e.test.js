import React from "react";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import ReviewForm from "./review-form";
import store from "../../../mocks/test-data/store";
import mockReviews from "../../../mocks/test-data/reviews";
import {getMockStore, noop} from "../../../mocks/util";


const review = mockReviews[1];
const mockStore = getMockStore(store);


describe(`ReviewForm component e2e testing`, () => {
  it(`should form be submitted and callback has been called with correct data`, () => {
    const handleFormSubmit = jest.fn();
    const wrapper = mount(
        <Provider store={mockStore}>
          <ReviewForm
            onReviewFormSubmit={handleFormSubmit}
            onFieldChange={noop}
            review={review}
            id={1}
            isValid={true}
          />
        </Provider>
    );

    const formSentPrevention = jest.fn();
    const form = wrapper.find(`form`);

    form.simulate(`submit`, {preventDefault: formSentPrevention});
    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });

  it(`should review field value changed and callback has been called`, () => {
    const handleFieldChange = jest.fn();
    const wrapper = mount(
        <Provider store={mockStore}>
          <ReviewForm
            onReviewFormSubmit={noop}
            onFieldChange={handleFieldChange}
            review={review}
            id={1}
            isValid={false}
          />
        </Provider>
    );

    const reviewInput = wrapper.find(`.reviews__textarea`);

    reviewInput.simulate(`change`, {target: {value: `mock`}});
    expect(handleFieldChange).toHaveBeenCalledTimes(1);
  });

  it(`should rating value changed and callback has been called`, () => {
    const handleFieldChange = jest.fn();
    const wrapper = mount(
        <Provider store={mockStore}>
          <ReviewForm
            onReviewFormSubmit={noop}
            onFieldChange={handleFieldChange}
            review={review}
            id={1}
            isValid={false}
          />
        </Provider>
    );

    const rating = wrapper.find(`.form__rating-input`).at(4);
    rating.simulate(`change`, {target: {cheked: `true`}});
    expect(handleFieldChange).toHaveBeenCalledTimes(1);
  });
});
