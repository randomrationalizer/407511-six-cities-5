import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {ProfileLink} from "./profile-link";
import mockUserInfo from "../../../mocks/test-data/user-info";


test(`ProfileLink component renders correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <ProfileLink
            userInfo={mockUserInfo}
          />
        </BrowserRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
