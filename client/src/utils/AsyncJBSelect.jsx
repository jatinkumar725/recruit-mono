import React, { useState, useEffect } from "react";
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';

// Redux
import { useSiteSearchTermsMutation } from "../state/site/suggester/api";

const AsyncSelectWithFetch = ({ isCreatable = true, taxonomy, method="search", selectedInput, ...props }) => {

  const AsyncSelectElement = isCreatable ? AsyncCreatableSelect : AsyncSelect;

  let queryMethod = method;
  const [inputValue, setInputValue] = useState(selectedInput || "");
  const [defaultOptions, setDefaultOptions] = useState([]);
  // const { data: skSearchTerms = [] } = useSkSearchTermsMutation();

  const [skSearchTerms, { isLoading: isLoadingSearchTerm }] = useSiteSearchTermsMutation();

  const fnSearchTerms = async (inputValue, pass=false) => {

    if (!inputValue && !pass) return [];

    const response = await skSearchTerms({
      search_query: inputValue,
      category: taxonomy,
      method: queryMethod,
    }).unwrap();

    if (!response) return [];

    // Structure options
    const options = response.map((option) => ({
      value: option.termId,
      label: option.name,
    }));

    return options;
  };

  useEffect(() => {
    if (method === 'pre' && defaultOptions.length === 0) {
      const fnDefaultOptions = async () => {
        const options = await fnSearchTerms("", true);
        setDefaultOptions(options);
      }
      
      fnDefaultOptions();
    }
    queryMethod = 'search';
  }, [defaultOptions]);

  const loadOptions = async (inputValue, callback) => {
    try {

      // Search in default options
      const filteredOptions = defaultOptions.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
      
      if (filteredOptions.length > 0) {
        callback(filteredOptions);
        return;
      }

      const response = await fnSearchTerms(inputValue);
      callback(response);
    } catch (error) {
      console.error("Error fetching options:", error);
      callback([]);
    }
  };

  const handleInputChange = (newValue) => {
    // setInputValue(newValue.replace(/\W/g, ""));
    // if (newValue) {
      setInputValue(newValue);
    // }
  };

  return (
    <AsyncSelectElement
      cacheOptions
      escapeClearsValue={false}
      noOptionsMessage={() => null}
      loadOptions={loadOptions}
      classNames={{
        control: (state) => "theme-input-styles theme-input-styles-h-55",
      }}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      defaultOptions={defaultOptions}
      {...props}
      // controlShouldRenderValue={false}
      // defaultMenuIsOpen={true}
    />
  );
};

export default AsyncSelectWithFetch;