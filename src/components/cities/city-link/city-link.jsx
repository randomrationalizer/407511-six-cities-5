import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {changeCity} from "../../../store/action";
import {CityLinkType} from "../../../const";

const getClassName = {
  [CityLinkType.MAIN_PAGE]: (isActive) => `locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`,
  [CityLinkType.INNER_PAGE]: () => `locations__item-link`
};


const CityLink = ({city, isActive, onCityChange, linkType}) => {
  const isMainPageLink = linkType === CityLinkType.MAIN_PAGE;
  const linkClassName = isMainPageLink ? getClassName[linkType](isActive) : getClassName[linkType]();


  const handleClick = () => {
    if (isMainPageLink && isActive) {
      return;
    }

    onCityChange(city);
  };

  return (
    <Link to={`/#${city.toLowerCase()}`}
      onClick={handleClick}
      className={linkClassName}
    >
      <span>{city}</span>
    </Link>
  );
};

CityLink.propTypes = {
  city: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onCityChange: PropTypes.func.isRequired,
  linkType: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(changeCity(city));
  }
});


export {CityLink};
export default connect(null, mapDispatchToProps)(CityLink);
