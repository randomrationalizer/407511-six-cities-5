import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer/offer.prop";
import {cityPropTypes} from "../cities/city.prop";
import OffersContainer from "../offer/offers-container/offers-container";
import OffersEmptyContainer from "../offer/offers-empty-container/offers-empty-container";
import CitiesList from "../cities/cities-list/cities-list";
import logo from "../../../public/img/logo.svg";


const MainPage = (props) => {
  const {favorites, currentCity, cityOffers, activeItem, onActiveItemChange} = props;
  const isAnyOffers = cityOffers.length ? true : false;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={`/`} className="header__logo-link header__logo-link--active">
                <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${isAnyOffers ? `` : `page__main--index-empty`}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              currentCity={currentCity}
            />
          </section>
        </div>
        {isAnyOffers ?
          <OffersContainer
            offers={cityOffers}
            favorites={favorites}
            onOfferHover={onActiveItemChange}
            activeCardId={activeItem}
            city={currentCity}
          />
          :
          <OffersEmptyContainer
            city={currentCity}
          />
        }
      </main>
    </div>
  );
};

MainPage.propTypes = {
  favorites: PropTypes.array.isRequired,
  currentCity: cityPropTypes.isRequired,
  cityOffers: PropTypes.arrayOf(offersPropTypes).isRequired,
  activeItem: PropTypes.string,
  onActiveItemChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  cityOffers: state.cityOffers,
  currentSort: state.currentSort
});

export {MainPage};
export default connect(mapStateToProps, null)(MainPage);
