import React from "react";
import {Provider} from "react-redux";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import withErrorMessage from "./with-error-message";
import store from "../../mocks/test-data/store";
import {getMockStore, noop} from "../../mocks/util";


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

it(`Should withErrorMessage component renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={mockStore}>
          <MockComponentWrapped
            message={message}
            closeErrorModal={noop}
          >
            <React.Fragment />
          </MockComponentWrapped>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
