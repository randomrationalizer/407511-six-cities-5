import React, {Fragment} from "react";
import {Router, Route, Switch, Link} from "react-router-dom";
import MainPage from "../main/main-page/main-page";
import FavoritesPage from "../favorites/favorites-page/favorites-page";
import Login from "../login/login";
import OfferPage from "../offer/offer-page/offer-page";
import PrivateRoute from "../private-route/private-route";
import {AppRoute} from "../../const";
import browserHistory from "../../browser-history";


const App = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainPage />
        </Route>
        <PrivateRoute exact path={AppRoute.LOGIN}
          render={() => (
            <Login />
          )}
        />
        <PrivateRoute exact path={AppRoute.FAVORITES}
          render={() => (
            <FavoritesPage />
          )}
        />
        <Route exact path={`${AppRoute.OFFERS}/:id`}
          render={({match}) => (
            <OfferPage
              id={parseInt(match.params.id, 10)}
            />
          )}
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
    </Router>
  );
};


export default App;
