import React from "react";
import { Button } from "@chakra-ui/react";

const VerifyButton = ({ text, onClickEvent }) => {
  return (
    <Button colorScheme="blue" variant="link" fontWeight={500} onClick={onClickEvent}>
      {text}
    </Button>
  );
};

export default VerifyButton;
