import {createAction} from "@reduxjs/toolkit";


export const ActionType = {
  LOAD_CURRENT_OFFER: `offer/loadCurrentOffer`,
  RESET_CURRENT_OFFER: `offer/resetCurrentOffer`,
  LOAD_NEARBY_OFFERS: `offer/loadNearbyOffers`,
  LOAD_OFFER_REVIEWS: `offer/loadOfferReviews`,
};

export const loadCurrentOffer = createAction(ActionType.LOAD_CURRENT_OFFER, (offer) => {
  return {
    payload: offer
  };
});

export const resetCurrentOffer = createAction(ActionType.RESET_CURRENT_OFFER);

export const loadNearbyOffers = createAction(ActionType.LOAD_NEARBY_OFFERS, (offers) => {
  return {
    payload: offers
  };
});

export const loadOfferReviews = createAction(ActionType.LOAD_OFFER_REVIEWS, (reviews) => {
  return {
    payload: reviews
  };
});
