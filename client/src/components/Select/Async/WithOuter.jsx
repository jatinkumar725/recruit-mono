import React, { useState, useEffect } from "react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import AsyncSelectWithFetch from "../../../utils/AsyncJBSelect";
import JBSelect from "../../../utils/JBSelect";
import { useSkDeleteProfileEntityMutation } from "../../../state/seeker/profile/api";

const WithOuter = ({
  isAsync = true,
  controlLabel,
  controlName,
  controlSearchKey,
  controlValue,
  controlErrors,
  controlTouched,
  handleChange,
  entity,
  triggerAction,
  setIsSubmitted,
  handleModalToggle,
  selectFrom,
  controlId,
  ...props
}) => {

  const SelectComponent = isAsync ? AsyncSelectWithFetch : JBSelect;

  const [formControlArrayPrevState, setFormControlArrayPrevState] =
    useState(controlValue);
  const [formControlArray, setFormControlArray] = useState(controlValue);

  const [skDeleteProfileEntity, { isLoading: skDeleteProfileEntityLoading }] =
    useSkDeleteProfileEntityMutation();

  const handleDeleteControlItems = (model) => async (entityId) => {
    try {
      // Update profile
      const response = await skDeleteProfileEntity({ entity: model, entityId });

    } catch (error) {
      setError(error.data.message);

      console.error(error);
    }
  };

  useEffect(() => {
    if (triggerAction) {
      // Get locations that are deleted ( items that are present in formControlArrayPrevState but not in formControlArray )
      const deletedControlItems = formControlArrayPrevState.filter(
        (s) => !formControlArray.find((arr) => s[entity] === arr[entity])
      );

      for (const deletedControlItem of deletedControlItems) {
        handleDeleteControlItems(controlName)(deletedControlItem[controlId]);
      }

      setIsSubmitted(false);

      handleModalToggle();
    }
  }, [triggerAction]);

  return (
    <>
      <FormControl isInvalid={controlErrors && controlTouched}>
        {controlLabel && (
          <FormLabel className="form-label">{controlLabel}</FormLabel>
        )}
        <SelectComponent
          {...props}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow:
                controlErrors && controlTouched
                  ? "0 0 0 1px #E53E3E !important"
                  : "",
            }),
          }}
          onChange={(selectedOption) => {
            // Formik expects the selected value to be passed to the handleChange function
            const filteredControlItemInCurrent =
                formControlArray.find(
                  (s) => s[entity] === selectedOption[selectFrom]
              );

            if (!filteredControlItemInCurrent) {
              const filteredControlItemInPrevious =
                formControlArrayPrevState.find(
                  (s) => s[entity] === selectedOption[selectFrom]
                );

              let filteredControlItem = { [entity]: selectedOption[selectFrom] };
              if (filteredControlItemInPrevious) {
                filteredControlItem = filteredControlItemInPrevious;
              }

              setFormControlArray([...formControlArray, filteredControlItem]);

              handleChange({
                target: {
                  name: controlName,
                  value: [...formControlArray, filteredControlItem],
                },
              });
            }
          }}
        />
        <FormErrorMessage>{controlErrors}</FormErrorMessage>
      </FormControl>
      {formControlArray.length > 0 && (
        <div className="dash-input-wrapper">
          <div className="skills-wrapper px-0">
            <ul className="style-none d-flex flex-wrap align-items-center">
              {formControlArray.map((controlItem) => (
                <li className="is_tag" key={controlItem[entity]}>
                  <button
                    onClick={() => {
                      const filteredControlItem = formControlArray.filter(
                        (s) => s[entity] !== controlItem[entity]
                      );

                      setFormControlArray(filteredControlItem);
                      handleChange({
                        target: {
                          name: controlName,
                          value: filteredControlItem,
                        },
                      });
                    }}
                  >
                    {controlItem[entity]} <i className="bi bi-x"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default WithOuter;
