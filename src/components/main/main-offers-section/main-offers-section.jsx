import React, {useCallback, useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {offersPropTypes} from "../../offer/offer.prop";
import {cityPropTypes} from "../../cities/city.prop";
import MainOffersList from "../main-offers-list/main-offers-list";
import MainOffersEmptyList from "../main-offers-empty-list/main-offers-empty-list";
import CitiesList from "../../cities/cities-list/cities-list";
import {getCities, getCityOffers, getCurrentCityData} from "../../../store/app-data/selectors";


const MainOffersSection = (props) => {
  const {cities, currentCity, cityOffers} = props;
  const isAnyOffers = cityOffers.length ? true : false;
  const [activeCardId, setActiveCard] = useState(null);

  const handleActiveCardChange = useCallback((newCardId) => {
    setActiveCard(newCardId);
  }, []);


  return (
    <main className={`page__main page__main--index ${isAnyOffers ? `` : `page__main--index-empty`}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList
            currentCity={currentCity.name}
            cities={cities}
          />
        </section>
      </div>
      {isAnyOffers ?
        <MainOffersList
          offers={cityOffers}
          onCardHover={handleActiveCardChange}
          activeCardId={activeCardId}
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
  cities: PropTypes.arrayOf(cityPropTypes).isRequired,
  currentCity: cityPropTypes.isRequired,
  cityOffers: PropTypes.arrayOf(offersPropTypes).isRequired
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
  currentCity: getCurrentCityData(state),
  cityOffers: getCityOffers(state)
});

export {MainOffersSection};
export default connect(mapStateToProps, null)(MainOffersSection);
