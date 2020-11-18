import {SortType} from "./const";

export const filterOffers = (allOffers, city) => {
  return allOffers.filter((offer) => offer.city === city.name);
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
