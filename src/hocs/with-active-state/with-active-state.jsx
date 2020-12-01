import React, {PureComponent} from "react";
import PropTypes from "prop-types";


const withActiveState = (Component) => {
  class WithActiveState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false || props.isActive
      };

      this.handleActiveChange = this.handleActiveChange.bind(this);
    }

    handleActiveChange() {
      this.setState((prevState) => ({
        isActive: !prevState.isActive
      }));
    }

    render() {
      return (
        <Component
          {...this.props}
          isActive={this.state.isActive}
          onActiveChange={this.handleActiveChange}
        />
      );
    }
  }

  WithActiveState.propTypes = {
    isActive: PropTypes.bool
  };

  return WithActiveState;
};


export default withActiveState;
