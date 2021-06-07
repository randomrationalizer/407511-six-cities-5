import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import OfferDetails from "./offer-details";
import store from "../../../mocks/test-data/store";
import {getMockStore} from "../../../mocks/util";
import {NameSpace} from "../../../store/root-reducer";
import {extend} from "../../../utils/common";
import {AuthorizationStatus} from "../../../const";


const mockStore = getMockStore(store);


describe(`Should OfferDetails component renders correctly`, () => {
  it(`for authorized user`, () => {
    const tree = renderer
      .create((
        <Provider store={mockStore}>
          <BrowserRouter>
            <OfferDetails
              id={1}
            />
          </BrowserRouter>
        </Provider>
      ), {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`for unauthorized user`, () => {
    const updatedStore = extend(store, {
      [NameSpace.USER]: extend(store[NameSpace.USER], {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      })
    });
    const updatedMockStore = getMockStore(updatedStore);
    const tree = renderer
      .create((
        <Provider store={updatedMockStore}>
          <BrowserRouter>
            <OfferDetails
              id={1}
            />
          </BrowserRouter>
        </Provider>
      ), {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`without property reviews`, () => {
    const updatedStore = extend(store, {
      [NameSpace.CURRENT_OFFER]: extend(store[NameSpace.CURRENT_OFFER], {
        reviews: []
      })
    });
    const updatedMockStore = getMockStore(updatedStore);
    const tree = renderer
      .create((
        <Provider store={updatedMockStore}>
          <BrowserRouter>
            <OfferDetails
              id={1}
            />
          </BrowserRouter>
        </Provider>
      ), {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`without nearby offers`, () => {
    const updatedStore = extend(store, {
      [NameSpace.CURRENT_OFFER]: extend(store[NameSpace.CURRENT_OFFER], {
        nearbyOffers: []
      })
    });
    const updatedMockStore = getMockStore(updatedStore);
    const tree = renderer
      .create((
        <Provider store={updatedMockStore}>
          <BrowserRouter>
            <OfferDetails
              id={1}
            />
          </BrowserRouter>
        </Provider>
      ), {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
