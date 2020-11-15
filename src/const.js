export const cities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

export const OfferType = {
  MAIN: `cities`,
  NEARBY: `near-places`,
  FAVORITES: `favorites`
};

export const MapType = {
  MAIN: `cities`,
  PROPERTY: `property`
};

export const offerTypeToImageSize = {
  [OfferType.MAIN]: {
    width: 260,
    height: 200
  },
  [OfferType.NEARBY]: {
    width: 260,
    height: 200
  },
  [OfferType.FAVORITES]: {
    width: 150,
    height: 110
  }
};
