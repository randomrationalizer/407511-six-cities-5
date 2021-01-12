import React from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
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
  const {id, pageType, onBtnClick, isActive, onActiveChange, authorizationStatus, history} = props;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const btnClassName = pageTypeToBtnClassName[pageType];
  const iconClassName = pageTypeToIconClassName[pageType];
  const iconSize = pageTypeToIconSize[pageType];

  const handleClick = () => {
    if (isAuthorized) {
      onBtnClick(id, Number(!isActive));
      onActiveChange();
    } else {
      history.push(AppRoute.LOGIN);
    }
  };

  return (
    <button
      className={`${btnClassName} ${isActive ? `${btnClassName}--active` : ``} button`}
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
      <span className="visually-hidden">{`${isActive ? `In` : `To`} bookmarks`}</span>
    </button>
  );
};

OfferFavoriteBtn.propTypes = {
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  pageType: PropTypes.string.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  onActiveChange: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(OfferFavoriteBtn);
