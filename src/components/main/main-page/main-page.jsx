import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MainOffersSection from "../main-offers-section/main-offers-section";
import UserNav from "../../user-menu/user-nav/user-nav";
import Preloader from "../../preloader/preloader";
import withActiveItem from "../../../hocs/with-active-item/with-active-item";
import {getAllOffersData} from "../../../store/api-actions";
import {changeLoadFinishStatus, setErrorMessage} from "../../../store/action";
import {getLoadFinishStatus, getOffersLoadedStatus} from "../../../store/selectors";
import logo from "../../../../public/img/logo.svg";

const MainOffersSectionWrapped = withActiveItem(MainOffersSection);

class MainPage extends PureComponent {

  componentDidMount() {
    const {getOffers, isOffersLoaded, setLoadError} = this.props;

    if (!isOffersLoaded) {
      getOffers()
      .catch((err) => setLoadError(err));
    }
  }

  render() {
    const {isOffersLoaded, isLoadFinished} = this.props;

    if (!isLoadFinished) {
      return <Preloader />;
    }

    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to="/" className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <UserNav />
            </div>
          </div>
        </header>

        {isOffersLoaded &&
          <MainOffersSectionWrapped/>
        }
      </div>
    );
  }
}

MainPage.propTypes = {
  getOffers: PropTypes.func.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
  isLoadFinished: PropTypes.bool.isRequired,
  setLoadError: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isOffersLoaded: getOffersLoadedStatus(state),
  isLoadFinished: getLoadFinishStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOffers() {
    return dispatch(getAllOffersData());
  },
  setLoadError(err) {
    dispatch(changeLoadFinishStatus(true));
    dispatch(setErrorMessage(err.message));
  }
});


export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
