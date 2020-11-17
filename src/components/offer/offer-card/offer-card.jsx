import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import {capitalize, isFavoritesCard, isMainPageCard} from "../util";
import {getRatingInPercent} from "../../../mocks/util";
import {OfferType} from "../../../const";
import "./offer-card.css";

const offerTypeToClassName = {
  [OfferType.MAIN]: `cities__place-card`,
  [OfferType.NEARBY]: `near-places__card`,
  [OfferType.FAVORITES]: `favorites__card`
};

const offerTypeToImageSize = {
  [OfferType.MAIN]: {
    width: 260,
    height: 200
  },
  [OfferType.NEARBY]: {
    width: 260,
    height: 200
  },
  [OfferType.FAVORITES]: {
    width: 150,
    height: 110
  }
};


const OfferCard = (props) => {
  const {onCardHover, offer, isFavorite, offerType} = props;
  const {id, title, type, price, rating, photos, isPremial} = offer;
  const cardClassName = offerTypeToClassName[offerType];
  const imageSize = offerTypeToImageSize[offerType];

  const handleMouseEnter = () => {
    if (!isMainPageCard(offerType)) {
      return;
    }

    onCardHover(offer);
  };

  const handleMouseLeave = () => {
    if (!isMainPageCard(offerType)) {
      return;
    }

    onCardHover(null);
  };

  return (
    <article className={`${cardClassName} place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremial && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${offerType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={`${photos[0].src}`}
            width={imageSize.width}
            height={imageSize.height}
            alt={`${photos[0].description}`}
          />
        </Link>
      </div>
      <div className={`${isFavoritesCard(offerType) ? `${offerType}__card-info` : ``} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{`${isFavorite ? `In` : `To`} bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  onCardHover: PropTypes.func,
  offer: offersPropTypes.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  offerType: PropTypes.string.isRequired
};

export default OfferCard;
