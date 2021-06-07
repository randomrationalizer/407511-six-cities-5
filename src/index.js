import React from "react";
import ReactDOM from "react-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {rootReducer} from "./store/root-reducer";
import {createAPI} from "./services/api";
import {requireAuthorization} from "./store/user/action";
import App from "./components/app/app";
import {AuthorizationStatus} from "./const";
import browserHistory from "../src/browser-history";


const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
