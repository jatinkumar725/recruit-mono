import React, { useEffect, useState } from "react";

import { SITE_DIR_URI } from "./../../../constants/siteConstants";

// Importing Outlet
import { Outlet, useSearchParams, useNavigate } from "react-router-dom";

// import Alert from "../../../components/Alert";
import Aside from "../../../components/Seeker/Aside";
import Header from "../../../components/Seeker/Header";
import { useSkVerifyEmailAddressMutation } from "../../../state/seeker/authentication/api";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeAuth,
  setCredentials,
  setEmailVerified,
} from "../../../state/seeker/authentication/slice";
import { APP_ROUTES } from "../../../constants/routeConstant";
import { decodeJWT } from "../../../utils/decodeJWT";
import { Modal, ModalOverlay, Spinner } from "@chakra-ui/react";

const Layout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isPageLoading, setIsPageLoading] = useState(false);

  const { loggedUserInfo } = useSelector((state) => state.skAuth);
  const [searchParams] = useSearchParams();

  // Get verify email address params
  const dataParam = searchParams.get("data");
  const emailParam = searchParams.get("email");

  // Get user profile data jwt
  const profileJWT = searchParams.get("__data");

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Mutations
  const [skVerifyEmailAddress, { isLoading: skVerifyEmailAddressLoading }] =
    useSkVerifyEmailAddressMutation();

  const handleVerifyEmail = async () => {
    try {
      const response = await skVerifyEmailAddress({
        hash: dataParam,
      }).unwrap();

      if (!skVerifyEmailAddressLoading) {
        dispatch(setEmailVerified());
      }
    } catch (error) {
      console.log("Error verifying email address: ", error);
    }
  };

  useEffect(() => {
    if (dataParam && "verifyPrimaryEmail" === emailParam) {
      if (!loggedUserInfo?.isPrimaryEmailVerified) {
        handleVerifyEmail();
      }

      // Remove data & email params from url
      navigate(APP_ROUTES.SeekerProfile);
    }
  }, [emailParam, dataParam]);

  useEffect(() => {
    if (!loggedUserInfo && profileJWT) {
      // Decode profile jwt
      let profileJWTDecoded = null;
      profileJWTDecoded = decodeJWT(profileJWT);
      dispatch(setCredentials(profileJWTDecoded));

      // Remove __data params from url
      navigate(APP_ROUTES.SeekerDashboard);
    }
  }, [profileJWT]);

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
  );
};

export default Layout;
