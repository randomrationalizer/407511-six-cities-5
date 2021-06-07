import {createReducer} from "@reduxjs/toolkit";
import {getCitiesData, updateOffer} from "../../core";
import {cities, SortType, DEFAULT_CITY} from "../../const";
import {changeCity, changeSort, loadOffers, updateOffers} from "./action";


const initialState = {
  currentCity: DEFAULT_CITY,
  allOffers: [],
  cities: [],
  currentSort: SortType.DEFAULT
};

const appData = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.currentCity = action.payload;
  });
  builder.addCase(changeSort, (state, action) => {
    state.currentSort = action.payload;
  });
  builder.addCase(loadOffers, (state, action) => {
    state.allOffers = action.payload;
    state.cities = getCitiesData(action.payload, cities);
  });
  builder.addCase(updateOffers, (state, action) => {
    state.allOffers = updateOffer(action.payload, state.allOffers);
  });
});

export {appData, initialState};
