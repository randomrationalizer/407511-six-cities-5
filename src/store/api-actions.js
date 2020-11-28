import {loadOffers, requireAuthorization, getUserInfo} from "./action";
import {AuthorizationStatus, APIRoute} from "../const";


export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(loadOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then((authData) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(getUserInfo(authData.data));
    })
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then((authData) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(getUserInfo(authData.data));
    })
);
