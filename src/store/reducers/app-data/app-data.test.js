import {appData, initialState} from "./app-data";
import {getCities, changeCity, setDefaultCity, changeSort, loadOffers, updateOffers} from "../../action";
import mockCities from "../../../mocks/test-data/cities";
import mockOffers from "../../../mocks/test-data/offers";
import {SortType, DEFAULT_CITY} from "../../../const";


describe(`App Data reduser works correctly`, () => {
  it(`Reduser without additional parameters should return initial state`, () => {
    expect(appData(undefined, {})).toEqual(initialState);
  });

  it(`Reduser should update full cities data from offers array`, () => {
    expect(appData({allOffers: mockOffers, cities: []}, getCities()))
      .toEqual({allOffers: mockOffers, cities: mockCities});
  });

  it(`Reduser should change current city value to new value`, () => {
    expect(appData({currentCity: DEFAULT_CITY}, changeCity(`Moscow`)))
      .toEqual({currentCity: `Moscow`});
  });

  it(`Reduser should reset current city value to default value`, () => {
    expect(appData({currentCity: `Moscow`}, setDefaultCity()))
      .toEqual({currentCity: DEFAULT_CITY});
  });

  it(`Reduser should change sort type value to new value`, () => {
    expect(appData({currentSort: SortType.DEFAULT}, changeSort(SortType.PRICE_DOWN)))
      .toEqual({currentSort: SortType.PRICE_DOWN});
  });

  it(`Reduser should update offers by load offers`, () => {
    expect(appData({allOffers: []}, loadOffers(mockOffers)))
      .toEqual({allOffers: mockOffers});
  });

  it(`Reduser should update offers array by load updated offer`, () => {
    const [offerToUpdate, ...otherOffers] = mockOffers;
    const updatedOffer = Object.assign({}, offerToUpdate, {title: `Mock`});
    expect(appData({allOffers: mockOffers}, updateOffers(updatedOffer)))
      .toEqual({allOffers: [updatedOffer, ...otherOffers]});
  });
});
