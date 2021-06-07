import {combineReducers} from "redux";
import {appData} from "./app-data/app-data";
import {user} from "./user/user";
import {currentOffer} from "./current-offer/current-offer";
import {loadStatus} from "./load-status/load-status";

export const NameSpace = {
  APP_DATA: `APP_DATA`,
  USER: `USER`,
  CURRENT_OFFER: `CURRENT_OFFER`,
  LOAD_STATUS: `LOAD_STATUS`
};

export const rootReducer = combineReducers({
  [NameSpace.APP_DATA]: appData,
  [NameSpace.USER]: user,
  [NameSpace.CURRENT_OFFER]: currentOffer,
  [NameSpace.LOAD_STATUS]: loadStatus
});
