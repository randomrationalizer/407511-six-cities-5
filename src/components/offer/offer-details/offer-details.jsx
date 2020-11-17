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
import logo from "../../../../public/img/logo.svg";


const OfferDetails = (props) => {
  const {offer, favorites, reviews, neighbourhoodOffers} = props;
  const {id, title, price, city, coords, type, description, bedrooms, guests, rating, photos, options, owner, isPremial} = offer;
  const isFavorite = favorites.includes(id);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={`/`}>
                <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {photos.length !== 0 && photos.map((photo) =>
                <div key={photo.src} className="property__image-wrapper">
                  <img className="property__image" src={photo.src} alt={photo.description} />
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
                  {`Max ${guests} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {options.map((option) =>
                    <li key={option} className="property__inside-item">{option}</li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${owner.isHighRated ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={owner.avatar} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {owner.name}
                  </span>
                </div>
                <div className="property__description">
                  {getDescriptionSentences(description).map((sentence) =>
                    <p key={sentence} className="property__text">{`${sentence}.`}</p>
                  )}
                </div>
              </div>
              <ReviewsSection
                reviews={reviews}
              />
            </div>
          </div>
          <Map
            offers={neighbourhoodOffers}
            activeCard={offer}
            mapType={MapType.PROPERTY}
            city={Object.assign({}, {name: city, coords})}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={neighbourhoodOffers}
                favorites={favorites}
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
  reviews: PropTypes.array,
  favorites: PropTypes.array.isRequired,
  neighbourhoodOffers: PropTypes.arrayOf(offersPropTypes),
};

export default OfferDetails;
