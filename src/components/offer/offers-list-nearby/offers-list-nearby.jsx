import React from "react";
import OffersList from "../offers-list/offers-list";
import {OfferType} from "../../../const";


const OffersListNearby = (props) => {

  return (
    <OffersList
      className={`${OfferType.NEARBY}__list places__list`}
      offerType={OfferType.NEARBY}
      {...props}
    />
  );
};

export default OffersListNearby;
