import React from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../../offers-prop-types";
import {getRatingInPercent, capitalize} from "../../util/offer";
import {CardType} from "../../const";


const Card = (props) => {
  const {onCardHover, offer, activeCard, cardType, isFavorite} = props;
  const {id, title, type, price, rating, photos, isPremial} = offer;
  const isFavoritesCard = cardType === CardType.FAVORITES ? true : false;

  return (
    <article className={`${cardType}__${cardType === CardType.MAIN ? `place-` : ``}card place-card`}
      onMouseOver={(evt) => {
        if (cardType !== CardType.MAIN) {
          return;
        }
        evt.preventDefault();
        if (activeCard !== offer) {
          onCardHover(offer);
        }
      }}
    >
      {isPremial ? <div className="place-card__mark">
        <span>Premium</span>
      </div> : ``}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <a href={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={`${photos[0].src}`}
            width={isFavoritesCard ? `150` : `260`}
            height={isFavoritesCard ? `110` : `200`}
            alt={`${photos[0].description}`}
          />
        </a>
      </div>
      <div className={`${isFavoritesCard ? `${cardType}__card-info` : ``} place-card__info`}>
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
          <a href={`/offer/${id}`}>{title}</a>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
  onCardHover: PropTypes.func,
  offer: offersPropTypes.isRequired,
  activeCard: offersPropTypes,
  cardType: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

export default Card;
