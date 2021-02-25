import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {UserNav} from "./user-nav";
import store from "../../../mocks/test-data/store";
import {getMockStore} from "../../../mocks/util";
import {AuthorizationStatus} from "../../../const";


const mockStore = getMockStore(store);


describe(`Should UserNav component renders correctly`, () => {
  it(`if user has been authenticate`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <BrowserRouter>
              <UserNav
                authorizationStatus={AuthorizationStatus.AUTH}
              />
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`if user is not authenticated`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <UserNav
              authorizationStatus={AuthorizationStatus.NO_AUTH}
            />
          </BrowserRouter>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
