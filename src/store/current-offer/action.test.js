import mockCurrentOffer from "../../mocks/test-data/current-offer";
import mockNearbyOffers from "../../mocks/test-data/nearby-offers";
import mockReviews from "../../mocks/test-data/reviews";
import {ActionType, loadNearbyOffers, loadOfferReviews, loadCurrentOffer, resetCurrentOffer} from "./action";


describe(`Current Offer action creators works correctly`, () => {
  it(`Action creator for nearby offers load returns correct action with nearby offers payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: mockNearbyOffers
    };

    expect(loadNearbyOffers(mockNearbyOffers)).toEqual(expectedAction);
  });

  it(`Action creator for reviews load returns correct action with reviews payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFER_REVIEWS,
      payload: mockReviews
    };

    expect(loadOfferReviews(mockReviews)).toEqual(expectedAction);
  });

  it(`Action creator for load current offer returns correct action with offer payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_CURRENT_OFFER,
      payload: mockCurrentOffer
    };

    expect(loadCurrentOffer(mockCurrentOffer)).toEqual(expectedAction);
  });

  it(`Action creator for reset current offer returns correct action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_CURRENT_OFFER
    };

    expect(resetCurrentOffer()).toEqual(expectedAction);
  });
});
