import {
  getCities,
  changeCity,
  loadOffers,
  requireAuthorization,
  getUserInfo,
  loadNearbyOffers,
  loadOfferReviews,
  redirectToRoute,
  updateOffers,
  loadCurrentOffer,
  loadFavoriteOffers,
  updateFavoriteOffers,
  updateNearbyOffers,
  changeOffersLoadingStatus,
  changeFavoritesLoadingStatus,
  changeCurrentOfferLoadingStatus,
} from "./action";
import {AuthorizationStatus, APIRoute, AppRoute} from "../const";


export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(loadOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(getUserInfo(data));
    })
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(getUserInfo(data));
    })
);

const getNearbyOffers = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}/${APIRoute.NEARBY}`)
    .then(({data}) => dispatch(loadNearbyOffers(data)))
    .catch(() => {})
);

const getOfferReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(loadOfferReviews(data)))
    .catch(() => {})
);

const getOfferInfo = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(({data}) => dispatch(loadCurrentOffer(data)))
);

export const getOfferDetails = (id) => (dispatch, _getState, _api) => (
  Promise.all([
    dispatch(getOfferInfo(id)),
    dispatch(getOfferReviews(id)),
    dispatch(getNearbyOffers(id)),
  ])
  .then(() => dispatch(changeCurrentOfferLoadingStatus(true)))
  .catch(() => dispatch(redirectToRoute(AppRoute.NOT_FOUND)))
);

export const getAllOffersData = () => (dispatch, _getState, _api) => (
  Promise.all([
    dispatch(fetchOffersList())
  ])
  .then(() => {
    dispatch(getCities());
    dispatch(changeCity());
    dispatch(changeOffersLoadingStatus(true));
  })
);

export const fetchFavoriteOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITES)
    .then(({data}) => {
      dispatch(loadFavoriteOffers(data));
      dispatch(changeFavoritesLoadingStatus(true));
    })
    .catch(() => {})
);

export const postNewReview = (id, review) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, review)
    .then(({data}) => dispatch(loadOfferReviews(data)))
    .catch(() => {})
);

export const changeFavoriteStatus = (id, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITES}/${id}/${status}`)
    .then(({data}) => {
      dispatch(updateOffers(data));
      dispatch(updateFavoriteOffers(data));
      dispatch(updateNearbyOffers(data));
    })
    .catch(() => dispatch(redirectToRoute(AppRoute.LOGIN)))
);
