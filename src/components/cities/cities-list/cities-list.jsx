import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import City from "../city/city";
import {cityPropTypes} from "../city.prop";
import {getCities} from "../../../store/selectors";


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


const mapStateToProps = (state) => ({
  cities: getCities(state)
});


export {CitiesList};
export default connect(mapStateToProps, null)(CitiesList);
