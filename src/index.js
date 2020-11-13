import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {offers} from "./mocks/offers";
import {reviews} from "./mocks/reviews";
import {favorites} from "./mocks/favorites";
import {cities} from "./const";

const DEFAULT_CITY = `Amsterdam`;

ReactDOM.render(
    <App
      offers={offers}
      reviews={reviews}
      favorites={favorites}
      cities={cities}
      currentCity={DEFAULT_CITY}
    />,
    document.querySelector(`#root`)
);
