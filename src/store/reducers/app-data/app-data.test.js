import {appData, initialState} from "./app-data";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../../services/api";
import {getCities, changeCity, setDefaultCity, changeSort, loadOffers, updateOffers, ActionType} from "../../action";
import {fetchOffers} from "../../api-actions";
import mockCities from "../../../mocks/test-data/cities";
import mockOffers, {offers as mockRawOffers} from "../../../mocks/test-data/offers";
import {NameSpace} from "../root-reducer";
import {SortType, DEFAULT_CITY, APIRoute, HttpCode} from "../../../const";


const api = createAPI(() => {});

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

describe(`App Data async operations works correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOffers();

    const getState = () => ({
      [NameSpace.APP_DATA]: {
        currentCity: DEFAULT_CITY
      }});

    apiMock
      .onGet(APIRoute.OFFERS)
      .reply(HttpCode.OK, mockRawOffers);

    return offersLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_LOAD_FINISH_STATUS,
          payload: false
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: mockOffers
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.GET_CITIES
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.CHANGE_LOAD_FINISH_STATUS,
          payload: true
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.CHANGE_OFFERS_LOADED_STATUS,
          payload: true
        });
      });
  });
});
