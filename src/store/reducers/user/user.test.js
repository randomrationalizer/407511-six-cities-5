import {user, initialState} from "./user";
import {
  changeAuthRequestCompleteStatus,
  getUserInfo,
  loadFavoriteOffers,
  requireAuthorization,
  updateFavoriteOffers
} from "../../action";
import mockUserInfo from "../../../mocks/test-data/user-info";
import mockFavorites from "../../../mocks/test-data/favorites";
import {AuthorizationStatus} from "../../../const";


describe(`User reduser works correctly`, () => {
  it(`Reduser without additional parameters should return initial state`, () => {
    expect(user(undefined, {})).toEqual(initialState);
  });

  it(`Reduser should change authorization status to a new value`, () => {
    expect(user({authorizationStatus: AuthorizationStatus.NO_AUTH}, requireAuthorization(AuthorizationStatus.AUTH)))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });

  it(`Reduser should update user info by load user info`, () => {
    expect(user({userInfo: {}}, getUserInfo(mockUserInfo)))
      .toEqual({userInfo: mockUserInfo});
  });

  it(`Reduser should update favorite offers by load offers`, () => {
    expect(user({favorites: []}, loadFavoriteOffers(mockFavorites)))
      .toEqual({favorites: mockFavorites});
  });

  it(`Reduser should update favorite offers by push favorite offer`, () => {
    const offer = mockFavorites[0];
    expect(user({favorites: []}, updateFavoriteOffers(offer)))
      .toEqual({favorites: [offer]});
  });

  it(`Reduser should update favorite offers by delete favorite offer`, () => {
    const offer = mockFavorites[0];
    expect(user({favorites: [offer]}, updateFavoriteOffers(offer)))
      .toEqual({favorites: []});
  });

  it(`Reduser should change authorization request finish status to a new value`, () => {
    expect(user({isAuthRequestComplete: false}, changeAuthRequestCompleteStatus(true)))
      .toEqual({isAuthRequestComplete: true});
  });
});
