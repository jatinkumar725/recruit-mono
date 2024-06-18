import React, { useState } from 'react';

// Importing Components
import Header from '../../../components/Header.jsx';
import Footer from '../../../components/Footer.jsx';
import { Modal, ModalOverlay, Spinner } from '@chakra-ui/react';

// Importing Outlet
import { Outlet } from "react-router-dom";

const Layout = () => {

  const [isPageLoading, setIsPageLoading] = useState(false);
  
  return (
    <>
      <Header />
      <Outlet context={[isPageLoading, setIsPageLoading]} />
      <Footer />

      <Modal isCentered isOpen={isPageLoading}>
        <ModalOverlay
          bg="whiteAlpha.800"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </ModalOverlay>
      </Modal>
    </>
  )
}

export default Layout;