import React from "react";
import {shallow} from "enzyme";
import ErrorMessage from "./error-message";


test(`Should close button be pressed and callback has been called`, () => {
  const handleCloseButtonClick = jest.fn();
  const wrapper = shallow(
      <ErrorMessage
        message={`Error`}
        onClose={handleCloseButtonClick}
      />
  );

  const button = wrapper.find(`.error-close`);
  button.simulate(`click`);
  expect(handleCloseButtonClick).toHaveBeenCalledTimes(1);
});
