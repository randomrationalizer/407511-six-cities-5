import React, {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ErrorMessage from "../../components/error-message/error-message";


const withErrorMessage = (Component) => {
  const WithErrorMessage = (props) => {
    const location = useLocation();
    const [error, setError] = useState(null);

    const showErrorMessage = useCallback((err) => {
      setError(err);
    }, []);

    const handleMessageClose = useCallback(() => {
      setError(null);
    }, []);

    useEffect(() => {
      if (error) {
        setError(null);
      }
    }, [location]);

    return (
      <>
        {error && <ErrorMessage message={error} onClose={handleMessageClose} />}
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
