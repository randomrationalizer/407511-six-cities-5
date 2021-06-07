import {ActionType, setOffersLoadedStatus, setFavoritesLoadedStatus, setLoadFinishStatus} from "./action";


describe(`Load Status action creators works correctly`, () => {
  it(`Action creator for change offers load status returns correct action with "false" payload`, () => {
    const expectedAction = {
      type: ActionType.SET_OFFERS_LOADED_STATUS,
      payload: false
    };

    expect(setOffersLoadedStatus(false)).toEqual(expectedAction);
  });

  it(`Action creator for change favorites load status returns correct action with "true" payload`, () => {
    const expectedAction = {
      type: ActionType.SET_FAVORITES_LOADED_STATUS,
      payload: true
    };

    expect(setFavoritesLoadedStatus(true)).toEqual(expectedAction);
  });

  it(`Action creator for change load finish status returns correct action with "true" payload`, () => {
    const expectedAction = {
      type: ActionType.SET_LOAD_FINISH_STATUS,
      payload: true
    };

    expect(setLoadFinishStatus(true)).toEqual(expectedAction);
  });
});
