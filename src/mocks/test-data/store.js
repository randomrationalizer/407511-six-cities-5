import {NameSpace} from "../../store/reducers/root-reducer";
import mockOffers from "./offers";
import mockReviews from "./reviews";
import mockNearbyOffers from "./nearby-offers";
import mockCurrentOffer from "./current-offer";
import mockUserInfo from "./user-info";
import mockFavorites from "./favorites";
import {adaptOfferToClient, adaptReviewToClient, adaptUserInfoToClient} from "../../utils/adapter";
import {cities, SortType, AuthorizationStatus} from "../../const";
import { getCitiesData } from "../../core";

const offers = mockOffers.map(adaptOfferToClient);
const allCities = getCitiesData(offers, cities);

export const mockStore = {
  [NameSpace.APP_DATA]: {
    currentCity: `Cologne`,
    allOffers: offers,
    cities: allCities,
    currentSort: SortType.DEFAULT
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
    isAuthRequestComplete: true,
    userInfo: adaptUserInfoToClient(mockUserInfo),
    favorites: mockFavorites.map(adaptOfferToClient)
  },
  [NameSpace.CURRENT_OFFER]: {
    offer: adaptOfferToClient(mockCurrentOffer),
    reviews: mockReviews.map(adaptReviewToClient),
    nearbyOffers: mockNearbyOffers.map(adaptOfferToClient)
  },
  [NameSpace.LOAD_STATUS]: {
    isOffersLoaded: true,
    isFavoritesLoaded: true,
    isCurrentOfferLoaded: true,
    errorMessage: null,
    isLoadFinished: true
  }
};
