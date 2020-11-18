import {extend} from "../utils";
import {ActionType} from "./action";
import {filterOffers, sortOffers} from "../core";
import {offers} from "../mocks/offers";
import {cities, SortType} from "../const";

const defaultCity = cities[3];
const defaultSort = SortType.DEFAULT;

const initialState = {
  currentCity: defaultCity,
  allOffers: offers,
  cityOffers: filterOffers(offers, defaultCity),
  cities,
  currentSort: defaultSort
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CITY_OFFERS:
      const currentOffers = sortOffers(filterOffers(state.allOffers, state.currentCity), state.currentSort);
      return extend(state, {
        cityOffers: currentOffers
      });

    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload
      });

    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        currentSort: action.payload
      });
  }

  return state;
};

export {reducer};
