import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import OfferCard from "../offer-card/offer-card";


const OffersList = (props) => {
  const {offers, favorites, onOfferHover, offerType} = props;

  return (
    <Fragment>
      {offers.map((offer) =>
        <OfferCard
          key={offer.id}
          offer={offer}
          offerType={offerType}
          isFavorite={favorites.includes(offer.id)}
          onCardHover={(newActiveCard) => {
            onOfferHover(newActiveCard);
          }}
        />
      )}
    </Fragment>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  favorites: PropTypes.array.isRequired,
  onOfferHover: PropTypes.func,
  offerType: PropTypes.string.isRequired
};

export default OffersList;
