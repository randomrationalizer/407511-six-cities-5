import configureStore from "redux-mock-store";
import {NameSpace} from "../../store/root-reducer";
import mockOffers from "./offers";
import mockReviews from "./reviews";
import mockNearbyOffers from "./nearby-offers";
import mockCurrentOffer from "./current-offer";
import mockUserInfo from "./user-info";
import mockFavorites from "./favorites";
import mockCities from "./cities";
import {SortType, AuthorizationStatus, DEFAULT_CITY} from "../../const";


export default {
  [NameSpace.APP_DATA]: {
    currentCity: DEFAULT_CITY,
    allOffers: mockOffers,
    cities: mockCities,
    currentSort: SortType.DEFAULT
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
    isAuthRequestComplete: true,
    userInfo: mockUserInfo,
    favorites: mockFavorites
  },
  [NameSpace.CURRENT_OFFER]: {
    offer: mockCurrentOffer,
    reviews: mockReviews,
    nearbyOffers: mockNearbyOffers
  },
  [NameSpace.LOAD_STATUS]: {
    isOffersLoaded: true,
    isFavoritesLoaded: true,
    isCurrentOfferLoaded: true,
    errorMessage: null,
    isLoadFinished: true
  }
};
