import {currentOffer, initialState} from "./current-offer";
import {loadCurrentOffer, loadNearbyOffers, loadOfferReviews, resetCurrentOffer} from "../../action";
import mockCurrentOffer from "../../../mocks/test-data/current-offer";
import mockNearbyOffers from "../../../mocks/test-data/nearby-offers";
import mockReviews from "../../../mocks/test-data/reviews";


describe(`Current Offer reduser works correctly`, () => {
  it(`Reduser without additional parameters should return initial state`, () => {
    expect(currentOffer(undefined, {})).toEqual(initialState);
  });

  it(`Reduser should update current offer by load offer`, () => {
    expect(currentOffer({offer: {}}, loadCurrentOffer(mockCurrentOffer)))
      .toEqual({offer: mockCurrentOffer});
  });

  it(`Reduser should reset current offer state to initial state`, () => {
    const mockState = {
      offer: mockCurrentOffer,
      reviews: mockReviews,
      nearbyOffers: mockNearbyOffers
    };

    expect(currentOffer(mockState, resetCurrentOffer())).toEqual(initialState);
  });

  it(`Reduser should update nearby offers by load offers`, () => {
    expect(currentOffer({nearbyOffers: []}, loadNearbyOffers(mockNearbyOffers)))
      .toEqual({nearbyOffers: mockNearbyOffers});
  });

  it(`Reduser should reviews by load offer reviews`, () => {
    expect(currentOffer({reviews: []}, loadOfferReviews(mockReviews)))
      .toEqual({reviews: mockReviews});
  });
});
