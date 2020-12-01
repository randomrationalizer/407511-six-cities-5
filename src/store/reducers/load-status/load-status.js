import {extend} from "../../../utils";
import {ActionType} from "../../action";


const initialState = {
  isOffersLoaded: false,
  isFavoritesLoaded: false,
  isCurrentOfferLoaded: false
};


const loadStatus = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_OFFER_LOADING_STATUS:
      return extend(state, {
        isCurrentOfferLoaded: action.payload
      });

    case ActionType.CHANGE_OFFERS_LOADING_STATUS:
      return extend(state, {
        isOffersLoaded: action.payload
      });

    case ActionType.CHANGE_FAVORITES_LOADING_STATUS:
      return extend(state, {
        isFavoritesLoaded: action.payload
      });
  }

  return state;
};

export {loadStatus};
