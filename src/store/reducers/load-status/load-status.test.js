import {loadStatus, initialState} from "./load-status";
import {
  changeCurrentOfferLoadedStatus,
  changeFavoritesLoadedStatus,
  changeLoadFinishStatus,
  changeOffersLoadedStatus,
  closeErrorMessage,
  setErrorMessage
} from "../../action";


describe(`Load Status reduser works correctly`, () => {
  it(`Reduser without additional parameters should return initial state`, () => {
    expect(loadStatus(undefined, {})).toEqual(initialState);
  });

  it(`Reduser should change current offer loaded status to a new value`, () => {
    expect(loadStatus({isCurrentOfferLoaded: false}, changeCurrentOfferLoadedStatus(true)))
      .toEqual({isCurrentOfferLoaded: true});
  });

  it(`Reduser should change offers loaded status to a new value`, () => {
    expect(loadStatus({isOffersLoaded: false}, changeOffersLoadedStatus(true)))
      .toEqual({isOffersLoaded: true});
  });

  it(`Reduser should change favorites loaded status to a new value`, () => {
    expect(loadStatus({isFavoritesLoaded: false}, changeFavoritesLoadedStatus(true)))
      .toEqual({isFavoritesLoaded: true});
  });

  it(`Reduser should change error message value to a new value`, () => {
    expect(loadStatus({errorMessage: null}, setErrorMessage(`Mock`)))
      .toEqual({errorMessage: `Mock`});
  });

  it(`Reduser should reset error message value to default value`, () => {
    expect(loadStatus({errorMessage: `Mock`}, closeErrorMessage()))
      .toEqual({errorMessage: null});
  });

  it(`Reduser should change load finish status to a new value`, () => {
    expect(loadStatus({isLoadFinished: false}, changeLoadFinishStatus(true)))
      .toEqual({isLoadFinished: true});
  });
});
