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

export const HttpCode = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
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
