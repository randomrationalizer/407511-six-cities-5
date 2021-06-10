import React from "react";
import {mount} from "enzyme";
import {SortSection} from "./sort-section";
import {SortType} from "../../../const";


describe(`SortSection e2e testing`, () => {
  it(`Should sort menu open button be pressed and menu has been rendered with 'places__options--opened' class`, () => {
    const currentSort = SortType.DEFAULT;
    const handleSortChange = jest.fn();

    const wrapper = mount(
        <SortSection
          onSortChange={handleSortChange}
          currentSort={currentSort}
        />
    );

    const button = wrapper.find(`.places__sorting-type`);
    button.simulate(`click`);
    expect(handleSortChange).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.places__options`).hasClass(`places__options--opened`)).toBe(true);
  });


  it(`Should Sort type be changed on 'Price: high to low' and callback has been called, sort menu has been closed`, () => {
    const currentSort = SortType.DEFAULT;
    const handleSortChange = jest.fn();

    const wrapper = mount(
        <SortSection
          onSortChange={handleSortChange}
          currentSort={currentSort}
        />
    );

    const openButton = wrapper.find(`.places__sorting-type`);
    const sortButton = wrapper.findWhere((n) => n.prop(`sortType`) === SortType.PRICE_DOWN);
    openButton.simulate(`click`);
    sortButton.simulate(`click`);
    expect(handleSortChange).toHaveBeenCalledWith(SortType.PRICE_DOWN);
    expect(wrapper.find(`.places__options`).hasClass(`places__options--opened`)).toBe(false);
  });


  it(`Should active sort button be pressed and callback hasn't been called, sort menu remains opened`, () => {
    const currentSort = SortType.DEFAULT;
    const handleSortChange = jest.fn();

    const wrapper = mount(
        <SortSection
          onSortChange={handleSortChange}
          currentSort={currentSort}
        />
    );

    const openButton = wrapper.find(`.places__sorting-type`);
    const activeSortButton = wrapper.find(`.places__option--active`);
    openButton.simulate(`click`);
    activeSortButton.simulate(`click`);
    expect(handleSortChange).toHaveBeenCalledTimes(0);
    expect(wrapper.find(`.places__options`).hasClass(`places__options--opened`)).toBe(true);
  });
});
