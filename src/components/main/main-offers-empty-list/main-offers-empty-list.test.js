import React from "react";
import renderer from "react-test-renderer";
import MainOffersEmptyList from "./main-offers-empty-list";
import {DEFAULT_CITY} from "../../../const";


it(`Should MainOffersEmptyList component renders correctly`, () => {
  const tree = renderer
    .create(
        <MainOffersEmptyList
          city={DEFAULT_CITY}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
