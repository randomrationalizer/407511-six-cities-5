import React from "react";
import renderer from "react-test-renderer";
import SortList from "./sort-list";
import {noop} from "../../../mocks/util";
import {SortType} from "../../../const";


describe(`SortList component renders correctly`, () => {
  it(`with opened class`, () => {
    const tree = renderer
      .create(
          <SortList
            isOpened={true}
            currentSort={SortType.DEFAULT}
            onSortItemClick={noop}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with closed class`, () => {
    const tree = renderer
      .create(
          <SortList
            isOpened={false}
            currentSort={SortType.DEFAULT}
            onSortItemClick={noop}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
