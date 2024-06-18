import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SHARE_LINKS } from "../../constants/shareConstat";

const SharePost = ({ isOpen, onCloseSharePost, jdUrl }) => {
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="md"
      onClose={() => onCloseSharePost()}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader whiteSpace="nowrap" fontWeight={500}>
          Share Post
        </ModalHeader>
        <ModalBody className="p-0">
          <div className="inner-banner-2 py-4">
            <ul className="share-buttons d-flex flex-wrap justify-content-center style-none gap-3">
              <li>
                <a
                  href={SHARE_LINKS.facebook + jdUrl}
                  target="_blank"
                  className="d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: '#3975ea' }}
                >
                  <i className="bi bi-facebook" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href={SHARE_LINKS.twitter + jdUrl}
                  target="_blank"
                  className="d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: '#2d64bc' }}
                >
                  <i className="bi bi-twitter" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href={SHARE_LINKS.linkedin + jdUrl}
                  target="_blank"
                  className="d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: '#4a99e9' }}
                >
                  <i className="bi bi-linkedin" />
                  <span>Linkedin</span>
                </a>
              </li>
            </ul>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const useSharePost = () => {
  const [sharePostMessage, setSharePost] = useState({
    open: false,
    jdUrl: null,
  });

  return [sharePostMessage, setSharePost];
};

export default SharePost;
export { useSharePost };
