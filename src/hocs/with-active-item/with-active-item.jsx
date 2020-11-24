import React, {PureComponent} from "react";


const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null
      };

      this.handleItemChange = this.handleItemChange.bind(this);
    }

    handleItemChange(newItem) {
      if (newItem !== this.state.activeItem) {
        this.setState({activeItem: newItem});
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          onActiveItemChange={this.handleItemChange}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
