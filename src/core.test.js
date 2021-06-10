import {SortType} from "./const";
import {
  updateAllOffers,
  updateFavorites,
  getOfferById,
  sortOffers,
  filterOffers,
  getCityData,
  getCitiesData
} from "./core";
import mockOffers from "./mocks/test-data/offers";


describe(`Test updateFavorites function`, () => {
  it(`Should add current offer in favorites list if it is not in favorites`, () => {
    const offer = {id: 3};
    const favorites = [
      {id: 1},
      {id: 2}
    ];
    const expected = [
      {id: 1},
      {id: 2},
      {id: 3}
    ];

    expect(updateFavorites(offer, favorites)).toEqual(expected);
  });

  it(`Should remove current offer from favorites list if it is in favorites`, () => {
    const offer = {id: 1};
    const favorites = [
      {id: 1},
      {id: 2},
      {id: 3}
    ];
    const expected = [
      {id: 2},
      {id: 3}
    ];

    expect(updateFavorites(offer, favorites)).toEqual(expected);
  });
});

describe(`Test updateAllOffers function`, () => {
  it(`Should update offer object in the offer list`, () => {
    const updatedOffer = {id: 3, isFavorite: true};
    const offers = [
      {id: 1, isFavorite: false},
      {id: 2, isFavorite: false},
      {id: 3, isFavorite: false}
    ];
    const expected = [
      {id: 1, isFavorite: false},
      {id: 2, isFavorite: false},
      {id: 3, isFavorite: true}
    ];

    expect(updateAllOffers(updatedOffer, offers)).toEqual(expected);
  });

  it(`Should return unchanged offer list if the offer is not in offers list`, () => {
    const updatedOffer = {id: 5, isFavorite: false};
    const offers = [
      {id: 1, isFavorite: false},
      {id: 2, isFavorite: false},
      {id: 3, isFavorite: false}
    ];

    expect(updateAllOffers(updatedOffer, offers)).toEqual(offers);
  });
});

describe(`Test getOfferById function`, () => {
  it(`Should return offer object with specified id`, () => {
    const id = 3;
    const offers = [
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4}
    ];
    const expected = {id: 3};

    expect(getOfferById(offers, id)).toEqual(expected);
  });
});

describe(`Test sortOffers function`, () => {
  it(`Should return offers list sorted in the order received from the server `, () => {
    const offers = [
      {id: 1, price: 3},
      {id: 2, price: 1},
      {id: 3, price: 2}
    ];

    expect(sortOffers(offers, SortType.DEFAULT)).toEqual(offers);
  });

  it(`Should return offers list sorted by price from low to high`, () => {
    const offers = [
      {id: 1, price: 3},
      {id: 2, price: 1},
      {id: 3, price: 2}
    ];
    const expected = [
      {id: 2, price: 1},
      {id: 3, price: 2},
      {id: 1, price: 3},
    ];

    expect(sortOffers(offers, SortType.PRICE_UP)).toEqual(expected);
  });

  it(`Should return offers list sorted by price from high to low`, () => {
    const offers = [
      {id: 1, price: 3},
      {id: 2, price: 1},
      {id: 3, price: 2}
    ];
    const expected = [
      {id: 1, price: 3},
      {id: 3, price: 2},
      {id: 2, price: 1}
    ];

    expect(sortOffers(offers, SortType.PRICE_DOWN)).toEqual(expected);
  });

  it(`Should return offers list sorted by rating from high to low`, () => {
    const offers = [
      {id: 1, rating: 5},
      {id: 2, rating: 2},
      {id: 3, rating: 4}
    ];
    const expected = [
      {id: 1, rating: 5},
      {id: 3, rating: 4},
      {id: 2, rating: 2}
    ];

    expect(sortOffers(offers, SortType.RATING_DOWN)).toEqual(expected);
  });
});

describe(`Test filterOffers function`, () => {
  it(`Should return offer list filtered by specified city`, () => {
    const city = `Hamburg`;
    const offers = [
      {id: 1, city: {name: `Brussels`}},
      {id: 2, city: {name: `Hamburg`}},
      {id: 3, city: {name: `Amsterdam`}},
      {id: 4, city: {name: `Hamburg`}}
    ];
    const expected = [
      {id: 2, city: {name: `Hamburg`}},
      {id: 4, city: {name: `Hamburg`}}
    ];

    expect(filterOffers(offers, city)).toEqual(expected);
  });

  it(`Should return empty offer list if none of offers does not match the specified city`, () => {
    const city = `Dusseldorf`;
    const offers = [
      {id: 1, city: {name: `Brussels`}},
      {id: 2, city: {name: `Cologne`}},
      {id: 3, city: {name: `Amsterdam`}},
      {id: 4, city: {name: `Hamburg`}}
    ];
    const expected = [];

    expect(filterOffers(offers, city)).toEqual(expected);
  });
});

describe(`Test getCityData function`, () => {
  it(`Should return city data object from offer list`, () => {
    const city = `Brussels`;
    const offers = mockOffers;
    const expected = {
      name: `Brussels`,
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    };

    expect(getCityData(offers, city)).toEqual(expected);
  });
});

describe(`Test getCitiesData function`, () => {
  it(`Should return array of city data objects that matches specified cities`, () => {
    const cities = [`Paris`, `Cologne`, `Brussels`];
    const offers = mockOffers;
    const expected = [
      {
        name: `Paris`,
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13
        }
      },
      {
        name: `Cologne`,
        location: {
          latitude: 50.938361,
          longitude: 6.959974,
          zoom: 13
        }
      },
      {
        name: `Brussels`,
        location: {
          latitude: 50.846557,
          longitude: 4.351697,
          zoom: 13
        }
      }
    ];

    expect(getCitiesData(offers, cities)).toEqual(expected);
  });
});
