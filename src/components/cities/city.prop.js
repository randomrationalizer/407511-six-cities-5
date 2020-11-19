import PropTypes from "prop-types";

export const cityPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired
});
