import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const VerifyWrapper = ({
  isOpen,
  onClose,
  email,
  onClickEvent,
  isLoading,
  isSendedMail,
  error,
}) => {

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody className="text-center p-5">
            {error && <p className="text-danger mb-0 ps-4">{error}</p>}
            <h4>To verify your email - {email}</h4>
            <p className="text-secondary">Verification is intended to confirm that the email entered in your resume is authentic</p>
            <Button colorScheme="blue" fontWeight={500} onClick={onClickEvent} isLoading={isLoading}>
                { isSendedMail ? 'Resend' : 'Send' } Verification Link
            </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VerifyWrapper;