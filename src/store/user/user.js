import {createReducer} from "@reduxjs/toolkit";
import {getUserInfo, loadFavoriteOffers, requireAuthorization, updateFavoriteOffers, setAuthRequestCompleteStatus} from "./action";
import {updateFavorites} from "../../core";
import {AuthorizationStatus} from "../../const";


const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isAuthRequestComplete: false,
  userInfo: {},
  favorites: []
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  });
  builder.addCase(setAuthRequestCompleteStatus, (state, action) => {
    state.isAuthRequestComplete = action.payload;
  });
  builder.addCase(getUserInfo, (state, action) => {
    state.userInfo = action.payload;
  });
  builder.addCase(loadFavoriteOffers, (state, action) => {
    state.favorites = action.payload;
  });
  builder.addCase(updateFavoriteOffers, (state, action) => {
    state.favorites = updateFavorites(action.payload, state.favorites);
  });
});

export {user, initialState};
