import {extend} from "../utils";
import {ActionType} from "./action";
import {filterOffers} from "../core";
import {offers} from "../mocks/offers";
import {cities} from "../const";

const defaultCity = cities[3]; // по умолчанию д.б. cities[0]

const initialState = {
  currentCity: defaultCity,
  allOffers: offers,
  cityOffers: filterOffers(offers, defaultCity),
  cities
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CITY_OFFERS:
      return extend(state, {
        cityOffers: filterOffers(state.allOffers, state.currentCity)
      });

    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload
      });
  }

  return state;
};

export {reducer};
