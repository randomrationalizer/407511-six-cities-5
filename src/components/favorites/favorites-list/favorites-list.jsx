import React from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../../offer/offer.prop";
import OffersList from "../../offer/offers-list/offers-list";
import {getCitiesFromOffers} from "../util";
import {OfferType} from "../../../const";


const FavoritesList = ({favorites}) => {
  const cities = getCitiesFromOffers(favorites);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {cities.map((city) =>
              <li key={city} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <OffersList
                    offers={favorites.filter((offer) => offer.city.name === city)}
                    favorites={favorites}
                    offerType={OfferType.FAVORITES}
                  />
                </div>
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
};

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(offersPropTypes)
};

export default FavoritesList;
