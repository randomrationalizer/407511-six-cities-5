import React from "react";
import renderer from "react-test-renderer";
import ErrorMessage from "./error-message";
import {noop} from "../../mocks/util";


it(`Should error message component renders correctly`, () => {
  const tree = renderer
    .create(
        <ErrorMessage
          message={`Error`}
          onClose={noop}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

