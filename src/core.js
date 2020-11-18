export const filterOffers = (allOffers, city) => {
  return allOffers.filter((offer) => offer.city === city.name);
};
