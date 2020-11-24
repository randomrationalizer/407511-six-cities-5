import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SortList from "../sort-list/sort-list";
import {sortTypeToTitle} from "../util";
import {isEnterEvent} from "../../../utils";


class Sort extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isMenuOpened: !prevState.isMenuOpened
    }));
  }

  handleKeyDown(evt) {
    isEnterEvent(evt, this.handleClick);
  }

  render() {
    const {onSortChange, currentSort} = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {sortTypeToTitle[currentSort]}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <SortList
          isOpened={this.state.isMenuOpened}
          onSortItemClick={(newSort) => {
            onSortChange(newSort);
            this.handleClick();
          }}
          currentSort={currentSort}
        />
      </form>
    );
  }
}

Sort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired
};

export default Sort;
