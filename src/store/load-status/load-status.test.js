import {loadStatus, initialState} from "./load-status";
import {setFavoritesLoadedStatus, setLoadFinishStatus, setOffersLoadedStatus} from "./action";


describe(`Load Status reduser works correctly`, () => {
  it(`Reduser without additional parameters should return initial state`, () => {
    expect(loadStatus(undefined, {})).toEqual(initialState);
  });

  it(`Reduser should change offers loaded status to a new value`, () => {
    expect(loadStatus({isOffersLoaded: false}, setOffersLoadedStatus(true)))
      .toEqual({isOffersLoaded: true});
  });

  it(`Reduser should change favorites loaded status to a new value`, () => {
    expect(loadStatus({isFavoritesLoaded: false}, setFavoritesLoadedStatus(true)))
      .toEqual({isFavoritesLoaded: true});
  });

  it(`Reduser should change load finish status to a new value`, () => {
    expect(loadStatus({isLoadFinished: false}, setLoadFinishStatus(true)))
      .toEqual({isLoadFinished: true});
  });
});
