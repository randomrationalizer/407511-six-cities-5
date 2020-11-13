import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch, Link, Redirect} from "react-router-dom";
import {offersPropTypes} from "../offer/offer.prop";
import {reviewsPropTypes} from "../reviews/review.prop";
import Main from "../main/main";
import Favorites from "../favorites/favorites";
import Login from "../login/login";
import OfferDetails from "../offer/offer-details/offer-details";

const App = (props) => {
  const {offers, reviews, favorites, cities, currentCity} = props;
  const offersIds = offers.map((offer) => offer.id);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            offers={offers}
            onOfferHover={() => {
              // в дальнейшем будет подсветка пина на карте
            }}
            favorites={favorites}
            cities={cities}
            currentCity={currentCity}
          />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/favorites">
          <Favorites
            offers={offers}
            favorites={favorites}
          />
        </Route>
        <Route exact path="/offer/:id"
          render={({match}) =>
            offersIds.includes(match.params.id) ? (
              <OfferDetails
                offer={offers.find((offer) => offer.id === match.params.id)}
                reviews={reviews.find((item) => item.propertyId === match.params.id).reviews}
                favorites={favorites}
                neighbourhoodOffers={offers.slice(0, 3)}
              />
            ) : (
              <Redirect to="/404" />
            )
          }
        />
        <Route
          render={() => (
            <Fragment>
              <h1>
                  404.
                <br />
                <small>Page not found</small>
              </h1>
              <Link to="/">Go to main page</Link>
            </Fragment>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewsPropTypes).isRequired,
  favorites: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  currentCity: PropTypes.object.isRequired
};

export default App;
