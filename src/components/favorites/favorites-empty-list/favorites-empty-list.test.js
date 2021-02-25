import React from "react";
import renderer from "react-test-renderer";
import FavoritesEmptyList from "./favorites-empty-list";


it(`Should FavoritesEmptyList component renders correctly`, () => {
  const tree = renderer
    .create(
        <FavoritesEmptyList />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

