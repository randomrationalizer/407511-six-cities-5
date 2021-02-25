import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import Header from "./header";
import store from "../../mocks/test-data/store";
import {getMockStore} from "../../mocks/util";


const mockStore = getMockStore(store);


it(`Should Header component renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={mockStore}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

