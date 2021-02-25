import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import FavoritesList from "./favorites-list";
import store from "../../../mocks/test-data/store";
import mockFavorites from "../../../mocks/test-data/favorites";
import {getMockStore} from "../../../mocks/util";


const mockStore = getMockStore(store);


it(`Should FavoritesList renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={mockStore}>
          <BrowserRouter>
            <FavoritesList
              favorites={mockFavorites}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

