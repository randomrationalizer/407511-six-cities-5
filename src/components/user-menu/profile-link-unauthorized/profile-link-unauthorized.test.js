import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import ProfileLinkUnauthorized from "./profile-link-unauthorized";


test(`ProfileLinkUnauthorized component renders correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <ProfileLinkUnauthorized />
        </BrowserRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
