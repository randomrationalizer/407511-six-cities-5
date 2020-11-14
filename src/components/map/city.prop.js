import PropTypes from "prop-types";
import {cities} from "../../const";

export const cityPropTypes = PropTypes.shape({
  name: PropTypes.oneOf(cities).isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired
});
