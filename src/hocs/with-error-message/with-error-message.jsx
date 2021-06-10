import React, {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ErrorMessage from "../../components/error-message/error-message";


const withErrorMessage = (Component) => {
  const WithErrorMessage = (props) => {
    const location = useLocation();
    const [message, setMessage] = useState(null);

    const showErrorMessage = useCallback((errorMessage) => {
      setMessage(errorMessage);
    }, []);

    const handleMessageClose = useCallback(() => {
      setMessage(null);
    }, []);

    useEffect(() => {
      if (message) {
        setMessage(null);
      }
    }, [location]);

    return (
      <>
        {message && <ErrorMessage message={message} onClose={handleMessageClose} />}
        <Component
          {...props}
          showErrorMessage={showErrorMessage}
        />
      </>
    );
  };

  return WithErrorMessage;
};

export default withErrorMessage;
