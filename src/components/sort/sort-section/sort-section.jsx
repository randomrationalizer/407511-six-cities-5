import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SortList from "../sort-list/sort-list";
import {sortTypeToTitle} from "../util";
import {ActionCreator} from "../../../store/action";
import {isEnterEvent} from "../../../utils";


const SortSection = (props) => {
  const {onSortChange, currentSort, isActive, onActiveChange} = props;

  const handleSortItemClick = (newSort) => {
    onSortChange(newSort);
    onActiveChange();
  };

  const handleKeyDown = (evt) => {
    isEnterEvent(evt, onActiveChange);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={onActiveChange}
        onKeyDown={handleKeyDown}
      >
        {sortTypeToTitle[currentSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <SortList
        isOpened={isActive}
        onSortItemClick={handleSortItemClick}
        currentSort={currentSort}
      />
    </form>
  );
};

SortSection.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActiveChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentSort: state.currentSort
});

const mapDispatchToProps = (dispatch) => ({
  onSortChange(sort) {
    dispatch(ActionCreator.changeSort(sort));
    dispatch(ActionCreator.getCityOffers());
  }
});

export {SortSection};
export default connect(mapStateToProps, mapDispatchToProps)(SortSection);
