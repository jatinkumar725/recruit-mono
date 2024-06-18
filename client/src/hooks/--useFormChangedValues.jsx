import { useState } from 'react';

const useFormikValueChange = () => {
  const [changedValues, setChangedValues] = useState({});

  const handleFormikChange = (e, handleChange) => {
    const { name, value } = e.target;
    setChangedValues((prevValues) => ({ ...prevValues, [name]: value }));
    handleChange(e); // Call Formik's handleChange to update form state
  };

  return { changedValues, handleFormikChange };
};

export default useFormikValueChange;