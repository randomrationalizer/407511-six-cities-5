import {createSelector} from "@reduxjs/toolkit";
import {NameSpace} from "../root-reducer";
import {sortOffers, filterOffers, getCityData} from "../../core";

export const getOffers = (state) => state[NameSpace.APP_DATA].allOffers;
export const getCities = (state) => state[NameSpace.APP_DATA].cities;
export const getCurrentCity = (state) => state[NameSpace.APP_DATA].currentCity;
export const getCurrentSort = (state) => state[NameSpace.APP_DATA].currentSort;

export const getCityOffers = createSelector(
    getOffers,
    getCurrentCity,
    getCurrentSort,
    (offers, city, sort) => sortOffers(filterOffers(offers, city), sort)
);

export const getCurrentCityData = createSelector(
    getOffers,
    getCurrentCity,
    (offers, currentCity) => getCityData(offers, currentCity)
);
