import mockCurrentOffer from "../../mocks/test-data/current-offer";
import mockUserInfo from "../../mocks/test-data/user-info";
import mockFavorites from "../../mocks/test-data/favorites";
import {
  ActionType,
  requireAuthorization,
  getUserInfo,
  loadFavoriteOffers,
  updateFavoriteOffers,
  setAuthRequestCompleteStatus
} from "./action";
import {AuthorizationStatus} from "../../const";


describe(`User action creators works correctly`, () => {
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

  it(`Action creator for change authorization request complete status returns correct action with "true" payload`, () => {
    const expectedAction = {
      type: ActionType.SET_AUTH_REQUEST_COMPLETE_STATUS,
      payload: true
    };

    expect(setAuthRequestCompleteStatus(true)).toEqual(expectedAction);
  });
});
