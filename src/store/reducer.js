import {extend} from "../utils";
import {ActionType} from "./action";
import {filterOffers, getPropertyReviews, sortOffers} from "../core";
import {offers} from "../mocks/offers";
import {reviews} from "../mocks/reviews";
import {favorites} from "../mocks/favorites";
import {cities, SortType} from "../const";

const defaultCity = cities[3];
const defaultSort = SortType.DEFAULT;

const initialState = {
  currentCity: defaultCity,
  allOffers: offers,
  cityOffers: filterOffers(offers, defaultCity),
  cities,
  currentSort: defaultSort,
  reviews,
  favorites
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

  }

  return state;
};

export {reducer};
