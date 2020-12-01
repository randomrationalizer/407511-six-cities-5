
// export const cities = [
//   {
//     name: `Paris`,
//     coords: {
//       latitude: 48.864716,
//       longitude: 2.349014
//     }
//   },
//   {
//     name: `Cologne`,
//     coords: {
//       latitude: 50.935173,
//       longitude: 6.953101
//     }
//   },
//   {
//     name: `Brussels`,
//     coords: {
//       latitude: 50.8505,
//       longitude: 4.3488
//     }
//   },
//   {
//     name: `Amsterdam`,
//     coords: {
//       latitude: 52.38333,
//       longitude: 4.9
//     }
//   },
//   {
//     name: `Hamburg`,
//     coords: {
//       latitude: 53.551086,
//       longitude: 9.993682
//     }
//   },
//   {
//     name: `Dusseldorf`,
//     coords: {
//       latitude: 51.233334,
//       longitude: 6.783333
//     }
//   }
// ];

export const cities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

export const OfferType = {
  MAIN: `cities`,
  NEARBY: `near-places`,
  FAVORITES: `favorites`
};

export const OfferPageType = {
  CARD: `CARD`,
  DETAILS: `DETAILS`
};

export const MapType = {
  MAIN: `cities`,
  PROPERTY: `property`
};

export const SortType = {
  DEFAULT: `DEFAULT`,
  PRICE_UP: `PRICE_UP`,
  PRICE_DOWN: `PRICE_DOWN`,
  RATING_DOWN: `RATING_DOWN`
};

export const KeyCode = {
  ENTER: 13,
  SPACE: 32
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

export const AppRoute = {
  MAIN: `/`,
  OFFERS: `/hotels`,
  FAVORITES: `/favorite`,
  LOGIN: `/login`,
  NOT_FOUND: `/404`
};

export const APIRoute = {
  OFFERS: `/hotels`,
  NEARBY: `nearby`,
  FAVORITES: `/favorite`,
  REVIEWS: `/comments`,
  LOGIN: `/login`
};
