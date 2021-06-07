import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page";
import store from "../../../mocks/test-data/store";
import {getMockStore, noop, nope} from "../../../mocks/util";


const mockStore = getMockStore(store);


describe(`Should MainPage renders correctly`, () => {
  it(`with offers`, () => {
    const tree = renderer
    .create((
      <Provider store={mockStore}>
        <BrowserRouter>
          <MainPage
            getOffers={nope}
            isOffersLoaded={true}
            isLoadFinished={true}
            showErrorMessage={noop}
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
            <MainPage
              getOffers={nope}
              isOffersLoaded={false}
              isLoadFinished={true}
              showErrorMessage={noop}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with spinner if load is not finshed`, () => {
    const tree = renderer
    .create(
        <Provider store={mockStore}>
          <BrowserRouter>
            <MainPage
              getOffers={nope}
              isOffersLoaded={false}
              isLoadFinished={false}
              showErrorMessage={noop}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
