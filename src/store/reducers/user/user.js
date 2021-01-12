import {extend} from "../../../utils";
import {ActionType} from "../../action";
import {AuthorizationStatus} from "../../../const";
import {updateFavorites} from "../../../core";


const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isAuthRequestComplete: false,
  userInfo: {},
  favorites: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload
      });

    case ActionType.GET_USER_INFO:
      return extend(state, {
        userInfo: action.payload
      });

    case ActionType.LOAD_FAVORITE_OFFERS:
      return extend(state, {
        favorites: action.payload
      });

    case ActionType.UPDATE_FAVORITE_OFFERS:
      const updatedOffer = action.payload;
      return extend(state, {
        favorites: updateFavorites(updatedOffer, state.favorites)
      });

    case ActionType.CHANGE_AUTH_REQUEST_COMPLETE_STATUS:
      return extend(state, {
        isAuthRequestComplete: action.payload
      });
  }

  return state;
};

export {user};
