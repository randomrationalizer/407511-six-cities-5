export const ActionType = {
  GET_CITIES: `GET_CITIES`,
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  UPDATE_OFFERS: `UPDATE_OFFERS`,
  LOAD_CURRENT_OFFER: `LOAD_CURRENT_OFFER`,
  UPDATE_CURRENT_OFFER: `UPDATE_CURRENT_OFFER`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
  GET_USER_INFO: `GET_USER_INFO`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  UPDATE_NEARBY_OFFERS: `UPDATE_NEARBY_OFFERS`,
  LOAD_OFFER_REVIEWS: `LOAD_OFFER_REVIEWS`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  UPDATE_FAVORITE_OFFERS: `UPDATE_FAVORITE_OFFERS`,
  CHANGE_OFFERS_LOADING_STATUS: `CHANGE_OFFERS_LOADING_STATUS`,
  CHANGE_FAVORITES_LOADING_STATUS: `CHANGE_FAVORITES_LOADING_STATUS`,
  CHANGE_CURRENT_OFFER_LOADING_STATUS: `CHANGE_CURRENT_OFFER_LOADING_STATUS`,
};


export const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city
});

export const changeSort = (sort) => ({
  type: ActionType.CHANGE_SORT_TYPE,
  payload: sort
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers
});

export const updateOffers = (offer) => ({
  type: ActionType.UPDATE_OFFERS,
  payload: offer
});

export const getCities = () => ({
  type: ActionType.GET_CITIES
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRE_AUTHORIZATION,
  payload: status
});

export const getUserInfo = (userInfo) => ({
  type: ActionType.GET_USER_INFO,
  payload: userInfo
});

export const loadNearbyOffers = (offers) => ({
  type: ActionType.LOAD_NEARBY_OFFERS,
  payload: offers
});

export const updateNearbyOffers = (offers) => ({
  type: ActionType.UPDATE_NEARBY_OFFERS,
  payload: offers
});

export const loadOfferReviews = (reviews) => ({
  type: ActionType.LOAD_OFFER_REVIEWS,
  payload: reviews
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url
});

export const changeCurrentOfferLoadingStatus = (status) => ({
  type: ActionType.CHANGE_CURRENT_OFFER_LOADING_STATUS,
  payload: status
});

export const changeOffersLoadingStatus = (status) => ({
  type: ActionType.CHANGE_OFFERS_LOADING_STATUS,
  payload: status
});

export const loadFavoriteOffers = (offers) => ({
  type: ActionType.LOAD_FAVORITE_OFFERS,
  payload: offers
});

export const updateFavoriteOffers = (offer) => ({
  type: ActionType.UPDATE_FAVORITE_OFFERS,
  payload: offer
});

export const changeFavoritesLoadingStatus = (status) => ({
  type: ActionType.CHANGE_FAVORITES_LOADING_STATUS,
  payload: status
});

export const loadCurrentOffer = (offer) => ({
  type: ActionType.LOAD_CURRENT_OFFER,
  payload: offer
});

export const updateCurrentOffer = (update) => ({
  type: ActionType.UPDATE_CURRENT_OFFER,
  payload: update
});
