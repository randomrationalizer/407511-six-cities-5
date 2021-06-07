import {createAction} from "@reduxjs/toolkit";


export const ActionType = {
  SET_OFFERS_LOADED_STATUS: `app/setOffersLoadedStatus`,
  SET_FAVORITES_LOADED_STATUS: `app/setFavoritesLoadedStatus`,
  SET_LOAD_FINISH_STATUS: `app/setLoadFinishStatus`
};

export const setOffersLoadedStatus = createAction(ActionType.SET_OFFERS_LOADED_STATUS, (status) => {
  return {
    payload: status
  };
});

export const setFavoritesLoadedStatus = createAction(ActionType.SET_FAVORITES_LOADED_STATUS, (status) => {
  return {
    payload: status
  };
});

export const setLoadFinishStatus = createAction(ActionType.SET_LOAD_FINISH_STATUS, (status) => {
  return {
    payload: status
  };
});
