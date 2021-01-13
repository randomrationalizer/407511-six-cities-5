import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import MainPage from "../main/main-page/main-page";
import FavoritesPage from "../favorites/favorites-page/favorites-page";
import LoginPage from "../login/login";
import OfferPage from "../offer/offer-page/offer-page";
import PrivateRoute from "../private-route/private-route";
import NotFoundPage from "../not-found-page/not-found-page";
import withErrorMessage from "../../hocs/with-error-message/with-error-message";
import {checkAuth} from "../../store/api-actions";
import {changeAuthRequestCompleteStatus} from "../../store/action";
import {AppRoute} from "../../const";


const OfferPageWrapped = withErrorMessage(OfferPage);
const MainPageWrapped = withErrorMessage(MainPage);
const FavoritesPageWrapped = withErrorMessage(FavoritesPage);
const LoginPageWrapped = withErrorMessage(LoginPage);

const App = ({checkAuthorization, setAuthRequestComplete}) => {
  checkAuthorization()
    .catch(() => {
      setAuthRequestComplete();
    });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainPageWrapped />
        </Route>
        <PrivateRoute exact path={AppRoute.LOGIN}
          render={() => (
            <LoginPageWrapped />
          )}
        />
        <PrivateRoute exact path={AppRoute.FAVORITES}
          render={() => (
            <FavoritesPageWrapped />
          )}
        />
        <Route exact path={`${AppRoute.OFFERS}/:id`}>
          <OfferPageWrapped />
        </Route>
        <Route
          render={() => (
            <NotFoundPage />
          )}
        />
      </Switch>
    </BrowserRouter>
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
