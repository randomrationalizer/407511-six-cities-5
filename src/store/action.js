export const ActionType = {
  GET_CITIES: `GET_CITIES`,
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  UPDATE_OFFERS: `UPDATE_OFFERS`,
  LOAD_CURRENT_OFFER: `LOAD_CURRENT_OFFER`,
  RESET_CURRENT_OFFER: `RESET_CURRENT_OFFER`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  GET_USER_INFO: `GET_USER_INFO`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  LOAD_OFFER_REVIEWS: `LOAD_OFFER_REVIEWS`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  UPDATE_FAVORITE_OFFERS: `UPDATE_FAVORITE_OFFERS`,
  CHANGE_OFFERS_LOADED_STATUS: `CHANGE_OFFERS_LOADED_STATUS`,
  CHANGE_FAVORITES_LOADED_STATUS: `CHANGE_FAVORITES_LOADED_STATUS`,
  CHANGE_CURRENT_OFFER_LOADED_STATUS: `CHANGE_CURRENT_OFFER_LOADED_STATUS`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
  CLOSE_ERROR_MESSAGE: `CLOSE_ERROR_MESSAGE`,
  CHANGE_LOAD_FINISH_STATUS: `CHANGE_LOAD_FINISH_STATUS`,
  CHANGE_AUTH_REQUEST_COMPLETE_STATUS: `CHANGE_AUTH_REQUEST_COMPLETE_STATUS`
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

export const loadOfferReviews = (reviews) => ({
  type: ActionType.LOAD_OFFER_REVIEWS,
  payload: reviews
});

export const changeCurrentOfferLoadedStatus = (status) => ({
  type: ActionType.CHANGE_CURRENT_OFFER_LOADED_STATUS,
  payload: status
});

export const changeOffersLoadedStatus = (status) => ({
  type: ActionType.CHANGE_OFFERS_LOADED_STATUS,
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

export const changeFavoritesLoadedStatus = (status) => ({
  type: ActionType.CHANGE_FAVORITES_LOADED_STATUS,
  payload: status
});

export const loadCurrentOffer = (offer) => ({
  type: ActionType.LOAD_CURRENT_OFFER,
  payload: offer
});

export const setErrorMessage = (message) => ({
  type: ActionType.SET_ERROR_MESSAGE,
  payload: message
});

export const closeErrorMessage = () => ({
  type: ActionType.CLOSE_ERROR_MESSAGE
});

export const resetCurrentOffer = () => ({
  type: ActionType.RESET_CURRENT_OFFER
});

export const changeLoadFinishStatus = (status) => ({
  type: ActionType.CHANGE_LOAD_FINISH_STATUS,
  payload: status
});

export const changeAuthRequestCompleteStatus = (status) => ({
  type: ActionType.CHANGE_AUTH_REQUEST_COMPLETE_STATUS,
  payload: status
});
