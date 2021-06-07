import {createReducer} from "@reduxjs/toolkit";
import {loadCurrentOffer, resetCurrentOffer, loadNearbyOffers, loadOfferReviews} from "./action";


const initialState = {
  offer: null,
  reviews: [],
  nearbyOffers: []
};

const currentOffer = createReducer(initialState, (builder) => {
  builder.addCase(loadCurrentOffer, (state, action) => {
    state.offer = action.payload;
  });
  builder.addCase(resetCurrentOffer, () => initialState);
  builder.addCase(loadNearbyOffers, (state, action) => {
    state.nearbyOffers = action.payload;
  });
  builder.addCase(loadOfferReviews, (state, action) => {
    state.reviews = action.payload;
  });
});

export {currentOffer, initialState};
