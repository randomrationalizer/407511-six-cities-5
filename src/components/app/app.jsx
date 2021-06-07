import React, {useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import Preloader from "../preloader/preloader";
import MainPage from "../main/main-page/main-page";
import FavoritesPage from "../favorites/favorites-page/favorites-page";
import LoginPage from "../login/login";
import OfferPage from "../offer/offer-page/offer-page";
import PrivateRoute from "../private-route/private-route";
import NotFoundPage from "../not-found-page/not-found-page";
import {checkAuth} from "../../store/api-actions";
import {getAuthRequestCompleteStatus} from "../../store/user/selectors";
import {setAuthRequestCompleteStatus} from "../../store/user/action";
import {AppRoute} from "../../const";


const App = ({checkAuthorization, setAuthRequestComplete, isAuthRequestComplete}) => {
  useEffect(() => {
    checkAuthorization()
      .catch(() => {
        setAuthRequestComplete();
      });
  }, []);

  if (!isAuthRequestComplete) {
    return (
      <Preloader />
    );
  }

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
  setAuthRequestComplete: PropTypes.func.isRequired,
  isAuthRequestComplete: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthRequestComplete: getAuthRequestCompleteStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthorization() {
    return dispatch(checkAuth());
  },
  setAuthRequestComplete() {
    dispatch(setAuthRequestCompleteStatus(true));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
