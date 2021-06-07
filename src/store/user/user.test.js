import {user, initialState} from "./user";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../services/api";
import {
  ActionType,
  requireAuthorization,
  setAuthRequestCompleteStatus,
  getUserInfo, loadFavoriteOffers,
  updateFavoriteOffers
} from "./action";
import {ActionType as LoadStatusActionType} from "../load-status/action";
import {ActionType as AppDataActionType} from "../app-data/action";
import {checkAuth, fetchFavoriteOffers, login, changeFavoriteStatus} from "../api-actions";
import mockUserInfo, {userInfo as mockRawUserInfo} from "../../mocks/test-data/user-info";
import mockFavorites, {favorites as mockRawFavorites} from "../../mocks/test-data/favorites";
import mockCurrentOffer, {currentOffer as mockRawCurrentOffer} from "../../mocks/test-data/current-offer";
import {APIRoute, AuthorizationStatus, HttpCode} from "../../const";


let apiMock;
let dispatch;
const api = createAPI(() => {});

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
    expect(user({isAuthRequestComplete: false}, setAuthRequestCompleteStatus(true)))
      .toEqual({isAuthRequestComplete: true});
  });
});

describe(`User async operations works correctly`, () => {
  beforeEach(() => {
    apiMock = new MockAdapter(api);
    dispatch = jest.fn();
  });

  it(`Should make a correct API call to /login for check authorization`, () => {
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(HttpCode.OK, mockRawUserInfo);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_USER_INFO,
          payload: mockUserInfo
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRE_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_AUTH_REQUEST_COMPLETE_STATUS,
          payload: true
        });
      });
  });

  it(`Should make a correct API call to /login for logging in`, () => {
    const fakeUser = {email: `fake@fake.ru`, password: `fake`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(HttpCode.OK, mockRawUserInfo);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_USER_INFO,
          payload: mockUserInfo
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRE_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });
      });
  });

  it(`Should make a correct API call to /favorite to get favorite offers`, () => {
    const favoritesLoader = fetchFavoriteOffers();

    apiMock
      .onGet(APIRoute.FAVORITES)
      .reply(HttpCode.OK, mockRawFavorites);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LoadStatusActionType.SET_LOAD_FINISH_STATUS,
          payload: false
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: LoadStatusActionType.SET_LOAD_FINISH_STATUS,
          payload: true
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.LOAD_FAVORITE_OFFERS,
          payload: mockFavorites
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: LoadStatusActionType.SET_FAVORITES_LOADED_STATUS,
          payload: true
        });
      });
  });

  it(`Should make a correct API call to /favorite/:id/:status to post favorite status`, () => {
    const id = 1;
    const status = 1;
    const favoriteStatusLoader = changeFavoriteStatus(id, status);

    apiMock
      .onPost(`${APIRoute.FAVORITES}/${id}/${status}`)
      .reply(HttpCode.OK, mockRawCurrentOffer);

    return favoriteStatusLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: AppDataActionType.UPDATE_OFFERS,
          payload: mockCurrentOffer
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.UPDATE_FAVORITE_OFFERS,
          payload: mockCurrentOffer
        });
      });
  });
});
