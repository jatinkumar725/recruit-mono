import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

const index = ({ text, ...restProps }) => {
  return (
    <>
      <Alert {...restProps} >
        <AlertIcon />
        {text}
      </Alert>
    </>
  );
};

export default index;
