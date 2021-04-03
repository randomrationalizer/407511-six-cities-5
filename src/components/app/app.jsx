import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import MainPage from "../main/main-page/main-page";
import FavoritesPage from "../favorites/favorites-page/favorites-page";
import LoginPage from "../login/login";
import OfferPage from "../offer/offer-page/offer-page";
import PrivateRoute from "../private-route/private-route";
import NotFoundPage from "../not-found-page/not-found-page";
import {checkAuth} from "../../store/api-actions";
import {changeAuthRequestCompleteStatus} from "../../store/action";
import {AppRoute} from "../../const";


const App = ({checkAuthorization, setAuthRequestComplete}) => {
  checkAuthorization()
    .catch(() => {
      setAuthRequestComplete();
    });

  return (
    <Switch>
      <Route exact path={AppRoute.MAIN}>
        <MainPage />
      </Route>
      <PrivateRoute exact path={AppRoute.LOGIN}
        render={() => (
          <LoginPage />
        )}
      />
      <PrivateRoute exact path={AppRoute.FAVORITES}
        render={() => (
          <FavoritesPage />
        )}
      />
      <Route exact path={`${AppRoute.OFFERS}/:id`}>
        <OfferPage />
      </Route>
      <Route
        render={() => (
          <NotFoundPage />
        )}
      />
    </Switch>
  );
};


App.propTypes = {
  checkAuthorization: PropTypes.func.isRequired,
  setAuthRequestComplete: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  checkAuthorization() {
    return dispatch(checkAuth());
  },
  setAuthRequestComplete() {
    dispatch(changeAuthRequestCompleteStatus(true));
  }
});

export {App};
export default connect(null, mapDispatchToProps)(App);
