import {extend} from "../../../utils";
import {ActionType} from "../../action";
import {AuthorizationStatus} from "../../../const";


const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {}
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
  }

  return state;
};

export {user};
