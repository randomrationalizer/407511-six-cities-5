import {
  getCities,
  loadOffers,
  requireAuthorization,
  getUserInfo,
  loadNearbyOffers,
  loadOfferReviews,
  updateOffers,
  loadCurrentOffer,
  loadFavoriteOffers,
  updateFavoriteOffers,
  changeOffersLoadedStatus,
  changeFavoritesLoadedStatus,
  changeCurrentOfferLoadedStatus,
  changeLoadFinishStatus,
  changeAuthRequestCompleteStatus,
  setDefaultCity
} from "./action";
import {getCurrentCity, getOffers} from "../store/selectors";
import {getOfferById} from "../core";
import {adaptUserInfoToClient, adaptOfferToClient, adaptReviewToClient} from "../utils/adapter";
import {AuthorizationStatus, APIRoute} from "../const";


export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(getUserInfo(adaptUserInfoToClient(data)));
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(changeAuthRequestCompleteStatus(true));
    })
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(getUserInfo(adaptUserInfoToClient(data)));
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
    })
);

const fetchNearbyOffers = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}/${APIRoute.NEARBY}`)
    .then(({data}) => dispatch(loadNearbyOffers(data.map(adaptOfferToClient))))
    .catch(() => {
      dispatch(loadNearbyOffers([]));
    })
);

const fetchOfferReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(loadOfferReviews(data.map(adaptReviewToClient))))
    .catch(() => {
      dispatch(loadOfferReviews([]));
    })
);

const fetchOfferById = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(({data}) => dispatch(loadCurrentOffer(adaptOfferToClient(data))))
);

export const getOfferDetails = (id) => (dispatch, _getState, _api) => (
  Promise.all([
    dispatch(changeLoadFinishStatus(false)),
    dispatch(fetchOfferById(id))
  ])
  .then(() => dispatch(fetchOfferReviews(id)))
    .then(() => dispatch(fetchNearbyOffers(id)))
      .then(() => {
        dispatch(changeLoadFinishStatus(true));
        dispatch(changeCurrentOfferLoadedStatus(true));
      })
);

export const getPartialOfferDetails = (id) => (dispatch, getState, _api) => (
  Promise.all([
    dispatch(changeLoadFinishStatus(false)),
    dispatch(fetchOfferReviews(id)),
    dispatch(fetchNearbyOffers(id))
  ])
  .then(() => {
    const offers = getOffers(getState());
    dispatch(loadCurrentOffer(getOfferById(offers, id)));
    dispatch(changeLoadFinishStatus(true));
    dispatch(changeCurrentOfferLoadedStatus(true));
  })
);

const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(loadOffers(data.map(adaptOfferToClient))))
);

export const getAllOffersData = () => (dispatch, getState, _api) => (
  Promise.all([
    dispatch(changeLoadFinishStatus(false)),
    dispatch(fetchOffers())
  ])
  .then(() => {
    dispatch(getCities());
    const currentCity = getCurrentCity(getState());
    if (!currentCity) {
      dispatch(setDefaultCity());
    }
  })
    .then(() => {
      dispatch(changeLoadFinishStatus(true));
      dispatch(changeOffersLoadedStatus(true));
    })
);

export const fetchFavoriteOffers = () => (dispatch, _getState, api) => (
  Promise.all([
    dispatch(changeLoadFinishStatus(false)),
    api.get(APIRoute.FAVORITES)
    .then(({data}) => dispatch(loadFavoriteOffers(data.map(adaptOfferToClient))))
  ])
    .then(() => {
      dispatch(changeLoadFinishStatus(true));
      dispatch(changeFavoritesLoadedStatus(true));
    })
);

export const changeFavoriteStatus = (id, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITES}/${id}/${status}`)
    .then(({data}) => {
      dispatch(updateOffers(adaptOfferToClient(data)));
      dispatch(updateFavoriteOffers(adaptOfferToClient(data)));
    })
);

export const postNewReview = (id, review) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, review)
    .then(({data}) => dispatch(loadOfferReviews(data.map(adaptReviewToClient))))
);
