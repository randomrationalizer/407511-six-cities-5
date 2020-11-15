import React from "react";
import {OfferType} from "../../../const";
import OfferCard from "../offer-card/offer-card";
import {offerTypeToImageSize} from "../../../const";


const OfferCardMain = (props) => {

  return (
    <OfferCard
      cardClassName={`${OfferType.MAIN}__place-card`}
      imageWrapperClassName={`${OfferType.MAIN}__image-wrapper`}
      imageSize={offerTypeToImageSize[OfferType.MAIN]}
      {...props}
    />
  );
};

export default OfferCardMain;
