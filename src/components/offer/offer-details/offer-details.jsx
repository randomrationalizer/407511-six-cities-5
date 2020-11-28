import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import {capitalize, getDescriptionSentences} from "../util";
import {getRatingInPercent} from "../../../mocks/util";
import {MapType, OfferType} from "../../../const";
import Map from "../../map/map";
import ReviewsSection from "../../reviews/reviews-section/reviews-section";
import OffersList from "../../offer/offers-list/offers-list";
import UserNav from "../../user-menu/user-nav/user-nav";
import logo from "../../../../public/img/logo.svg";


const OfferDetails = (props) => {
  const {offer, neighbourhoodOffers} = props;
  const {id, title, price, city, type, description, bedrooms, rating, images, goods, host} = offer;
  const guestsCount = offer.max_adults;
  const isFavorite = offer.is_favorite;
  const isPremial = offer.is_premium;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.length !== 0 && images.map((image, i) =>
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt={`Property photo ${i}`} />
                </div>
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremial && <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button className={`property__bookmark-button ${isFavorite ? `property__bookmark-button--active` : ``} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{`${isFavorite ? `In` : `To`} bookmarks`}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {capitalize(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${guestsCount} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((option) =>
                    <li key={option} className="property__inside-item">{option}</li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.is_pro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={host.avatar_url} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  {getDescriptionSentences(description).map((sentence) =>
                    <p key={sentence} className="property__text">{`${sentence}.`}</p>
                  )}
                </div>
              </div>
              <ReviewsSection
                id={id}
              />
            </div>
          </div>
          <Map
            offers={neighbourhoodOffers}
            activeCardId={id}
            mapType={MapType.PROPERTY}
            city={city}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={neighbourhoodOffers}
                offerType={OfferType.NEARBY}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

OfferDetails.propTypes = {
  offer: offersPropTypes.isRequired,
  neighbourhoodOffers: PropTypes.arrayOf(offersPropTypes),
};

export default OfferDetails;
