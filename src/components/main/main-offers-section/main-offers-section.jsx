import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import PropTypes from "prop-types";
import {offersPropTypes} from "../../offer/offer.prop";
import {cityPropTypes} from "../../cities/city.prop";
import MainOffersList from "../main-offers-list/main-offers-list";
import MainOffersEmptyList from "../main-offers-empty-list/main-offers-empty-list";
import CitiesList from "../../cities/cities-list/cities-list";
import withActiveItem from "../../../hocs/with-active-item/with-active-item";
import {getCityOffers, getCurrentCityData} from "../../../store/selectors";


const MainOffersSection = (props) => {
  const {currentCity, cityOffers, activeItem, onActiveItemChange} = props;
  const isAnyOffers = cityOffers.length ? true : false;

  return (
    <main className={`page__main page__main--index ${isAnyOffers ? `` : `page__main--index-empty`}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList
            currentCity={currentCity.name}
          />
        </section>
      </div>
      {isAnyOffers ?
        <MainOffersList
          offers={cityOffers}
          onOfferHover={onActiveItemChange}
          activeCardId={activeItem}
          city={currentCity}
        />
        :
        <MainOffersEmptyList
          city={currentCity.name}
        />
      }
    </main>
  );
};

MainOffersSection.propTypes = {
  currentCity: cityPropTypes.isRequired,
  cityOffers: PropTypes.arrayOf(offersPropTypes).isRequired,
  activeItem: PropTypes.number,
  onActiveItemChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentCity: getCurrentCityData(state),
  cityOffers: getCityOffers(state)
});

export {MainOffersSection};
export default compose(
    connect(mapStateToProps, null),
    withActiveItem
)(MainOffersSection);
