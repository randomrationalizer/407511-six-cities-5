import React from "react";
import renderer from "react-test-renderer";
import Preloader from "./preloader";


it(`Should Preloader component renders correctly`, () => {
  const tree = renderer
    .create(
        <Preloader />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
