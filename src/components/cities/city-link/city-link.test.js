import React from "react";
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {CityLink} from "./city-link";
import {DEFAULT_CITY, CityLinkType} from "../../../const";
import {noop} from "../../../mocks/util";


describe(`Should City link component renders correctly`, () => {
  describe(`for main page`, () => {
    it(`with active link`, () => {
      const tree = renderer
      .create(
          <BrowserRouter>
            <CityLink
              city={DEFAULT_CITY}
              isActive={true}
              onCityChange={noop}
              linkType={CityLinkType.MAIN_PAGE}
            />
          </BrowserRouter>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`with inactive link`, () => {
      const tree = renderer
      .create(
          <BrowserRouter>
            <CityLink
              city={DEFAULT_CITY}
              isActive={false}
              onCityChange={noop}
              linkType={CityLinkType.MAIN_PAGE}
            />
          </BrowserRouter>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  it(`for inner pages`, () => {
    const tree = renderer
    .create(
        <BrowserRouter>
          <CityLink
            city={DEFAULT_CITY}
            onCityChange={noop}
            linkType={CityLinkType.INNER_PAGE}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
