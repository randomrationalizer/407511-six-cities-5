import mockOffers from "../../mocks/test-data/offers";
import mockCurrentOffer from "../../mocks/test-data/current-offer";
import {ActionType, changeCity, changeSort, loadOffers, updateOffers} from "./action";


describe(`App Data Action creators works correctly`, () => {
  it(`Action creator for city change returns correct action with "Brussels" payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: `Brussels`
    };

    expect(changeCity(`Brussels`)).toEqual(expectedAction);
  });

  it(`Action creator for sort change returns correct action with "Popular" payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Popular`
    };

    expect(changeSort(`Popular`)).toEqual(expectedAction);
  });

  it(`Action creator for offers load returns correct action with offers payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: mockOffers
    };

    expect(loadOffers(mockOffers)).toEqual(expectedAction);
  });

  it(`Action creator for update offers returns correct action with updated offer payload`, () => {
    const expectedAction = {
      type: ActionType.UPDATE_OFFERS,
      payload: mockCurrentOffer
    };

    expect(updateOffers(mockCurrentOffer)).toEqual(expectedAction);
  });
});
