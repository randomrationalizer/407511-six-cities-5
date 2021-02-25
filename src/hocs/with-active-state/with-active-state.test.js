import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import withActiveState from "./with-active-state";


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

const MockComponentWrapped = withActiveState(MockComponent);

it(`Should withActiveState component renders correctly`, () => {
  const tree = renderer
    .create(
        <MockComponentWrapped
          isActive={true}
        >
          <React.Fragment />
        </MockComponentWrapped>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
