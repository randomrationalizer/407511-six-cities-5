import React from "react";
import {BrowserRouter} from "react-router-dom";
import {mount} from "enzyme";
import {CityLink} from "./city-link";
import {DEFAULT_CITY, CityLinkType} from "../../../const";


describe(`CityLink e2e testing`, () => {
  it(`Should City link be pressed and callback has been called`, () => {
    const handleCityChange = jest.fn();
    const city = DEFAULT_CITY;
    const linkType = CityLinkType.MAIN_PAGE;

    const wrapper = mount(
        <BrowserRouter>
          <CityLink
            city={city}
            isActive={false}
            onCityChange={handleCityChange}
            linkType={linkType}
          />
        </BrowserRouter>
    );

    const link = wrapper.find(`CityLink`);
    link.simulate(`click`);
    expect(handleCityChange).toHaveBeenCalledTimes(1);
  });


  it(`Should active City link be pressed on main page and callback hasn't been called`, () => {
    const handleCityChange = jest.fn();
    const city = DEFAULT_CITY;
    const linkType = CityLinkType.MAIN_PAGE;

    const wrapper = mount(
        <BrowserRouter>
          <CityLink
            city={city}
            isActive={true}
            onCityChange={handleCityChange}
            linkType={linkType}
          />
        </BrowserRouter>
    );

    const link = wrapper.find(`CityLink`);
    link.simulate(`click`);
    expect(handleCityChange).toHaveBeenCalledTimes(0);
  });
});
