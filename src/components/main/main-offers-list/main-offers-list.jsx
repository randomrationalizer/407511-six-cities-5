import React from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../../offer/offer.prop";
import {cityPropTypes} from "../../cities/city.prop";
import Map from "../../map/map";
import OffersList from "../../offer/offers-list/offers-list";
import SortSection from "../../sort/sort-section/sort-section";
import {OfferType, MapType} from "../../../const";
import {pluralize} from "../../../utils/common";


const MainOffersList = (props) => {
  const {offers, onCardHover, activeCardId, city} = props;
  const count = offers.length;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{count} {pluralize(`place`, count)} to stay in {city.name}</b>
          <SortSection />
          <div className="cities__places-list places__list tabs__content">
            <OffersList
              offers={offers}
              onCardHover={onCardHover}
              offerType={OfferType.MAIN}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            activeCardId={activeCardId}
            mapType={MapType.MAIN}
            city={city}
            offers={offers}
          />
        </div>
      </div>
    </div>
  );
};

MainOffersList.propTypes = {
  city: cityPropTypes.isRequired,
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  activeCardId: PropTypes.number,
  onCardHover: PropTypes.func.isRequired
};

export default MainOffersList;
