import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import {capitalize, isFavoritesCard, isMainPageCard} from "../util";
import {getRatingInPercent} from "../../../mocks/util";
import {OfferType} from "../../../const";

const offerTypeToImageSize = {
  [OfferType.MAIN]: {
    width: 260,
    height: 200
  },
  [OfferType.NEIGHBOURHOOD]: {
    width: 260,
    height: 200
  },
  [OfferType.FAVORITES]: {
    width: 150,
    height: 110
  }
};


const Card = (props) => {
  const {onCardHover, offer, cardType, isFavorite} = props;
  const {id, title, type, price, rating, photos, isPremial} = offer;

  const handleMouseEnter = () => {
    if (cardType !== OfferType.MAIN) {
      return;
    }

    onCardHover(offer);
  };

  const handleMouseLeave = () => {
    if (cardType !== OfferType.MAIN) {
      return;
    }

    onCardHover(null);
  };

  return (
    <article className={`${cardType}__${isMainPageCard(cardType) ? `place-` : ``}card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremial && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={`${photos[0].src}`}
            width={offerTypeToImageSize[cardType].width}
            height={offerTypeToImageSize[cardType].height}
            alt={`${photos[0].description}`}
          />
        </Link>
      </div>
      <div className={`${isFavoritesCard(cardType) ? `${cardType}__card-info` : ``} place-card__info`}>
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

Card.propTypes = {
  onCardHover: PropTypes.func,
  offer: offersPropTypes.isRequired,
  cardType: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

export default Card;
