import React from "react";
import {shallow} from "enzyme";
import withActiveItem from "./with-active-item";


const MockComponent = () => <div></div>;
const MockComponentWrapped = withActiveItem(MockComponent);

test(`Should state equal to the active item id`, () => {
  const wrapper = shallow(
      <MockComponentWrapped />
  );

  wrapper.props().onActiveItemChange(1);
  expect(wrapper.state().activeItem).toEqual(1);
});
