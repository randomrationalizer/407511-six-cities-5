import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import OfferCard from "../offer-card/offer-card";


const OffersList = (props) => {
  const {offers, onCardHover, offerType} = props;

  return (
    <Fragment>
      {offers.map((offer) =>
        <OfferCard
          key={offer.id}
          offer={offer}
          offerType={offerType}
          onCardHover={onCardHover}
        />
      )}
    </Fragment>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  onCardHover: PropTypes.func,
  offerType: PropTypes.string.isRequired
};

export default React.memo(OffersList);
