import React, {useCallback, useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SortList from "../sort-list/sort-list";
import {sortTypeToTitle} from "../util";
import {changeSort} from "../../../store/app-data/action";
import {getCurrentSort} from "../../../store/app-data/selectors";
import {checkKeyDownEvent} from "../../../utils/common";


const SortSection = ({currentSort, onSortChange}) => {
  const [isOpened, setOpened] = useState(false);

  const handleSortButtonClick = () => {
    setOpened(!isOpened);
  };

  const handleKeyDown = (evt) => {
    checkKeyDownEvent(evt, setOpened, !isOpened);
  };

  const handleSortItemClick = useCallback((newSort) => {
    onSortChange(newSort);
    setOpened(!isOpened);
  }, [isOpened]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={handleSortButtonClick}
        onKeyDown={handleKeyDown}
      >
        {sortTypeToTitle[currentSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <SortList
        isOpened={isOpened}
        onSortItemClick={handleSortItemClick}
        currentSort={currentSort}
      />
    </form>
  );
};

SortSection.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired
};

const mapStateToProps = (store) => ({
  currentSort: getCurrentSort(store)
});

const mapDispatchToProps = (dispatch) => ({
  onSortChange(sort) {
    dispatch(changeSort(sort));
  }
});

export {SortSection};
export default connect(mapStateToProps, mapDispatchToProps)(SortSection);
