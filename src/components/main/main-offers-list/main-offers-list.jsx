import React from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../../offer/offer.prop";
import {cityPropTypes} from "../../cities/city.prop";
import OffersMap from "../../map/map";
import OffersList from "../../offer/offers-list/offers-list";
import SortSection from "../../sort/sort-section/sort-section";
import withActiveState from "../../../hocs/with-active-state/with-active-state";
import {OfferType, MapType} from "../../../const";


const SortSectionWrapped = withActiveState(SortSection);


const MainOffersList = (props) => {
  const {offers, onOfferHover, activeCardId, city} = props;
  const suffix = offers.length === 1 ? `` : `s`;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} place{suffix} to stay in {city.name}</b>
          <SortSectionWrapped
            isActive={false}
          />
          <div className="cities__places-list places__list tabs__content">
            <OffersList
              offers={offers}
              onOfferHover={onOfferHover}
              offerType={OfferType.MAIN}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <OffersMap
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
  onOfferHover: PropTypes.func.isRequired
};

export default MainOffersList;
