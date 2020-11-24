import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer/offer.prop";
import {cityPropTypes} from "../cities/city.prop";
import Map from "../map/map";
import OffersList from "../offer/offers-list/offers-list";
import CitiesList from "../cities/cities-list/cities-list";
import SortSection from "../sort/sort-section/sort-section";
import {OfferType, MapType} from "../../const";
import logo from "../../../public/img/logo.svg";
import withActiveState from "../../hocs/with-active-state/with-active-state";

const SortSectionWrapped = withActiveState(SortSection);

const MainPage = (props) => {
  const {favorites, currentCity, cityOffers, activeItem, onActiveItemChange} = props;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41" />
              </a>
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              currentCity={currentCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {currentCity.name}</b>
              <SortSectionWrapped />
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  offers={cityOffers}
                  favorites={favorites}
                  onOfferHover={onActiveItemChange}
                  offerType={OfferType.MAIN}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                activeCardId={activeItem}
                mapType={MapType.MAIN}
                city={currentCity}
              />
            </div>
          </div>
        </div>
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
