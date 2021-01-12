import React from "react";
import PropTypes from "prop-types";
import "./error-message.css";


const ErrorMessage = (props) => {
  const {message, onClose} = props;

  const handleCloseBtnClick = () => {
    onClose();
  };

  return (
    <div className="error">
      <h2>Something went wrong:</h2>
      <p>{message}</p>
      <button onClick={handleCloseBtnClick} className="error-close" type="button">
        <span className="visually-hidden">Close</span>
      </button>
    </div>
  );
};


ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};


export default ErrorMessage;
