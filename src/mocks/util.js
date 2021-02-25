import configureStore from "redux-mock-store";

export const noop = () => {};

export const getMockStore = (store) => {
  const storeConfig = configureStore();
  return storeConfig(store);
};

export const nope = () => {
  return Promise.resolve({});
};
