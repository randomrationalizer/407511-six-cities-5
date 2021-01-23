import {extend} from "../../../utils/common";
import {ActionType} from "../../action";
import {getCitiesData, updateOffer} from "../../../core";
import {cities, SortType} from "../../../const";

const defaultCityIndex = 0;
const defaultSort = SortType.DEFAULT;

const initialState = {
  currentCity: null,
  allOffers: [],
  cities: [],
  currentSort: defaultSort
};


const appData = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.GET_CITIES:
      const citiesData = getCitiesData(state.allOffers, cities);
      return extend(state, {
        cities: citiesData
      });

    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: payload
      });

    case ActionType.SET_DEFAULT_CITY:
      return extend(state, {
        currentCity: cities[defaultCityIndex]
      });

    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        currentSort: payload
      });

    case ActionType.LOAD_OFFERS:
      return extend(state, {
        allOffers: payload
      });

    case ActionType.UPDATE_OFFERS:
      const updatedOffer = payload;
      return extend(state, {
        allOffers: updateOffer(updatedOffer, state.allOffers)
      });
  }

  return state;
};

export {appData};
