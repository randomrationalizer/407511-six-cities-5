import React from "react";
import withErrorMessage from "./with-error-message";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";


const MockComponent = () => <div></div>;
const MockComponentWrapped = withErrorMessage(MockComponent);

jest.mock(`react-router`, () => (Object.assign({},
    jest.requireActual(`react-router-dom`),
    {
      useLocation: () => {}
    }
)));

describe(`Should withErrorMessage wrapped component renders correctly`, () => {
  it(`with error`, () => {
    const message = `Error`;
    const wrapper = shallow(
        <MockComponentWrapped />
    );

    wrapper.find(MockComponent).props().showErrorMessage(message);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(`without error`, () => {
    const wrapper = shallow(
        <MockComponentWrapped />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
