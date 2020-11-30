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
import PrivateRoute from "../private-route/private-route";
import {AppRoute} from "../../const";

const MainPageWrapped = withActiveItem(MainPage);

const App = (props) => {
  const {offers} = props;
  const offersIds = offers.map((offer) => offer.id);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainPageWrapped />
        </Route>
        <PrivateRoute exact path={AppRoute.LOGIN}
          render={() => (
            <Login />
          )}
        />
        <PrivateRoute exact path={AppRoute.FAVORITES}
          render={() => (
            <Favorites
              favorites={offers.filter((offer) => offer.is_favorite)}
            />
          )}
        />
        <Route exact path={`${AppRoute.OFFERS}/:id`}
          render={({match}) =>
            offersIds.includes(parseInt(match.params.id, 10)) ? (
              <OfferDetails
                offer={offers.find((offer) => offer.id === parseInt(match.params.id, 10))}
                neighbourhoodOffers={offers.slice(0, 3)}
              />
            ) : (
              <Redirect to={AppRoute.NOT_FOUND} />
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
  offers: PropTypes.arrayOf(offersPropTypes).isRequired
};

const mapStateToProps = ({DATA}) => ({
  offers: DATA.allOffers
});

export {App};
export default connect(mapStateToProps)(App);
