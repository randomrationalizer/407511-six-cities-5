import {createAction} from "@reduxjs/toolkit";


export const ActionType = {
  REQUIRE_AUTHORIZATION: `user/requireAuthorization`,
  SET_AUTH_REQUEST_COMPLETE_STATUS: `app/setAuthRequestCompleteStatus`,
  GET_USER_INFO: `user/getUserInfo`,
  LOAD_FAVORITE_OFFERS: `user/loadFavoriteOffers`,
  UPDATE_FAVORITE_OFFERS: `user/updateFavoriteOffers`,
};

export const requireAuthorization = createAction(ActionType.REQUIRE_AUTHORIZATION, (status) => {
  return {
    payload: status
  };
});

export const setAuthRequestCompleteStatus = createAction(ActionType.SET_AUTH_REQUEST_COMPLETE_STATUS, (status) => {
  return {
    payload: status
  };
});

export const getUserInfo = createAction(ActionType.GET_USER_INFO, (userInfo) => {
  return {
    payload: userInfo
  };
});

export const loadFavoriteOffers = createAction(ActionType.LOAD_FAVORITE_OFFERS, (offers) => {
  return {
    payload: offers
  };
});

export const updateFavoriteOffers = createAction(ActionType.UPDATE_FAVORITE_OFFERS, (offer) => {
  return {
    payload: offer
  };
});
