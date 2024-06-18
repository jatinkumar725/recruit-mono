import React, { useState, useEffect } from 'react';

import { SITE_DIR_URI } from "./../../../constants/siteConstants";

// Importing Outlet
import { Outlet, useSearchParams, useNavigate } from "react-router-dom";

// import Alert from "../../../components/Alert";
import Aside from "../../../components/Recruiter/Aside";
import Header from "../../../components/Recruiter/Header";
import { useRcVerifyEmailAddressMutation } from '../../../state/recruiter/authentication/api';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, setEmailVerified } from '../../../state/recruiter/authentication/slice';
import { Modal, ModalOverlay, Spinner } from '@chakra-ui/react';
import { APP_ROUTES } from '../../../constants/routeConstant';

const Layout = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isPageLoading, setIsPageLoading] = useState(false);

  const { loggedUserInfo } = useSelector((state) => state.rcAuth);  
  const [searchParams] = useSearchParams();

  // Get verify email address params
  const dataParam = searchParams.get('data'); 
  const emailParam  = searchParams.get('email'); 

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Mutations
  const [rcVerifyEmailAddress, { isLoading: rcVerifyEmailAddressLoading }] = useRcVerifyEmailAddressMutation();

  const handleVerifyEmail = async () => {
    try {
      const response = await rcVerifyEmailAddress({
        hash: dataParam,
      }).unwrap();

      if (!rcVerifyEmailAddressLoading) {
        dispatch(setEmailVerified());
      }

    } catch (error) {
      console.log('Error verifying email address: ', error)
    }
  };

  useEffect(() => {
    if (dataParam && "verifyPrimaryEmail" === emailParam) {
      
      if (!loggedUserInfo?.isPrimaryEmailVerified) {
        handleVerifyEmail();
      } 

      // Remove data & email params from url
      navigate(APP_ROUTES.RecruiterProfile);
    }
  }, [emailParam, dataParam]);

  const [isAsideNavbarOpen, setIsAsideNavbarOpen] = useState(false);

  const handleToggleNav = () => {
    setIsAsideNavbarOpen(!isAsideNavbarOpen);
  };
  
  return (
    <>
    <div className="main-page-wrapper">
      <Aside setIsPageLoading={setIsPageLoading} isAsideNavbarOpen={isAsideNavbarOpen} handleToggleNav={handleToggleNav} />
      <div className="dashboard-body">
        <div className="position-relative">
          <Header handleToggleNav={handleToggleNav} />
          <Outlet context={[isPageLoading, setIsPageLoading]} />
        </div>
      </div>

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
    </div>    
    </>  
  )
}

export default Layout;