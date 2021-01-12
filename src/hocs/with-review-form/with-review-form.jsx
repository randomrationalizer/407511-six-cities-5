import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {checkCommentValidity, checkRatingValidity} from "../../components/reviews/util";


const defaultState = {
  rating: 0,
  review: ``,
  isCommentValid: false,
  isRatingValid: false
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
      if (name === `review`) {
        const isCommentValid = checkCommentValidity(value);
        this.setState({
          [name]: value,
          isCommentValid
        });
      }

      if (name === `rating`) {
        const isRatingValid = checkRatingValidity(value);
        this.setState({
          [name]: value,
          isRatingValid
        });
      }
    }

    handleFormSubmit() {
      const {onFormSubmit, id} = this.props;
      onFormSubmit(id, {
        comment: this.state.review,
        rating: Number(this.state.rating)
      });
    }


    render() {
      return (
        <Component
          {...this.props}
          onFieldChange={this.handleFieldChange}
          onReviewFormSubmit={this.handleFormSubmit}
          review={{comment: this.state.review, rating: this.state.rating}}
          isValid={this.state.isCommentValid && this.state.isRatingValid}
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
