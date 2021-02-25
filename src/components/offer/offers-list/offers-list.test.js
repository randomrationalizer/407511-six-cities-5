import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import OffersList from "./offers-list";
import store from "../../../mocks/test-data/store";
import mockNearbyOffers from "../../../mocks/test-data/nearby-offers";
import {getMockStore, noop} from "../../../mocks/util";
import {OfferType} from "../../../const";


const mockStore = getMockStore(store);


describe(`Should OffersList component renders correctly`, () => {
  it(`for main page`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <BrowserRouter>
              <OffersList
                offers={mockNearbyOffers}
                onOfferHover={noop}
                offerType={OfferType.MAIN}
              />
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`for property page`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <BrowserRouter>
              <OffersList
                offers={mockNearbyOffers}
                onOfferHover={noop}
                offerType={OfferType.NEARBY}
              />
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`for favorites page`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <BrowserRouter>
              <OffersList
                offers={mockNearbyOffers}
                onOfferHover={noop}
                offerType={OfferType.FAVORITES}
              />
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
