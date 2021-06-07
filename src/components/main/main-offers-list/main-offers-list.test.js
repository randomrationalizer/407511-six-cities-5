import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import MainOffersList from "./main-offers-list";
import store from "../../../mocks/test-data/store";
import mockOffers from "../../../mocks/test-data/offers";
import mockCities from "../../../mocks/test-data/cities";
import {getMockStore, noop} from "../../../mocks/util";


const city = mockCities[0];
const mockStore = getMockStore(store);


it(`Should MainOffersList component renders correctly`, () => {
  const tree = renderer
  .create((
    <Provider store={mockStore}>
      <BrowserRouter>
        <MainOffersList
          city={city}
          offers={mockOffers}
          activeCardId={1}
          onCardHover={noop}
        />
      </BrowserRouter>
    </Provider>
  ), {
    createNodeMock: () => document.createElement(`div`)
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
