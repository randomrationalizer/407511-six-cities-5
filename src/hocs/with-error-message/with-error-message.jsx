import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ErrorMessage from "../../components/error-message/error-message";
import {getErrorMessage} from "../../store/selectors";
import {closeErrorMessage} from "../../store/action";


const withErrorMessage = (Component) => {
  class WithErrorMessage extends PureComponent {
    constructor(props) {
      super(props);

      this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
    }

    handleErrorMessageClose() {
      const {closeErrorModal} = this.props;
      closeErrorModal();
    }

    componentWillUnmount() {
      const {message, closeErrorModal} = this.props;

      if (message) {
        closeErrorModal();
      }
    }

    render() {
      const {message} = this.props;

      return (
        <>
          {message && <ErrorMessage message={message} onClose={this.handleErrorMessageClose} />}
          <Component
            {...this.props}
          />
        </>
      );
    }
  }

  WithErrorMessage.propTypes = {
    message: PropTypes.any,
    closeErrorModal: PropTypes.func
  };

  const mapStateToProps = (state) => ({
    message: getErrorMessage(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    closeErrorModal() {
      dispatch(closeErrorMessage());
    }
  });


  return connect(mapStateToProps, mapDispatchToProps)(WithErrorMessage);
};


export {withErrorMessage};
export default withErrorMessage;
