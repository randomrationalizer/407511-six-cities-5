import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list";
import {DEFAULT_CITY} from "../../../const";
import store from "../../../mocks/test-data/store";
import {getMockStore} from "../../../mocks/util";


const mockStore = getMockStore(store);


it(`Should CitiesList renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={mockStore}>
          <BrowserRouter>
            <CitiesList
              currentCity={DEFAULT_CITY}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
