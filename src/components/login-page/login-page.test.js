import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import LoginPage from "./login-page";
import store from "../../mocks/test-data/store";
import {getMockStore, noop} from "../../mocks/util";


const mockStore = getMockStore(store);


it(`Should Login screen renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={mockStore}>
          <BrowserRouter>
            <LoginPage
              onFormSubmit={noop}
              showErrorMessage={noop}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
