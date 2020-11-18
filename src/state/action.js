export const ActionType = {
  GET_CITY_OFFERS: `GET_CITY_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`
};

export const ActionCreator = {
  getCityOffers: () => ({
    type: ActionType.GET_CITY_OFFERS,
  }),
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  })
};


