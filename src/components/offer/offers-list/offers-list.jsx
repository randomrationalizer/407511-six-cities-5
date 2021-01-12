import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import OfferCard from "../offer-card/offer-card";


const OffersList = ({offers, onOfferHover, offerType}) => {
  const handleCardHover = (newActiveCardId) => {
    onOfferHover(newActiveCardId);
  };

  return (
    <Fragment>
      {offers.map((offer) =>
        <OfferCard
          key={offer.id}
          offer={offer}
          offerType={offerType}
          onCardHover={handleCardHover}
        />
      )}
    </Fragment>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  onOfferHover: PropTypes.func,
  offerType: PropTypes.string.isRequired
};

export default React.memo(OffersList);
