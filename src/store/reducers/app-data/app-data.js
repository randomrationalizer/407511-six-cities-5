import {extend} from "../../../utils";
import {ActionType} from "../../action";
import {getCitiesData, updateOffer} from "../../../core";
import {cities, SortType} from "../../../const";

const defaultCityIndex = 0;
const defaultSort = SortType.DEFAULT;

const initialState = {
  currentCity: {},
  allOffers: [],
  cities: [],
  currentSort: defaultSort
};


const appData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CITIES:
      const citiesData = getCitiesData(state.allOffers, cities);
      return extend(state, {
        cities: citiesData
      });

    case ActionType.CHANGE_CITY:
      const cityName = action.payload;
      const newCity = cityName ? state.cities.find((city) => city.name === cityName) : state.cities[defaultCityIndex];

      return extend(state, {
        currentCity: newCity
      });

    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        currentSort: action.payload
      });

    case ActionType.LOAD_OFFERS:
      return extend(state, {
        allOffers: action.payload
      });

    case ActionType.UPDATE_OFFERS:
      const updatedOffer = action.payload;
      return extend(state, {
        allOffers: updateOffer(updatedOffer, state.allOffers)
      });
  }

  return state;
};

export {appData};
