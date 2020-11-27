import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/root-reducer";
import {createAPI} from "./services/api";
import {changeCity, getCities, getCityOffers, requireAuthorization} from "./store/action";
import {fetchOffersList, checkAuth} from "./store/api-actions";
import App from "./components/app/app";
import {AuthorizationStatus} from "./const";


const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

Promise.all([
  store.dispatch(fetchOffersList()),
  store.dispatch(checkAuth())
])
.then(() => {
  store.dispatch(getCities());
  store.dispatch(changeCity());
  store.dispatch(getCityOffers());
})
.then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
});
