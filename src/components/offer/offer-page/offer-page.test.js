import React from "react";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {mount} from "enzyme";
import MockAdapter from "axios-mock-adapter";
import {createMemoryHistory} from "history";
import {createAPI} from "../../../services/api";
import {OfferPage} from "./offer-page";
import store from "../../../mocks/test-data/store";
import {getMockStore, nope} from "../../../mocks/util";
import {getOfferDetails} from "../../../store/api-actions";
import {APIRoute, AppRoute, HttpCode} from "../../../const";


const mockStore = getMockStore(store);
let apiMock;
let dispatch;
const api = createAPI(() => {});


it(`Should OfferPage renders correctly for authorized user`, () => {
  const match = {
    params: {
      id: 1
    }
  };

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

it(`Should make a correct API call to /hotel/:id with not found`, () => {
  let history = createMemoryHistory();
  const id = 999;
  const match = {
    params: {
      id
    }
  };
  const mockError = {
    response: {
      status: HttpCode.NOT_FOUND
    }
  };
  apiMock = new MockAdapter(api);
  dispatch = jest.fn();
  const offerLoader = getOfferDetails(id);
  const getOfferInfo = () => {
    return Promise.reject(mockError);
  };

  apiMock
  .onGet(`${APIRoute.OFFERS}/${id}`)
  .reply(404, mockError);

  mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <OfferPage
            match={match}
            history={history}
            isCurrentOfferLoaded={false}
            isLoadFinished={false}
            isAllOffersLoaded={false}
            getOfferInfo={getOfferInfo}
            getPatchOfferInfo={getOfferInfo}
            resetOffer={nope}
            setLoadError={nope}
          />
        </BrowserRouter>
      </Provider>
  );

  return offerLoader(dispatch, () => {}, api)
    .catch((error) => {
      expect(error.response.status).toEqual(HttpCode.NOT_FOUND);
      expect(history.location.pathname).toBe(AppRoute.NOT_FOUND);
    });
});
