export const getCitiesFromOffers = (offers) => {
  const cities = offers.slice().map((offer) => offer.city.name).sort();
  return [...new Set(cities)];
};
