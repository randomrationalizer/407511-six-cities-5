import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {MainOffersSection} from "./main-offers-section";
import store from "../../../mocks/test-data/store";
import mockOffers from "../../../mocks/test-data/offers";
import mockCities from "../../../mocks/test-data/cities";
import {getMockStore} from "../../../mocks/util";


const cities = mockCities;
const city = mockCities[0];
const mockStore = getMockStore(store);


describe(`Should MainOffersSection component renders correctly`, () => {
  it(`with offers`, () => {
    const tree = renderer
    .create((
      <Provider store={mockStore}>
        <BrowserRouter>
          <MainOffersSection
            cities={cities}
            currentCity={city}
            cityOffers={mockOffers}
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
              cities={cities}
              currentCity={city}
              cityOffers={[]}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
