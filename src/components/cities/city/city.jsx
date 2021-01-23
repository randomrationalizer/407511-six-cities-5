import React from "react";
import PropTypes from "prop-types";
import CityLink from "../city-link/city-link";
import {CityLinkType} from "../../../const";


const City = ({city, isActive}) => {
  return (
    <li className="locations__item">
      <CityLink
        linkType={CityLinkType.MAIN_PAGE}
        isActive={isActive}
        city={city}
      />
    </li>
  );
};

City.propTypes = {
  city: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default City;
