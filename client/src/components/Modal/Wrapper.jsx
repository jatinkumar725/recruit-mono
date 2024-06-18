import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ModalWrapper = ({
  title,
  isOpen,
  onClose,
  children,
  initialValues, 
  validationSchema, 
  onSubmit,
  onDelete,
  isLoading,
  deleteById,
  isDelete = false,
  error,
  saveText = 'Save'
}) => {

  const [errorMessage, setErrorMessage] = useState(error);

  // Update error message when error prop changes
  useEffect(() => {
    setErrorMessage(error);

    // // Clear error message after 5 seconds
    // if (error) {
    //   const timeoutId = setTimeout(() => {
    //     setErrorMessage('');
    //   }, 5000);

    //   // Clear the timeout when component unmounts or when error changes
    //   return () => clearTimeout(timeoutId);
    // }
  }, [error]);

  const onCloseModel = () => {
    onClose();
    setErrorMessage('');
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => onCloseModel()} size="xl">
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape(validationSchema)}
          onSubmit={onSubmit}
        > 
          {(formik) => (
            <Form className="p-3 pt-4">
              <ModalCloseButton />
              <div className="d-flex align-items-center justify-content-between">
                <ModalHeader whiteSpace="nowrap" fontWeight={500}>{title}</ModalHeader>
                { isDelete && <Button variant="link" mr={3} fontWeight={500} colorScheme="blue"  isDisabled={isLoading} onClick={() => onDelete(initialValues[deleteById])}>Delete</Button> }
              </div>
              {errorMessage && <p className="text-danger mb-0 ps-4">{errorMessage}</p>}
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button variant='outline' mr={3} fontWeight={500} onClick={() => onCloseModel()}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="teal" fontWeight={500} isLoading={isLoading}>
                  {saveText}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;