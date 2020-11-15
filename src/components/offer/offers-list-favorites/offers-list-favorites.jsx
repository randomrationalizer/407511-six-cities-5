import React from "react";
import OffersList from "../offers-list/offers-list";
import {OfferType} from "../../../const";


const OffersListFavorites = (props) => {

  return (
    <OffersList
      className={`${OfferType.FAVORITES}__places`}
      offerType={OfferType.FAVORITES}
      {...props}
    />
  );
};

export default OffersListFavorites;
