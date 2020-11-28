import {combineReducers} from "redux";
import {appData} from "./app-data/app-data";
import {user} from "./user/user";

const NameSpace = {
  DATA: `DATA`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.USER]: user
});
