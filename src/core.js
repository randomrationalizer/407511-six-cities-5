import {SortType} from "./const";

export const filterOffers = (allOffers, city) => {
  return allOffers.filter((offer) => offer.city.name === city.name);
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

export const getPropertyReviews = (id, allReviews) => {
  const propertyReviews = allReviews.find((property) => property.propertyId === id);
  return propertyReviews ? propertyReviews.reviews : [];
};

export const getCitiesData = (offers, cityNames) => {
  return cityNames.map((cityName) => offers.find((offer) => offer.city.name === cityName).city);
};
