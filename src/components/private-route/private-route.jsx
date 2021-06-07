import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {AppRoute, AuthorizationStatus} from "../../const";


const pageRenderCondition = {
  [AppRoute.LOGIN]: AuthorizationStatus.NO_AUTH,
  [AppRoute.FAVORITES]: AuthorizationStatus.AUTH
};

const redirectPath = {
  [AppRoute.LOGIN]: AppRoute.MAIN,
  [AppRoute.FAVORITES]: AppRoute.LOGIN
};

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          authorizationStatus === pageRenderCondition[path]
            ? render(routeProps)
            : <Redirect to={redirectPath[path]} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
