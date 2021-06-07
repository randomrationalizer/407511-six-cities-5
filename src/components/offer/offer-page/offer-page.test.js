import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {mount} from "enzyme";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../../services/api";
import {OfferPage} from "./offer-page";
import store from "../../../mocks/test-data/store";
import {getMockStore, noop, nope} from "../../../mocks/util";
import {fetchOffer} from "../../../store/api-actions";
import {APIRoute, AppRoute, ErrorMessage, HttpCode} from "../../../const";
import mockCurrentOffer from "../../../mocks/test-data/current-offer";
import {NameSpace} from "../../../store/root-reducer";
import {extend} from "../../../utils/common";


let apiMock;
let dispatch;
const mockId = 1;
const offer = mockCurrentOffer;
const api = createAPI(() => {});
const mockStore = getMockStore(store);
const mockHistoryPush = jest.fn();

jest.mock(`react-router-dom`, () => (Object.assign({},
    jest.requireActual(`react-router-dom`),
    {
      useHistory: () => ({
        push: mockHistoryPush,
      }),
      useParams: () => ({
        id: mockId
      }),
    }
)));

describe(`Should OfferPage renders correctly`, () => {
  it(`with offer`, () => {
    const tree = renderer
      .create((
        <Provider store={mockStore}>
          <MemoryRouter>
            <OfferPage
              offer={offer}
              isLoadFinished={true}
              getOfferInfo={nope}
              resetOffer={nope}
              showErrorMessage={nope}
            />
          </MemoryRouter>
        </Provider>
      ), {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`without offer`, () => {
    const updatedStore = extend(store, {
      [NameSpace.CURRENT_OFFER]: extend(store[NameSpace.CURRENT_OFFER], {
        offer: null
      })
    });
    const updatedMockStore = getMockStore(updatedStore);

    const tree = renderer
      .create((
        <Provider store={updatedMockStore}>
          <MemoryRouter>
            <OfferPage
              offer={null}
              isLoadFinished={true}
              getOfferInfo={nope}
              resetOffer={nope}
              showErrorMessage={nope}
            />
          </MemoryRouter>
        </Provider>
      ), {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with spinner if load is not finshed`, () => {
    const tree = renderer
      .create((
        <Provider store={mockStore}>
          <MemoryRouter>
            <OfferPage
              offer={null}
              isLoadFinished={false}
              getOfferInfo={nope}
              resetOffer={nope}
              showErrorMessage={nope}
            />
          </MemoryRouter>
        </Provider>
      ), {
        createNodeMock: () => document.createElement(`div`)
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe(`Should OfferPage correctly handle errors`, () => {
  beforeEach(() => {
    apiMock = new MockAdapter(api);
    dispatch = jest.fn();
    jest.resetAllMocks();
  });

  it(`with not found status`, () => {
    const handleError = jest.fn();
    const offerLoader = fetchOffer(mockId);

    const mockError = {
      response: {
        status: HttpCode.NOT_FOUND
      }
    };

    const loadOfferInfo = () => {
      return Promise.reject(mockError);
    };

    const getState = () => ({
      [NameSpace.APP_DATA]: {
        allOffers: []
      },
      [NameSpace.LOAD_STATUS]: {
        isOffersLoaded: false
      }
    });

    apiMock
    .onGet(`${APIRoute.OFFERS}/${mockId}`)
    .reply(404, mockError);

    mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OfferPage
              offer={null}
              isLoadFinished={true}
              getOfferInfo={loadOfferInfo}
              resetOffer={noop}
              showErrorMessage={handleError}
            />
          </MemoryRouter>
        </Provider>
    );

    return offerLoader(dispatch, getState, api)
      .catch((error) => {
        expect(error.response.status).toEqual(HttpCode.NOT_FOUND);
        expect(mockHistoryPush).toHaveBeenCalledTimes(1);
        expect(mockHistoryPush).toHaveBeenCalledWith(AppRoute.NOT_FOUND);
        expect(handleError).toHaveBeenCalledTimes(0);
      });
  });

  it(`with status 400 Bad request`, () => {
    const handleError = jest.fn();
    const offerLoader = fetchOffer(mockId);

    const mockError = {
      response: {
        status: HttpCode.BAD_REQUEST,
      },
      message: ErrorMessage.BAD_REQUEST
    };

    const loadOfferInfo = () => {
      return Promise.reject(mockError);
    };

    const getState = () => ({
      [NameSpace.APP_DATA]: {
        allOffers: []
      },
      [NameSpace.LOAD_STATUS]: {
        isOffersLoaded: false
      }
    });

    apiMock
    .onGet(`${APIRoute.OFFERS}/${mockId}`)
    .reply(400, mockError);

    mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OfferPage
              offer={null}
              isLoadFinished={false}
              getOfferInfo={loadOfferInfo}
              resetOffer={noop}
              showErrorMessage={handleError}
            />
          </MemoryRouter>
        </Provider>
    );

    return offerLoader(dispatch, getState, api)
      .catch(() => {
        expect(mockHistoryPush).toHaveBeenCalledTimes(0);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith(ErrorMessage.BAD_REQUEST);
      });
  });
});
