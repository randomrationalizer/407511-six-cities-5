import React from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import {cityPropTypes} from "../../cities/city.prop";
import Map from "../../map/map";
import OffersList from "../offers-list/offers-list";
import SortSection from "../../sort/sort-section/sort-section";
import {OfferType, MapType} from "../../../const";
import withActiveState from "../../../hocs/with-active-state/with-active-state";

const SortSectionWrapped = withActiveState(SortSection);


const OffersContainer = (props) => {
  const {offers, onOfferHover, activeCardId, city} = props;
  const suffix = offers.length === 1 ? `` : `s`;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} place{suffix} to stay in {city.name}</b>
          <SortSectionWrapped />
          <div className="cities__places-list places__list tabs__content">
            <OffersList
              offers={offers}
              onOfferHover={onOfferHover}
              offerType={OfferType.MAIN}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            activeCardId={activeCardId}
            mapType={MapType.MAIN}
            city={city}
          />
        </div>
      </div>
    </div>
  );
};

OffersContainer.propTypes = {
  city: cityPropTypes.isRequired,
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  activeCardId: PropTypes.number,
  onOfferHover: PropTypes.func.isRequired
};

export default OffersContainer;
