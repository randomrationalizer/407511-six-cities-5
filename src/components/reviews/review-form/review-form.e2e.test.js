import React from "react";
import {mount} from "enzyme";
import ReviewForm from "./review-form";


describe(`ReviewForm component e2e testing`, () => {
  it(`should form be submitted and callback has been called with correct data`, () => {
    const handleFormSubmit = jest.fn();
    const wrapper = mount(
        <ReviewForm
          onFormSubmit={handleFormSubmit}
          id={1}
        />
    );

    const formSentPrevention = jest.fn();
    const form = wrapper.find(`form`);
    const reviewInput = wrapper.find(`.reviews__textarea`);
    const rating = wrapper.find(`.form__rating-input`).at(4);

    reviewInput.simulate(`change`, {target: {value: `mock`}});
    rating.simulate(`change`, {target: {cheked: `true`}});

    form.simulate(`submit`, {preventDefault: formSentPrevention});
    expect(handleFormSubmit).toHaveBeenCalledTimes(0);
  });

  it(`should form be submitted and callback hasn't been called with incorrect data`, () => {
    const handleFormSubmit = jest.fn();
    const wrapper = mount(
        <ReviewForm
          onFormSubmit={handleFormSubmit}
          id={1}
        />
    );

    const formSentPrevention = jest.fn();
    const form = wrapper.find(`form`);

    form.simulate(`submit`, {preventDefault: formSentPrevention});
    expect(handleFormSubmit).toHaveBeenCalledTimes(0);
  });
});
