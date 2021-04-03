import React from "react";
import {shallow} from "enzyme";
import withActiveState from "./with-active-state";


const MockComponent = () => <div></div>;
const MockComponentWrapped = withActiveState(MockComponent);


test(`Should active state eq false`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        isActive={false}
      >
      </MockComponentWrapped>
  );

  expect(wrapper.state().isActive).toEqual(false);
});
