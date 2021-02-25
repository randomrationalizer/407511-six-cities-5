import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import City from "./city";
import store from "../../../mocks/test-data/store";
import {getMockStore} from "../../../mocks/util";
import {DEFAULT_CITY} from "../../../const";


const mockStore = getMockStore(store);


describe(`Should City component renders correctly`, () => {
  it(`with active link`, () => {
    const tree = renderer
    .create(
        <Provider store={mockStore}>
          <BrowserRouter>
            <City
              isActive={true}
              city={DEFAULT_CITY}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with inactive link`, () => {
    const tree = renderer
    .create(
        <Provider store={mockStore}>
          <BrowserRouter>
            <City
              isActive={false}
              city={DEFAULT_CITY}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
