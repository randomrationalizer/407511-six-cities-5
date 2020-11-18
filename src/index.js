import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./state/reduser";
import App from "./components/app/app";
import {reviews} from "./mocks/reviews";
import {favorites} from "./mocks/favorites";


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        reviews={reviews}
        favorites={favorites}
      />
    </Provider>,
    document.querySelector(`#root`)
);
