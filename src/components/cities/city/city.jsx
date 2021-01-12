import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cityPropTypes} from "../city.prop";


const City = ({city, isActive, onCityClick}) => {
  const handleCityClick = () => {
    if (isActive) {
      return;
    }

    onCityClick(city.name);
  };


  return (
    <li className="locations__item">
      <Link to={`#${city.name.toLowerCase()}`}
        onClick={handleCityClick}
        className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
};

City.propTypes = {
  city: cityPropTypes.isRequired,
  isActive: PropTypes.bool.isRequired,
  onCityClick: PropTypes.func.isRequired
};

export default City;
