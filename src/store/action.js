export const ActionType = {
  GET_CITY_OFFERS: `GET_CITY_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  ADD_REVIEW: `ADD_REVIEW`
};

export const ActionCreator = {
  getCityOffers: () => ({
    type: ActionType.GET_CITY_OFFERS
  }),
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  changeSort: (sort) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sort
  }),
  addReview: (offerId, newReview) => ({
    type: ActionType.ADD_REVIEW,
    payload: {
      offerId,
      newReview
    }
  })
};


