import {NameSpace} from "../root-reducer";

export const getCurrentOffer = (state) => state[NameSpace.CURRENT_OFFER].offer;
export const getNearbyOffers = (state) => state[NameSpace.CURRENT_OFFER].nearbyOffers;
export const getOfferReviews = (state) => state[NameSpace.CURRENT_OFFER].reviews;
