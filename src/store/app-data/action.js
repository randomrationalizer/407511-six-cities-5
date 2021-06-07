import {createAction} from "@reduxjs/toolkit";


export const ActionType = {
  CHANGE_CITY: `data/changeCity`,
  CHANGE_SORT_TYPE: `data/changeSortType`,
  LOAD_OFFERS: `data/loadOffers`,
  UPDATE_OFFERS: `data/updateOffers`,
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (city) => {
  return {
    payload: city
  };
});

export const changeSort = createAction(ActionType.CHANGE_SORT_TYPE, (sort) => {
  return {
    payload: sort
  };
});

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => {
  return {
    payload: offers
  };
});

export const updateOffers = createAction(ActionType.UPDATE_OFFERS, (offer) => {
  return {
    payload: offer
  };
});
