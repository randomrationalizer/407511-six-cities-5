import React from "react";
import {shallow, mount} from "enzyme";
import {SortSection} from "./sort-section";
import {SortType} from "../../../const";


describe(`SortSection e2e testing`, () => {
  it(`Should Sort button be pressed and menu has been opened`, () => {
    const currentSort = SortType.DEFAULT;
    const handleActiveChange = jest.fn();
    const handleSortChange = jest.fn();

    const wrapper = shallow(
        <SortSection
          onSortChange={handleSortChange}
          currentSort={currentSort}
          isActive={false}
          onActiveChange={handleActiveChange}
        />
    );

    const button = wrapper.find(`.places__sorting-type`);
    button.simulate(`click`);
    expect(handleActiveChange).toHaveBeenCalledTimes(1);
    expect(handleSortChange).toHaveBeenCalledTimes(0);
  });


  it(`Should Sort type be changed on 'Price: high to low' and callback has been called`, () => {
    const currentSort = SortType.DEFAULT;
    const handleSortChange = jest.fn();
    const handleActiveChange = jest.fn();

    const wrapper = mount(
        <SortSection
          onSortChange={handleSortChange}
          currentSort={currentSort}
          isActive={true}
          onActiveChange={handleActiveChange}
        />
    );

    const button = wrapper.findWhere((n) => n.prop(`sortType`) === SortType.PRICE_DOWN);
    button.simulate(`click`);
    expect(handleSortChange).toHaveBeenCalledWith(SortType.PRICE_DOWN);
    expect(handleActiveChange).toHaveBeenCalledTimes(1);
  });


  it(`Should active sort button be pressed and callback hasn't been called`, () => {
    const currentSort = SortType.DEFAULT;
    const handleSortChange = jest.fn();
    const handleActiveChange = jest.fn();

    const wrapper = mount(
        <SortSection
          onSortChange={handleSortChange}
          currentSort={currentSort}
          isActive={true}
          onActiveChange={handleActiveChange}
        />
    );

    const button = wrapper.find(`.places__option--active`);
    button.simulate(`click`);
    expect(handleSortChange).toHaveBeenCalledTimes(0);
    expect(handleActiveChange).toHaveBeenCalledTimes(0);
  });
});
