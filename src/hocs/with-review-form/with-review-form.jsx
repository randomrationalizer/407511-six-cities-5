import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";


const defaultState = {
  author: `user`,
  avatar: `https://www.fillmurray.com/g/300/300`,
  rating: 0,
  date: ``,
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
        author: this.state.author,
        avatar: this.state.avatar,
        rating: Number(this.state.rating),
        date: dayjs().format(),
        text: this.state.review
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
          comment={this.state}
        />
      );
    }
  }

  WithReviewForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
  };

  return WithReviewForm;
};

export default withReviewForm;
