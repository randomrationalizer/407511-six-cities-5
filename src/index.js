import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import thunk from "redux-thunk";
import {rootReducer} from "./store/reducers/root-reducer";
import {createAPI} from "./services/api";
import {requireAuthorization} from "./store/action";
import App from "./components/app/app";
import {AuthorizationStatus} from "./const";
import browserHistory from "../src/browser-history";


const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
