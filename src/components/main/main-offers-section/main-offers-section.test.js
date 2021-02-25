import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {MainOffersSection} from "./main-offers-section";
import store from "../../../mocks/test-data/store";
import mockOffers from "../../../mocks/test-data/offers";
import mockCities from "../../../mocks/test-data/cities";
import {getMockStore, noop} from "../../../mocks/util";


const city = mockCities[0];
const mockStore = getMockStore(store);


describe(`Should MainOffersSection component renders correctly`, () => {
  it(`with offers`, () => {
    const tree = renderer
    .create((
      <Provider store={mockStore}>
        <BrowserRouter>
          <MainOffersSection
            currentCity={city}
            cityOffers={mockOffers}
            activeItem={1}
            onActiveItemChange={noop}
          />
        </BrowserRouter>
      </Provider>
    ), {
      createNodeMock: () => document.createElement(`div`)
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`without offers`, () => {
    const tree = renderer
    .create(
        <Provider store={mockStore}>
          <BrowserRouter>
            <MainOffersSection
              currentCity={city}
              cityOffers={[]}
              activeItem={null}
              onActiveItemChange={noop}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
