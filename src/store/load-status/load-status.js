import {createReducer} from "@reduxjs/toolkit";
import {setFavoritesLoadedStatus, setLoadFinishStatus, setOffersLoadedStatus} from "./action";


const initialState = {
  isOffersLoaded: false,
  isFavoritesLoaded: false,
  isLoadFinished: false
};

const loadStatus = createReducer(initialState, (builder) => {
  builder.addCase(setOffersLoadedStatus, (state, action) => {
    state.isOffersLoaded = action.payload;
  });
  builder.addCase(setFavoritesLoadedStatus, (state, action) => {
    state.isFavoritesLoaded = action.payload;
  });
  builder.addCase(setLoadFinishStatus, (state, action) => {
    state.isLoadFinished = action.payload;
  });
});

export {loadStatus, initialState};
