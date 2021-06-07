import React from "react";
import PropTypes from "prop-types";
import City from "../city/city";
import {cityPropTypes} from "../city.prop";


const CitiesList = ({cities, currentCity}) => {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) =>
        <City
          key={city.name}
          city={city.name}
          isActive={city.name === currentCity}
        />
      )}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(cityPropTypes).isRequired,
  currentCity: PropTypes.string.isRequired
};

export default React.memo(CitiesList);
