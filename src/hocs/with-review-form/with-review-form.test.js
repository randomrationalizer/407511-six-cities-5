import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import withReviewForm from "./with-review-form";
import {noop} from "../../mocks/util";


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

const MockComponentWrapped = withReviewForm(MockComponent);

it(`Should withReviewForm component renders correctly`, () => {
  const tree = renderer
    .create(
        <MockComponentWrapped
          onFormSubmit={noop}
          id={1}
        >
          <React.Fragment />
        </MockComponentWrapped>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
