import React from "react";
import PropTypes from "prop-types";
import City from "../city/city";
import {cityPropTypes} from "../city.prop";


const CitiesList = (props) => {
  const {cities, currentCity, onCityChange} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) =>
        <City
          key={city.name}
          city={city}
          isActive={city.name === currentCity.name}
          onCityClick={(newCity) => onCityChange(newCity)}
        />
      )}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(cityPropTypes).isRequired,
  currentCity: cityPropTypes.isRequired,
  onCityChange: PropTypes.func.isRequired
};

export default CitiesList;
