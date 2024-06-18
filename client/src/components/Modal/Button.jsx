import React from 'react';
import { Button } from '@chakra-ui/react';

const ModelButton = ({
    text = "Open Modal",
    onClickEvent,
    ...props
}) => {
  return (
    <Button
        onClick={onClickEvent}
        fontWeight={500}
        {...props}
    >
        {text}
    </Button>
  )
}

export default ModelButton;