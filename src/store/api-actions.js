import {loadOffers, updateOffers} from "./app-data/action";
import {requireAuthorization, getUserInfo, loadFavoriteOffers, updateFavoriteOffers, setAuthRequestCompleteStatus} from "./user/action";
import {setOffersLoadedStatus, setFavoritesLoadedStatus, setLoadFinishStatus} from "./load-status/action";
import {loadNearbyOffers, loadOfferReviews, loadCurrentOffer} from "./current-offer/action";
import {getOffersLoadedStatus} from "./load-status/selectors";
import {getOffers} from "./app-data/selectors";
import {getOfferById} from "../core";
import {adaptUserInfoToClient, adaptOfferToClient, adaptReviewToClient} from "../utils/adapter";
import {AuthorizationStatus, APIRoute} from "../const";


export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(getUserInfo(adaptUserInfoToClient(data)));
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(setAuthRequestCompleteStatus(true));
    })
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(getUserInfo(adaptUserInfoToClient(data)));
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
    })
);

export const fetchOffer = (id) => (dispatch, getState, api) => {
  dispatch(setLoadFinishStatus(false));
  const isOffersLoaded = getOffersLoadedStatus(getState());
  const offers = getOffers(getState());

  return Promise.all([
    isOffersLoaded ?
      dispatch(loadCurrentOffer(getOfferById(offers, id)))
      :
      api.get(`${APIRoute.OFFERS}/${id}`)
        .then(({data}) => dispatch(loadCurrentOffer(adaptOfferToClient(data)))),
    api.get(`${APIRoute.REVIEWS}/${id}`)
      .then(({data}) => dispatch(loadOfferReviews(data.map(adaptReviewToClient))))
      .catch(() => dispatch(loadOfferReviews([]))),
    api.get(`${APIRoute.OFFERS}/${id}/${APIRoute.NEARBY}`)
      .then(({data}) => dispatch(loadNearbyOffers(data.map(adaptOfferToClient))))
      .catch(() => dispatch(loadNearbyOffers([])))
  ])
  .finally(() => dispatch(setLoadFinishStatus(true)));
};

export const fetchOffers = () => (dispatch, _getState, api) => {
  dispatch(setLoadFinishStatus(false));
  return api.get(APIRoute.OFFERS)
    .finally(() => dispatch(setLoadFinishStatus(true)))
    .then(({data}) => {
      dispatch(loadOffers(data.map(adaptOfferToClient)));
      dispatch(setOffersLoadedStatus(true));
    });
};

export const fetchFavoriteOffers = () => (dispatch, _getState, api) => {
  dispatch(setLoadFinishStatus(false));
  return api.get(APIRoute.FAVORITES)
    .finally(() => dispatch(setLoadFinishStatus(true)))
    .then(({data}) => {
      dispatch(loadFavoriteOffers(data.map(adaptOfferToClient)));
      dispatch(setFavoritesLoadedStatus(true));
    });
};

export const changeFavoriteStatus = (id, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITES}/${id}/${status}`)
    .then(({data}) => {
      const offer = adaptOfferToClient(data);
      dispatch(updateOffers(offer));
      dispatch(updateFavoriteOffers(offer));
    })
);

export const postNewReview = (id, review) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, review)
    .then(({data}) => dispatch(loadOfferReviews(data.map(adaptReviewToClient))))
);
