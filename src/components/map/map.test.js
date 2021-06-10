import React from "react";
import renderer from "react-test-renderer";
import Map from "./map";
import mockOffers from "../../mocks/test-data/offers";
import mockCities from "../../mocks/test-data/cities";
import {MapType} from "../../const";


const city = mockCities[0];


describe(`Should Map component renders correctly`, () => {
  it(`for main page`, () => {
    const tree = renderer
    .create((
      <Map
        offers={mockOffers}
        mapType={MapType.MAIN}
        activeCardId={null}
        city={city}
      />
    ), {
      createNodeMock: () => document.createElement(`div`)
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`for property page`, () => {
    const tree = renderer
    .create((
      <Map
        offers={mockOffers}
        mapType={MapType.PROPERTY}
        activeCardId={1}
        city={city}
      />
    ), {
      createNodeMock: () => document.createElement(`div`)
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
