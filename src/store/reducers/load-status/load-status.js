import {extend} from "../../../utils/common";
import {ActionType} from "../../action";


const initialState = {
  isOffersLoaded: false,
  isFavoritesLoaded: false,
  isCurrentOfferLoaded: false,
  errorMessage: null,
  isLoadFinished: false
};


const loadStatus = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.CHANGE_CURRENT_OFFER_LOADED_STATUS:
      return extend(state, {
        isCurrentOfferLoaded: payload
      });

    case ActionType.CHANGE_OFFERS_LOADED_STATUS:
      return extend(state, {
        isOffersLoaded: payload
      });

    case ActionType.CHANGE_FAVORITES_LOADED_STATUS:
      return extend(state, {
        isFavoritesLoaded: payload
      });
    case ActionType.SET_ERROR_MESSAGE:
      return extend(state, {
        errorMessage: payload
      });

    case ActionType.CLOSE_ERROR_MESSAGE:
      return extend(state, {
        errorMessage: null
      });

    case ActionType.CHANGE_LOAD_FINISH_STATUS:
      return extend(state, {
        isLoadFinished: payload
      });
  }

  return state;
};

export {loadStatus};
