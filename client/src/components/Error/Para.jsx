import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const ErrorComponent = ({ errorMessage }) => {
  return (
    <div>
      {errorMessage && (
        <p className="error-message text-center text-danger">{errorMessage}</p>
      )}
    </div>
  );
};

const AlertErrorComponent = ({ errorMessage, setError, isAutoDismissible = true, ...props }) => {

  if (isAutoDismissible) {
    // Update error message when error prop changes
    useEffect(() => {
      setError(errorMessage);
  
      // Clear error message after 5 seconds
      if (errorMessage) {
        const timeoutId = setTimeout(() => {
          setError('');
        }, 5000);
  
        // Clear the timeout when component unmounts or when error changes
        return () => clearTimeout(timeoutId);
      }
    }, [errorMessage]);
  }

  return (
    <div>
      {errorMessage && (
        <Alert {...props} status="error" marginBottom="4">
          <AlertIcon />
          <AlertTitle>Incorrect validations</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

const useError = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const setError = (message) => {
    setErrorMessage(message);
  };

  return [errorMessage, setError];
};

export default ErrorComponent;
export { AlertErrorComponent, useError };
