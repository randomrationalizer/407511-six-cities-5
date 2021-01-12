import React from "react";
import PropTypes from "prop-types";
import {SortType} from "../../../const";
import SortItem from "../sort-item/sort-item";


const SortList = ({isOpened, currentSort, onSortItemClick}) => {
  return (
    <ul className={`places__options places__options--custom ${isOpened ? `places__options--opened` : ``}`}>
      {Object.values(SortType).map((item) =>
        <SortItem
          key={item}
          isActive={item === currentSort}
          sortType={item}
          onSortItemClick={onSortItemClick}
        />
      )}
    </ul>
  );
};

SortList.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  currentSort: PropTypes.string.isRequired,
  onSortItemClick: PropTypes.func.isRequired
};

export default SortList;
