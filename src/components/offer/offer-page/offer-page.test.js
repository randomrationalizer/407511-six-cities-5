import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {OfferPage} from "./offer-page";
import store from "../../../mocks/test-data/store";
import {getMockStore, nope} from "../../../mocks/util";


const mockStore = getMockStore(store);
const match = {
  params: {
    id: 1
  }
};


describe(`Should OfferPage renders correctly`, () => {
  it(`for authorized user`, () => {
    const tree = renderer
      .create((
        <Provider store={mockStore}>
          <BrowserRouter>
            <OfferPage
              match={match}
              history={{}}
              isCurrentOfferLoaded={true}
              isLoadFinished={true}
              isAllOffersLoaded={false}
              getOfferInfo={nope}
              getPatchOfferInfo={nope}
              resetOffer={nope}
              setLoadError={nope}
            />
          </BrowserRouter>
        </Provider>
      ), {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
