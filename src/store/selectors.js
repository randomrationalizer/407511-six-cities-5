import {createSelector} from 'reselect';
import {NameSpace} from "./reducers/root-reducer";
import {sortOffers, filterOffers} from "../core";


export const getOffers = (state) => state[NameSpace.APP_DATA].allOffers;
export const getCities = (state) => state[NameSpace.APP_DATA].cities;
export const getCurrentCity = (state) => state[NameSpace.APP_DATA].currentCity;
export const getCurrentSort = (state) => state[NameSpace.APP_DATA].currentSort;

export const getCurrentOffer = (state) => state[NameSpace.CURRENT_OFFER].offer;
export const getNearbyOffers = (state) => state[NameSpace.CURRENT_OFFER].nearbyOffers;
export const getOfferReviews = (state) => state[NameSpace.CURRENT_OFFER].reviews;

export const getUserInfo = (state) => state[NameSpace.USER].userInfo;
export const getFavorites = (state) => state[NameSpace.USER].favorites;
export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getAuthRequestCompleteStatus = (state) => state[NameSpace.USER].isAuthRequestComplete;

export const getLoadFinishStatus = (state) => state[NameSpace.LOAD_STATUS].isLoadFinished;
export const getOffersLoadedStatus = (state) => state[NameSpace.LOAD_STATUS].isOffersLoaded;
export const getFavoritesLoadedStatus = (state) => state[NameSpace.LOAD_STATUS].isFavoritesLoaded;
export const getCurrentOfferLoadedStatus = (state) => state[NameSpace.LOAD_STATUS].isCurrentOfferLoaded;

export const getErrorMessage = (state) => state[NameSpace.LOAD_STATUS].errorMessage;


export const getCityOffers = createSelector(
    getOffers,
    getCurrentCity,
    getCurrentSort,
    (offers, city, sort) => sortOffers(filterOffers(offers, city), sort)
);

export const getOffersIds = createSelector(
    getOffers,
    (offers) => offers.map((offer) => offer.id)
);
