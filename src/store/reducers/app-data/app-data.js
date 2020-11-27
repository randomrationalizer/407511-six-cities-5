import {extend} from "../../../utils";
import {ActionType} from "../../action";
import {filterOffers, getPropertyReviews, sortOffers, getCitiesData} from "../../../core";
import {reviews} from "../../../mocks/reviews";
import {cities, SortType} from "../../../const";

const defaultCityIndex = 0;
const defaultSort = SortType.DEFAULT;

const initialState = {
  currentCity: {},
  allOffers: [],
  cityOffers: [],
  cities: [],
  currentSort: defaultSort,
  reviews
};


const appData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CITY_OFFERS:
      const currentOffers = sortOffers(filterOffers(state.allOffers, state.currentCity), state.currentSort);
      return extend(state, {
        cityOffers: currentOffers
      });

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

    case ActionType.ADD_REVIEW:
      const {offerId, newReview} = action.payload;
      const index = state.reviews.findIndex((property) => property.propertyId === offerId);

      let updatedOffer = {
        propertyId: offerId,
        reviews: [...getPropertyReviews(offerId, state.reviews), newReview]
      };
      let updatedReviews = {};

      if (index === -1) {
        updatedReviews = [...state.reviews, updatedOffer];
      } else {
        updatedReviews = [...state.reviews.slice(0, index), updatedOffer, ...state.reviews.slice(index + 1)];
      }

      return extend(state, {
        reviews: updatedReviews
      });

    case ActionType.LOAD_OFFERS:
      return extend(state, {
        allOffers: action.payload
      });
  }

  return state;
};

export {appData};
