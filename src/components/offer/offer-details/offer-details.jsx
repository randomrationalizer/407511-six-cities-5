import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {offersPropTypes} from "../offer.prop";
import Map from "../../map/map";
import ReviewsSection from "../../reviews/reviews-section/reviews-section";
import OffersList from "../offers-list/offers-list";
import FavoriteButton from "../../favorites/favorite-button/favorite-button";
import {getCurrentOffer, getNearbyOffers} from "../../../store/current-offer/selectors";
import {capitalize, getDescriptionSentences} from "../util";
import {getRatingInPercent} from "../util";
import {MapType, OfferType, OfferPageType} from "../../../const";

const MAX_PHOTOS_COUNT = 6;


const OfferDetails = ({offer, nearbyOffers}) => {
  const {id, title, price, city, type, description, bedrooms, rating, images, goods, host, isFavorite, isPremium, guestsCount} = offer;

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.length !== 0 && images.slice(0, MAX_PHOTOS_COUNT).map((image, i) =>
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt={`Property photo ${i}`} />
              </div>
            )}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium && <div className="property__mark">
              <span>Premium</span>
            </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">{title}</h1>
              <FavoriteButton
                id={id}
                isActive={isFavorite}
                pageType={OfferPageType.DETAILS}
              />
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
                <div className={`property__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                  <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
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
          key={id}
          offers={[offer, ...nearbyOffers]}
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
              offers={nearbyOffers}
              offerType={OfferType.NEARBY}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

OfferDetails.propTypes = {
  offer: offersPropTypes.isRequired,
  nearbyOffers: PropTypes.arrayOf(offersPropTypes)
};

const mapStateToProps = (state) => ({
  offer: getCurrentOffer(state),
  nearbyOffers: getNearbyOffers(state)
});


export {OfferDetails};
export default connect(mapStateToProps, null)(OfferDetails);
