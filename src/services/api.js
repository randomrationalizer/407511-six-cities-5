import axios from "axios";
import {HttpCode, ErrorMessage} from "../const";

const BASE_URL = `https://5.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;


export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (!response) {
      throw new Error(ErrorMessage.NETWORK_ERROR);
    }

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }

    if (response.status === HttpCode.BAD_REQUEST) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
