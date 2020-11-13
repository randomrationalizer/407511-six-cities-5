import PropTypes from "prop-types";

export const reviewsPropTypes = PropTypes.shape({
  propertyId: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired
});

