import React from "react";
import renderer from "react-test-renderer";
import SortItem from "./sort-item";
import {noop} from "../../../mocks/util";
import {SortType} from "../../../const";


describe(`SortItem component renders correctly`, () => {
  it(`with active state`, () => {
    const tree = renderer
      .create(
          <SortItem
            isActive={true}
            sortType={SortType.DEFAULT}
            onSortItemClick={noop}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`without active state`, () => {
    const tree = renderer
      .create(
          <SortItem
            isActive={false}
            sortType={SortType.DEFAULT}
            onSortItemClick={noop}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
