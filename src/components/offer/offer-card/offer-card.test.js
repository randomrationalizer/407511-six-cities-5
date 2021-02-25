import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card";
import store from "../../../mocks/test-data/store";
import mockCurrentOffer from "../../../mocks/test-data/current-offer";
import {getMockStore, noop} from "../../../mocks/util";
import {OfferType} from "../../../const";


const mockStore = getMockStore(store);


describe(`Should OfferCard component renders correctly`, () => {
  it(`for main page`, () => {
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <BrowserRouter>
              <OfferCard
                onCardHover={noop}
                offer={mockCurrentOffer}
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
              <OfferCard
                offer={mockCurrentOffer}
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
              <OfferCard
                offer={mockCurrentOffer}
                offerType={OfferType.FAVORITES}
              />
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
