import React, {PureComponent} from "react";
import PropTypes from "prop-types";


const defaultState = {
  rating: 0,
  review: ``
};


const withReviewForm = (Component) => {
  class WithReviewForm extends PureComponent {

    constructor(props) {
      super(props);
      this.state = defaultState;

      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFieldChange(name, value) {
      this.setState({
        [name]: value
      });
    }

    handleFormSubmit() {
      const {onFormSubmit, id} = this.props;
      onFormSubmit(id, {
        comment: this.state.review,
        rating: Number(this.state.rating)
      });
      this.setState(() => (
        defaultState
      ));
    }


    render() {
      return (
        <Component
          {...this.props}
          onFieldChange={this.handleFieldChange}
          onReviewFormSubmit={this.handleFormSubmit}
          review={this.state}
        />
      );
    }
  }

  WithReviewForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  };

  return WithReviewForm;
};


export default withReviewForm;
