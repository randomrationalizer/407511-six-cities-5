import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MainOffersSection from "../main-offers-section/main-offers-section";
import withActiveItem from "../../../hocs/with-active-item/with-active-item";
import {getAllOffersData} from "../../../store/api-actions";
import logo from "../../../../public/img/logo.svg";
import UserNav from "../../user-menu/user-nav/user-nav";
import {getOffersLoadStatus} from "../../../store/selectors";

const MainOffersSectionWrapped = withActiveItem(MainOffersSection);

class MainPage extends PureComponent {

  componentDidMount() {
    const {getOffers, isLoaded} = this.props;

    if (isLoaded === false) {
      getOffers();
    }
  }

  render() {
    const {isLoaded} = this.props;

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

        {isLoaded ?
          <MainOffersSectionWrapped/>
          :
          <p>Loading...</p>
        }
      </div>
    );
  }
}

MainPage.propTypes = {
  getOffers: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isLoaded: getOffersLoadStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOffers() {
    dispatch(getAllOffersData());
  }
});


export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
