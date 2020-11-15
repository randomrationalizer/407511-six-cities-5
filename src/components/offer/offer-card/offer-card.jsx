import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import {capitalize} from "../util";
import {getRatingInPercent} from "../../../mocks/util";


const OfferCard = (props) => {
  const {onCardHover, offer, isFavorite, cardClassName, cardInfoClassName, imageWrapperClassName, imageSize} = props;
  const {id, title, type, price, rating, photos, isPremial} = offer;

  const handleMouseEnter = () => {
    if (onCardHover) {
      onCardHover(offer);
    }
  };

  const handleMouseLeave = () => {
    if (onCardHover) {
      onCardHover(null);
    }
  };

  return (
    <article className={`${cardClassName} place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremial && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
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
      <div className={`${cardInfoClassName ? `${cardInfoClassName}` : ``} place-card__info`}>
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
  cardClassName: PropTypes.string.isRequired,
  cardInfoClassName: PropTypes.string,
  imageWrapperClassName: PropTypes.string.isRequired,
  imageSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired
};

export default OfferCard;
