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

  const onFail = (error) => {
    const {response} = error;

    if (!response) {
      throw new Error(ErrorMessage.NETWORK_ERROR);
    }

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
      throw error;
    }

    if (response.status === HttpCode.BAD_REQUEST) {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
