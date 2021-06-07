import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import PropTypes from "prop-types";
import withErrorMessage from "../../../hocs/with-error-message/with-error-message";
import {changeFavoriteStatus} from "../../../store/api-actions";
import {getAuthorizationStatus} from "../../../store/user/selectors";
import {OfferPageType, AppRoute, AuthorizationStatus} from "../../../const";
import "./offer-favorite-btn.css";


const pageTypeToBtnClassName = {
  [OfferPageType.CARD]: `place-card__bookmark-button`,
  [OfferPageType.DETAILS]: `property__bookmark-button`
};

const pageTypeToIconClassName = {
  [OfferPageType.CARD]: `place-card__bookmark-icon`,
  [OfferPageType.DETAILS]: `property__bookmark-icon`
};

const pageTypeToIconSize = {
  [OfferPageType.CARD]: {
    width: 18,
    height: 19
  },
  [OfferPageType.DETAILS]: {
    width: 31,
    height: 33
  }
};


const OfferFavoriteBtn = (props) => {
  const {id, pageType, changeStatus, isActive, authorizationStatus, showErrorMessage} = props;
  const history = useHistory();
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const btnClassName = pageTypeToBtnClassName[pageType];
  const iconClassName = pageTypeToIconClassName[pageType];
  const iconSize = pageTypeToIconSize[pageType];
  const [isBooked, setBookedState] = useState(isActive);


  const handleClick = () => {
    if (isAuthorized) {
      changeStatus(id, Number(!isBooked))
        .then(() => setBookedState(!isBooked))
        .catch(() => showErrorMessage(`A server error occurred.`));
    } else {
      history.push(AppRoute.LOGIN);
    }
  };

  return (
    <button
      className={`${btnClassName} ${isBooked ? `${btnClassName}--active` : ``} button`}
      type="button"
      onClick={handleClick}
    >
      <svg
        className={iconClassName}
        width={iconSize.width}
        height={iconSize.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{`${isBooked ? `In` : `To`} bookmarks`}</span>
    </button>
  );
};

OfferFavoriteBtn.propTypes = {
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  pageType: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  showErrorMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeStatus(id, status) {
    return dispatch(changeFavoriteStatus(id, status));
  }
});

export {OfferFavoriteBtn};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withErrorMessage
)(OfferFavoriteBtn);
