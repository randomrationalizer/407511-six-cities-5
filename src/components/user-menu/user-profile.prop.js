import PropTypes from "prop-types";

export const userProfilePropTypes = PropTypes.shape({
  avatarUrl: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isPro: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
});
