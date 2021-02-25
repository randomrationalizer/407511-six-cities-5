import React from "react";
import renderer from "react-test-renderer";
import {SortSection} from "./sort-section";
import {noop} from "../../../mocks/util";
import {SortType} from "../../../const";


describe(`SortSection component renders correctly`, () => {
  it(`with opened class`, () => {
    const tree = renderer
      .create(
          <SortSection
            currentSort={SortType.DEFAULT}
            onSortChange={noop}
            isActive={true}
            onActiveChange={noop}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with closed class`, () => {
    const tree = renderer
      .create(
          <SortSection
            currentSort={SortType.DEFAULT}
            onSortChange={noop}
            isActive={false}
            onActiveChange={noop}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
