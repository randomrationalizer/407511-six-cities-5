export const ActionType = {
  GET_CITY_OFFERS: `GET_CITY_OFFERS`,
  GET_CITIES: `GET_CITIES`,
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  ADD_REVIEW: `ADD_REVIEW`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`
};

export const getCityOffers = () => ({
  type: ActionType.GET_CITY_OFFERS
});

export const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city
});

export const changeSort = (sort) => ({
  type: ActionType.CHANGE_SORT_TYPE,
  payload: sort
});

export const addReview = (offerId, newReview) => ({
  type: ActionType.ADD_REVIEW,
  payload: {
    offerId,
    newReview
  }
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers
});

export const getCities = () => ({
  type: ActionType.GET_CITIES
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRE_AUTHORIZATION,
  payload: status
});
