import React from "react";
import {shallow} from "enzyme";
import ErrorMessage from "./error-message";


test(`Should close button be pressed and callback has been called`, () => {
  const handleCloseBtnClick = jest.fn();
  const wrapper = shallow(
      <ErrorMessage
        message={`Error`}
        onClose={handleCloseBtnClick}
      />
  );

  const button = wrapper.find(`.error-close`);
  button.simulate(`click`);
  expect(handleCloseBtnClick).toHaveBeenCalledTimes(1);
});
