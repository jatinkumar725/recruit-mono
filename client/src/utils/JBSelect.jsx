import React from 'react';
import Select from 'react-select';

const JBSelect = (props) => {
  return (
    <Select 
      {...props}
      classNames={{
        control: (state) => 'theme-input-styles',
      }} 
    />
  );
};

export default JBSelect;