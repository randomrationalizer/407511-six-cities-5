import {extend} from "../../../utils";
import {ActionType} from "../../action";
import {updateOffer} from "../../../core";


const initialState = {
  offer: {},
  reviews: [],
  nearbyOffers: []
};


const currentOffer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CURRENT_OFFER:
      return extend(state, {
        offer: action.payload
      });

    case ActionType.UPDATE_CURRENT_OFFER:
      return extend(state, {
        offer: extend(state.offer, action.payload)
      });

    case ActionType.LOAD_NEARBY_OFFERS:
      return extend(state, {
        nearbyOffers: action.payload
      });

    case ActionType.UPDATE_NEARBY_OFFERS:
      const updatedOffer = action.payload;
      return extend(state, {
        nearbyOffers: updateOffer(updatedOffer, state.nearbyOffers)
      });

    case ActionType.LOAD_OFFER_REVIEWS:
      return extend(state, {
        reviews: action.payload
      });
  }

  return state;
};

export {currentOffer};

