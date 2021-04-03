import React from "react";
import {Provider} from "react-redux";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import withErrorMessage, {withErrorMessage as withErrorMessageWithoutStore} from "./with-error-message";
import store from "../../mocks/test-data/store";
import {getMockStore, noop} from "../../mocks/util";
import {NameSpace} from "../../store/reducers/root-reducer";
import {extend} from "../../utils/common";


const message = `Error`;
const mockStore = getMockStore(store);

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withErrorMessage(MockComponent);
const MockComponentWrappedWithoutStore = withErrorMessageWithoutStore(MockComponent);

describe(`Should withErrorMessage wrapped component renders correctly`, () => {
  it(`with error`, () => {
    const tree = renderer
      .create(
          <MockComponentWrappedWithoutStore
            message={message}
            closeErrorModal={noop}
          >
            <React.Fragment />
          </MockComponentWrappedWithoutStore>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`without error`, () => {
    const tree = renderer
      .create(
          <MockComponentWrappedWithoutStore
            message={null}
            closeErrorModal={noop}
          >
            <React.Fragment />
          </MockComponentWrappedWithoutStore>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe(`Should withErrorMessage wrapped component connected to store renders correctly`, () => {
  it(`without error`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <MockComponentWrapped>
              <React.Fragment />
            </MockComponentWrapped>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with error`, () => {
    const updatedStore = extend(store, {
      [NameSpace.LOAD_STATUS]: extend(store[NameSpace.LOAD_STATUS], {
        errorMessage: message
      })
    });
    const updatedMockStore = getMockStore(updatedStore);

    const tree = renderer
      .create(
          <Provider store={updatedMockStore}>
            <MockComponentWrapped>
              <React.Fragment />
            </MockComponentWrapped>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
