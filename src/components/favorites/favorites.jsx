import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer/offer.prop";
import Card from "../offer/offer-card/offer-card";
import {OfferType} from "../../const";
import logo from "../../../public/img/logo.svg";

const Favorites = (props) => {
  const {offers, favorites} = props;
  const favoriteOffers = favorites.map((id) => offers.find((offer) => offer.id === id));
  const cities = favoriteOffers.slice().map((offer) => offer.city).sort();
  const uniqueCities = [...new Set(cities)];

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={`/`}>
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {uniqueCities.map((city) =>
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffers.filter((offer) => offer.city === city).map((item) =>
                      <Card
                        key={item.id}
                        cardType={OfferType.FAVORITES}
                        offer={item}
                        isFavorite={true}
                      />
                    )}
                  </div>
                </li>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={`/`}>
          <img className="footer__logo" src={logo} alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  favorites: PropTypes.array.isRequired
};

export default Favorites;
