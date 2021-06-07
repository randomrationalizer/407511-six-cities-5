import {currentOffer, initialState} from "./current-offer";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../services/api";
import {ActionType, loadCurrentOffer, loadNearbyOffers, loadOfferReviews, resetCurrentOffer} from "./action";
import {ActionType as LoadStatusActionType} from "../load-status/action";
import {fetchOffer, postNewReview} from "../api-actions";
import mockOffers from "../../mocks/test-data/offers";
import mockCurrentOffer, {currentOffer as mockRawCurrentOffer} from "../../mocks/test-data/current-offer";
import mockNearbyOffers, {nearbyOffers as mockRawNearbyOffers} from "../../mocks/test-data/nearby-offers";
import mockReviews, {reviews as mockRawReviews} from "../../mocks/test-data/reviews";
import {APIRoute, HttpCode} from "../../const";
import {NameSpace} from "../root-reducer";


let apiMock;
let dispatch;
const api = createAPI(() => {});

describe(`Current Offer reduser works correctly`, () => {
  it(`Reduser without additional parameters should return initial state`, () => {
    expect(currentOffer(undefined, {})).toEqual(initialState);
  });

  it(`Reduser should update current offer by load offer`, () => {
    expect(currentOffer({offer: {}}, loadCurrentOffer(mockCurrentOffer)))
      .toEqual({offer: mockCurrentOffer});
  });

  it(`Reduser should reset current offer state to initial state`, () => {
    const mockState = {
      offer: mockCurrentOffer,
      reviews: mockReviews,
      nearbyOffers: mockNearbyOffers
    };

    expect(currentOffer(mockState, resetCurrentOffer())).toEqual(initialState);
  });

  it(`Reduser should update nearby offers by load offers`, () => {
    expect(currentOffer({nearbyOffers: []}, loadNearbyOffers(mockNearbyOffers)))
      .toEqual({nearbyOffers: mockNearbyOffers});
  });

  it(`Reduser should reviews by load offer reviews`, () => {
    expect(currentOffer({reviews: []}, loadOfferReviews(mockReviews)))
      .toEqual({reviews: mockReviews});
  });
});

describe(`Current Offer async operations works correctly`, () => {
  beforeEach(() => {
    apiMock = new MockAdapter(api);
    dispatch = jest.fn();
  });

  it(`Should make a correct API call to get full offer details`, () => {
    const id = 1;
    const offerLoader = fetchOffer(id);
    const getState = () => ({
      [NameSpace.APP_DATA]: {
        allOffers: []
      },
      [NameSpace.LOAD_STATUS]: {
        isOffersLoaded: false
      }
    });

    apiMock
      .onGet(`${APIRoute.OFFERS}/${id}`)
      .reply(HttpCode.OK, mockRawCurrentOffer)
      .onGet(`${APIRoute.REVIEWS}/${id}`)
      .reply(HttpCode.OK, mockRawReviews)
      .onGet(`${APIRoute.OFFERS}/${id}/${APIRoute.NEARBY}`)
      .reply(HttpCode.OK, mockRawNearbyOffers);

    return offerLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LoadStatusActionType.SET_LOAD_FINISH_STATUS,
          payload: false
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_CURRENT_OFFER,
          payload: mockCurrentOffer
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.LOAD_OFFER_REVIEWS,
          payload: mockReviews
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.LOAD_NEARBY_OFFERS,
          payload: mockNearbyOffers
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: LoadStatusActionType.SET_LOAD_FINISH_STATUS,
          payload: true
        });
      });
  });

  it(`Should make a correct API call to get partial offer details`, () => {
    const id = 1;
    const offerDetailsLoader = fetchOffer(id);
    const expectedOffer = mockOffers[0];
    const getState = () => ({
      [NameSpace.APP_DATA]: {
        allOffers: mockOffers
      },
      [NameSpace.LOAD_STATUS]: {
        isOffersLoaded: true
      }
    });

    apiMock
      .onGet(`${APIRoute.REVIEWS}/${id}`)
      .reply(200, mockRawReviews)
      .onGet(`${APIRoute.OFFERS}/${id}/${APIRoute.NEARBY}`)
      .reply(200, mockRawNearbyOffers);

    return offerDetailsLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LoadStatusActionType.SET_LOAD_FINISH_STATUS,
          payload: false
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_CURRENT_OFFER,
          payload: expectedOffer
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.LOAD_OFFER_REVIEWS,
          payload: mockReviews
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.LOAD_NEARBY_OFFERS,
          payload: mockNearbyOffers
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: LoadStatusActionType.SET_LOAD_FINISH_STATUS,
          payload: true
        });
      });
  });

  it(`Should make a correct API call to /comments/:id to post comment`, () => {
    const id = 1;
    const review = {
      comment: `Mock`,
      rating: 1
    };
    const commentPoster = postNewReview(id, review);

    apiMock
      .onPost(`${APIRoute.REVIEWS}/${id}`)
      .reply(200, mockRawReviews);

    return commentPoster(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER_REVIEWS,
          payload: mockReviews
        });
      });
  });
});
