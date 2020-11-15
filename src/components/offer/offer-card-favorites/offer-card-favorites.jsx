import React from "react";
import {OfferType} from "../../../const";
import OfferCard from "../offer-card/offer-card";
import {offerTypeToImageSize} from "../../../const";


const OfferCardFavorites = (props) => {

  return (
    <OfferCard
      cardClassName={`${OfferType.FAVORITES}__card`}
      cardInfoClassName={`${OfferType.FAVORITES}__card-info place-card__info`}
      imageWrapperClassName={`${OfferType.FAVORITES}__image-wrapper`}
      imageSize={offerTypeToImageSize[OfferType.FAVORITES]}
      {...props}
    />
  );
};

export default OfferCardFavorites;
