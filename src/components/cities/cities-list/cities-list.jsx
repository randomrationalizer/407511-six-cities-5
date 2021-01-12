import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import City from "../city/city";
import {cityPropTypes} from "../city.prop";
import {changeCity} from "../../../store/action";
import {getCities} from "../../../store/selectors";


const CitiesList = ({cities, currentCity, onCityChange}) => {
  const handleCityChange = (newCity) => {
    onCityChange(newCity);
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) =>
        <City
          key={city.name}
          city={city}
          isActive={city.name === currentCity.name}
          onCityClick={handleCityChange}
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


const mapStateToProps = (state) => ({
  cities: getCities(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(changeCity(city));
  }
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
