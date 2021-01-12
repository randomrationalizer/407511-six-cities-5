import {extend} from "../../../utils";
import {ActionType} from "../../action";


const initialState = {
  isOffersLoaded: false,
  isFavoritesLoaded: false,
  isCurrentOfferLoaded: false,
  errorMessage: null,
  isLoadFinished: false
};


const loadStatus = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_OFFER_LOADED_STATUS:
      return extend(state, {
        isCurrentOfferLoaded: action.payload
      });

    case ActionType.CHANGE_OFFERS_LOADED_STATUS:
      return extend(state, {
        isOffersLoaded: action.payload
      });

    case ActionType.CHANGE_FAVORITES_LOADED_STATUS:
      return extend(state, {
        isFavoritesLoaded: action.payload
      });
    case ActionType.SET_ERROR_MESSAGE:
      return extend(state, {
        errorMessage: action.payload
      });

    case ActionType.CLOSE_ERROR_MESSAGE:
      return extend(state, {
        errorMessage: null
      });

    case ActionType.CHANGE_LOAD_FINISH_STATUS:
      return extend(state, {
        isLoadFinished: action.payload
      });
  }

  return state;
};

export {loadStatus};
