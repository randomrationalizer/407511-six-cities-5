import React from "react";
import PropTypes from "prop-types";
import {sortTypeToTitle} from "../util";
import {isEnterEvent} from "../../../utils";


const SortItem = (props) => {
  const {isActive, sortType, onSortItemClick} = props;

  const handleSortClick = () => {
    if (isActive) {
      return;
    }

    onSortItemClick(sortType);
  };

  const handleKeyDown = (evt) => {
    isEnterEvent(evt, handleSortClick);
  };

  return (
    <li
      className={`places__option ${isActive ? `places__option--active` : ``}`}
      tabIndex="0"
      onClick={handleSortClick}
      onKeyDown={handleKeyDown}
    >
      {sortTypeToTitle[sortType]}
    </li>
  );
};

SortItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  sortType: PropTypes.string.isRequired,
  onSortItemClick: PropTypes.func.isRequired
};

export default SortItem;
