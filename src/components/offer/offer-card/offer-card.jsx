import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {offersPropTypes} from "../offer.prop";
import OfferFavoriteBtn from "../offer-favorite-btn/offer-favorite-btn";
import withActiveState from "../../../hocs/with-active-state/with-active-state";
import {setErrorMessage} from "../../../store/action";
import {changeFavoriteStatus} from "../../../store/api-actions";
import {getAuthorizationStatus} from "../../../store/selectors";
import {capitalize, isFavoritesCard, isMainPageCard} from "../util";
import {getRatingInPercent} from "../util";
import {OfferType, AppRoute, OfferPageType} from "../../../const";
import "./offer-card.css";

const OfferFavoriteBtnWrapped = withActiveState(OfferFavoriteBtn);


const offerTypeToArticleClassName = {
  [OfferType.MAIN]: `cities__place-card place-card`,
  [OfferType.NEARBY]: `near-places__card place-card`,
  [OfferType.FAVORITES]: `favorites__card place-card`
};

const offerTypeToCardClassName = {
  [OfferType.MAIN]: `card-main`,
  [OfferType.NEARBY]: `card-nearby`,
  [OfferType.FAVORITES]: `card-favorites`
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
  const {onCardHover, offer, offerType, changeStatus, setError, authorizationStatus} = props;
  const {id, title, type, price, rating} = offer;
  const isPremial = offer.is_premium;
  const previewImage = offer.preview_image;

  const imageSize = offerTypeToImageSize[offerType];
  const articleClassName = offerTypeToArticleClassName[offerType];
  const cardClassName = offerTypeToCardClassName[offerType];

  const handleMouseEnter = () => {
    if (!isMainPageCard(offerType)) {
      return;
    }

    onCardHover(offer.id);
  };

  const handleMouseLeave = () => {
    if (!isMainPageCard(offerType)) {
      return;
    }

    onCardHover(null);
  };

  const handleFavoriteBtnClick = (offerId, status) => {
    changeStatus(offerId, status)
      .catch(() => setError(`A server error occurred.`));
  };

  return (
    <article className={`${articleClassName} ${cardClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremial && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${offerType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.OFFERS}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageSize.width}
            height={imageSize.height}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${isFavoritesCard(offerType) ? `${offerType}__card-info` : ``} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <OfferFavoriteBtnWrapped
            id={id}
            isActive={offer.is_favorite}
            pageType={OfferPageType.CARD}
            onBtnClick={handleFavoriteBtnClick}
            authorizationStatus={authorizationStatus}
          />

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFERS}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  onCardHover: PropTypes.func,
  offer: offersPropTypes.isRequired,
  offerType: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});


const mapDispatchToProps = (dispatch) => ({
  changeStatus(id, status) {
    return dispatch(changeFavoriteStatus(id, status));
  },
  setError(message) {
    dispatch(setErrorMessage(message));
  }
});


export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
