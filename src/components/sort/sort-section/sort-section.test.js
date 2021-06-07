import React from "react";
import renderer from "react-test-renderer";
import {SortSection} from "./sort-section";
import {noop} from "../../../mocks/util";
import {SortType} from "../../../const";


test(`SortSection component renders correctly`, () => {
  const tree = renderer
    .create(
        <SortSection
          currentSort={SortType.DEFAULT}
          onSortChange={noop}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
