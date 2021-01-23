import {SortType} from "./const";

export const filterOffers = (allOffers, city) => {
  return allOffers.filter((offer) => offer.city.name === city);
};

export const getOfferById = (allOffers, id) => {
  return allOffers.find((offer) => offer.id === id);
};

const sortPriceDown = (first, second) => {
  return second.price - first.price;
};

const sortRatingDown = (first, second) => {
  return second.rating - first.rating;
};

const sortPriceUp = (first, second) => {
  return first.price - second.price;
};

export const sortOffers = (offers, currentSort) => {
  switch (currentSort) {
    case SortType.DEFAULT:
      return offers;
    case SortType.PRICE_UP:
      return offers.sort(sortPriceUp);
    case SortType.PRICE_DOWN:
      return offers.sort(sortPriceDown);
    case SortType.RATING_DOWN:
      return offers.sort(sortRatingDown);
    default:
      return offers;
  }
};

export const getCityData = (offers, cityName) => {
  return offers.find((offer) => offer.city.name === cityName).city;
};

export const getCitiesData = (offers, cities) => {
  return cities.map((city) => getCityData(offers, city));
};

export const updateOffer = (updatedOffer, allOffers) => {
  const index = allOffers.findIndex((offer) => offer.id === updatedOffer.id);
  let updatedOffers = {};

  if (index === -1) {
    updatedOffers = allOffers;
  } else {
    updatedOffers = [
      ...allOffers.slice(0, index),
      updatedOffer,
      ...allOffers.slice(index + 1)
    ];
  }

  return updatedOffers;
};

export const updateFavorites = (updatedOffer, favorites) => {
  const index = favorites.findIndex((offer) => offer.id === updatedOffer.id);

  let updatedFavorites = {};

  if (index === -1) {
    updatedFavorites = [...favorites, updatedOffer];
  } else {
    updatedFavorites = [
      ...favorites.slice(0, index),
      ...favorites.slice(index + 1)
    ];
  }

  return updatedFavorites;
};
