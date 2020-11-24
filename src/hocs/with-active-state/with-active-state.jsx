import React, {PureComponent} from "react";


const withActiveState = (Component) => {
  class WithActiveState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false
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

  return WithActiveState;
};

export default withActiveState;
