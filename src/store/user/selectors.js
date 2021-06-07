import {NameSpace} from "../root-reducer";

export const getUserInfo = (state) => state[NameSpace.USER].userInfo;
export const getFavorites = (state) => state[NameSpace.USER].favorites;
export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getAuthRequestCompleteStatus = (state) => state[NameSpace.USER].isAuthRequestComplete;
