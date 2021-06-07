import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form";
import {noop} from "../../../mocks/util";


test(`Should ReviewForm component renders correctly`, () => {
  const tree = renderer
    .create(
        <ReviewForm
          onFormSubmit={noop}
          id={1}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
