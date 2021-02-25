import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {FavoritesPage} from "./favorites-page";
import store from "../../../mocks/test-data/store";
import mockFavorites from "../../../mocks/test-data/favorites";
import {getMockStore, noop, nope} from "../../../mocks/util";


const mockStore = getMockStore(store);


describe(`Should Favorites component renders correctly`, () => {
  it(`with saved offers`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <BrowserRouter>
              <FavoritesPage
                favorites={mockFavorites}
                isFavoritesLoaded={true}
                isLoadFinished={true}
                getFavoriteOffers={nope}
                setLoadError={noop}
              />
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`without saved offers`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <BrowserRouter>
              <FavoritesPage
                favorites={[]}
                isFavoritesLoaded={false}
                isLoadFinished={true}
                getFavoriteOffers={nope}
                setLoadError={noop}
              />
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
