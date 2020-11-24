import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch, Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {offersPropTypes} from "../offer/offer.prop";
import MainPage from "../main/main";
import Favorites from "../favorites/favorites";
import Login from "../login/login";
import OfferDetails from "../offer/offer-details/offer-details";
import withActiveItem from "../../hocs/with-active-item/with-active-item";

const MainPageWrapped = withActiveItem(MainPage);

const App = (props) => {
  const {offers, favorites} = props;
  const offersIds = offers.map((offer) => offer.id);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPageWrapped
            favorites={favorites}
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
  favorites: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  offers: state.allOffers,
  favorites: state.favorites
});

export {App};
export default connect(mapStateToProps)(App);
