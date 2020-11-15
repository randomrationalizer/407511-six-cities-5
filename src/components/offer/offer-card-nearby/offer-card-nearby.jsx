import React from "react";
import {OfferType} from "../../../const";
import OfferCard from "../offer-card/offer-card";
import {offerTypeToImageSize} from "../../../const";


const OfferCardNearby = (props) => {

  return (
    <OfferCard
      cardClassName={`${OfferType.NEARBY}__card`}
      imageWrapperClassName={`${OfferType.NEARBY}__image-wrapper`}
      imageSize={offerTypeToImageSize[OfferType.NEARBY]}
      {...props}
    />
  );
};

export default OfferCardNearby;
