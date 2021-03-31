import {AuthorizationStatus} from "../const";
import mockOffers from "../mocks/test-data/offers";
import mockCurrentOffer from "../mocks/test-data/current-offer";
import mockUserInfo from "../mocks/test-data/user-info";
import mockNearbyOffers from "../mocks/test-data/nearby-offers";
import mockReviews from "../mocks/test-data/reviews";
import mockFavorites from "../mocks/test-data/favorites";
import {
  ActionType,
  changeCity,
  setDefaultCity,
  changeSort,
  loadOffers,
  updateOffers,
  getCities,
  requireAuthorization,
  getUserInfo,
  loadNearbyOffers,
  loadOfferReviews,
  changeCurrentOfferLoadedStatus,
  changeOffersLoadedStatus,
  loadFavoriteOffers,
  updateFavoriteOffers,
  changeFavoritesLoadedStatus,
  loadCurrentOffer,
  setErrorMessage,
  closeErrorMessage,
  resetCurrentOffer,
  changeLoadFinishStatus,
  changeAuthRequestCompleteStatus
} from "./action";


describe(`Action creators works correctly`, () => {
  it(`Action creator for city change returns correct action with "Brussels" payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: `Brussels`
    };

    expect(changeCity(`Brussels`)).toEqual(expectedAction);
  });

  it(`Action creator for setting default city returns correct action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.SET_DEFAULT_CITY
    };

    expect(setDefaultCity()).toEqual(expectedAction);
  });

  it(`Action creator for sort change returns correct action with "Popular" payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Popular`
    };

    expect(changeSort(`Popular`)).toEqual(expectedAction);
  });

  it(`Action creator for offers load returns correct action with offers payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: mockOffers
    };

    expect(loadOffers(mockOffers)).toEqual(expectedAction);
  });

  it(`Action creator for update offers returns correct action with updated offer payload`, () => {
    const expectedAction = {
      type: ActionType.UPDATE_OFFERS,
      payload: mockCurrentOffer
    };

    expect(updateOffers(mockCurrentOffer)).toEqual(expectedAction);
  });

  it(`Action creator for get cities list returns correct action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.GET_CITIES
    };

    expect(getCities()).toEqual(expectedAction);
  });

  it(`Action creator for require authorization returns correct action with "AUTH" status payload`, () => {
    const expectedAction = {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(requireAuthorization(AuthorizationStatus.AUTH)).toEqual(expectedAction);
  });

  it(`Action creator for user info load returns correct action with user data payload`, () => {
    const expectedAction = {
      type: ActionType.GET_USER_INFO,
      payload: mockUserInfo
    };

    expect(getUserInfo(mockUserInfo)).toEqual(expectedAction);
  });

  it(`Action creator for nearby offers load returns correct action with nearby offers payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: mockNearbyOffers
    };

    expect(loadNearbyOffers(mockNearbyOffers)).toEqual(expectedAction);
  });

  it(`Action creator for reviews load returns correct action with reviews payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFER_REVIEWS,
      payload: mockReviews
    };

    expect(loadOfferReviews(mockReviews)).toEqual(expectedAction);
  });

  it(`Action creator for change current offer load status returns correct action with "true" payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_CURRENT_OFFER_LOADED_STATUS,
      payload: true
    };

    expect(changeCurrentOfferLoadedStatus(true)).toEqual(expectedAction);
  });

  it(`Action creator for change offers load status returns correct action with "false" payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_OFFERS_LOADED_STATUS,
      payload: false
    };

    expect(changeOffersLoadedStatus(false)).toEqual(expectedAction);
  });

  it(`Action creator for favorite offers load returns correct action with favorites payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: mockFavorites
    };

    expect(loadFavoriteOffers(mockFavorites)).toEqual(expectedAction);
  });

  it(`Action creator for update favorite offers returns correct action with updated offer payload`, () => {
    const expectedAction = {
      type: ActionType.UPDATE_FAVORITE_OFFERS,
      payload: mockCurrentOffer
    };

    expect(updateFavoriteOffers(mockCurrentOffer)).toEqual(expectedAction);
  });

  it(`Action creator for change favorites load status returns correct action with "true" payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_FAVORITES_LOADED_STATUS,
      payload: true
    };

    expect(changeFavoritesLoadedStatus(true)).toEqual(expectedAction);
  });

  it(`Action creator for load current offer returns correct action with offer payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_CURRENT_OFFER,
      payload: mockCurrentOffer
    };

    expect(loadCurrentOffer(mockCurrentOffer)).toEqual(expectedAction);
  });

  it(`Action creator for set error message returns correct action with message payload`, () => {
    const expectedAction = {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: `Error`
    };

    expect(setErrorMessage(`Error`)).toEqual(expectedAction);
  });

  it(`Action creator for close error message returns correct action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.CLOSE_ERROR_MESSAGE
    };

    expect(closeErrorMessage()).toEqual(expectedAction);
  });

  it(`Action creator for reset current offer returns correct action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_CURRENT_OFFER
    };

    expect(resetCurrentOffer()).toEqual(expectedAction);
  });

  it(`Action creator for change load finish status returns correct action with "true" payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_LOAD_FINISH_STATUS,
      payload: true
    };

    expect(changeLoadFinishStatus(true)).toEqual(expectedAction);
  });

  it(`Action creator for change authorization request complete status returns correct action with "true" payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_AUTH_REQUEST_COMPLETE_STATUS,
      payload: true
    };

    expect(changeAuthRequestCompleteStatus(true)).toEqual(expectedAction);
  });
});
