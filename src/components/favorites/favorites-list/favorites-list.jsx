import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {offersPropTypes} from "../../offer/offer.prop";
import {OfferType} from "../../../const";
import OffersList from "../../offer/offers-list/offers-list";
import {getFavorites} from "../../../store/selectors";


const FavoritesList = (props) => {
  const {favorites} = props;
  const cities = favorites.slice().map((offer) => offer.city.name).sort();
  const uniqueCities = [...new Set(cities)];

  return (
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
            <OffersList
              offers={favorites.filter((offer) => offer.city.name === city)}
              favorites={favorites}
              offerType={OfferType.FAVORITES}
            />
          </div>
        </li>
      )}
    </ul>

  );
};

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(offersPropTypes)
};

const mapStateToProps = (state) => ({
  favorites: getFavorites(state)
});

export {FavoritesList};
export default connect(mapStateToProps, null)(FavoritesList);
