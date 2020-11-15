import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import OfferCard from "../offer-card/offer-card";
import {OfferType} from "../../../const";
import OfferCardMain from "../offer-card-main/offer-card-main";
import OfferCardNearby from "../offer-card-nearby/offer-card-nearby";
import OfferCardFavorites from "../offer-card-favorites/offer-card-favorites";


const OffersList = (props) => {
  const {offers, favorites, onOfferHover, offerType, className} = props;

  const getCardByType = (type, offer) => {
    switch (type) {
      case OfferType.MAIN:
        return <OfferCardMain
          offer={offer}
          onCardHover={(newActiveCard) => {
            onOfferHover(newActiveCard);
          }}
          isFavorite={favorites.includes(offer.id)}
        />;
      case OfferType.NEARBY:
        return <OfferCardNearby
          offer={offer}
          isFavorite={favorites.includes(offer.id)}
        />;
      case OfferType.FAVORITES:
        return <OfferCardFavorites
          offer={offer}
          isFavorite={favorites.includes(offer.id)}
        />;
      default:
        return <OfferCard
          offer={offer}
          isFavorite={favorites.includes(offer.id)}
        />;
    }
  };

  return (
    <div className={className}>
      {offers.map((offer) => (
        <Fragment key={offer.id}>
          {getCardByType(offerType, offer)}
        </Fragment>
      ))}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  favorites: PropTypes.array.isRequired,
  onOfferHover: PropTypes.func,
  offerType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default OffersList;
