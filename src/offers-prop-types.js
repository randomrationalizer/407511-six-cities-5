import PropTypes from "prop-types";
import {CITIES} from "./const";

const OFFER_TYPES = [`apartment`, `room`, `house`, `hotel`];

export const offersPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  city: PropTypes.oneOf(CITIES).isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.oneOf(OFFER_TYPES).isRequired,
  description: PropTypes.string.isRequired,
  bedrooms: PropTypes.number.isRequired,
  guests: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  options: PropTypes.array.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    isHighRated: PropTypes.bool.isRequired
  }).isRequired,
  isPremial: PropTypes.bool.isRequired
});