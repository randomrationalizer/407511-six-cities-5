import React from "react";
import OffersList from "../offers-list/offers-list";
import {OfferType} from "../../../const";


const OffersListCities = (props) => {

  return (
    <OffersList
      className={`${OfferType.MAIN}__places-list places__list tabs__content`}
      offerType={OfferType.MAIN}
      {...props}
    />
  );
};

export default OffersListCities;
