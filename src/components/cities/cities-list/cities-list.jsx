import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import City from "../city/city";
import {cityPropTypes} from "../city.prop";
import {ActionCreator} from "../../../store/action";


const CitiesList = (props) => {
  const {cities, currentCity, onCityChange} = props;

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
  cities: state.cities
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getCityOffers());
  }
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
