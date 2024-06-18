import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Avatar } from "@chakra-ui/react";

import { SITE_DIR_URI } from "../../constants/siteConstants";

// Redux
import { useRcLogoutMutation } from "./../../state/recruiter/authentication/api";
import { useRcGetMeQuery } from "./../../state/recruiter/profile/api";
import { getTimeAgo } from "../../utils/date";
import { logout } from "../../state/recruiter/authentication/slice";
import { APP_ROUTES } from "../../constants/routeConstant";

const Aside = ({ setIsPageLoading, isAsideNavbarOpen, handleToggleNav }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loggedUserInfo, timestamp } = useSelector((state) => state.rcAuth);
  const { data: { data: myProfileData } = {} } = useRcGetMeQuery(2);

  // Mutations
  const [rcLogout, { isLoading: isLogoutLoading }] = useRcLogoutMutation();

  // Handle Logout
  const handleLogout = async (event) => {
    try {

      event.preventDefault();
      
      // Dispatch event
      setIsPageLoading(true);
      
      const response = await rcLogout().unwrap();
      
      // Clear IndexedDb
      dispatch(logout());
      
      // Dispatch event
      // setIsPageLoading(false);

      // Navigate to login page
      navigate("/rpRecruit/login");

    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  const renderSideNav = (img, name) => {
    return (
      <>
        <img src={`${SITE_DIR_URI}images/dashicons/${img}`} alt="" />
        <span>{name}</span>
      </>
    );
  };

  return (
    <aside className={`dash-aside-navbar ${isAsideNavbarOpen ? 'show' : ''}`}>
      <div className="position-relative">
        <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
          <NavLink to={APP_ROUTES.RecruiterDashboard}>
            <img src={`${SITE_DIR_URI}images/logo/BJ-black.png`} alt="" />
          </NavLink>
          <button className="close-btn d-block d-md-none" onClick={handleToggleNav}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="user-data">
          <div className="user-avatar d-flex align-items-center justify-content-center">
            <Avatar size="lg" src={myProfileData?.companyLogo?.uploadPath} maxWidth="100%" maxHeight="100%" />
          </div>
          <div className="user-name-data user-name text-center mt-0 mb-2">
            {loggedUserInfo?.name}
          </div>
        </div>
        <nav className="dasboard-main-nav">
          <ul className="style-none">
            <li>
              <NavLink
                to={APP_ROUTES.RecruiterDashboard}
                className="d-flex w-100 align-items-center"
              >
                {({ isActive }) =>
                  renderSideNav(
                    isActive ? "icon_1_active.svg" : "icon_1.svg",
                    "Dashboard"
                  )
                }
              </NavLink>
            </li>
            <li>
              <NavLink
                to={APP_ROUTES.RecruiterProfile}
                className="d-flex w-100 align-items-center"
              >
                {({ isActive }) =>
                  renderSideNav(
                    isActive ? "icon_2_active.svg" : "icon_2.svg",
                    "My Profile"
                  )
                }
              </NavLink>
            </li>
            <li>
              <NavLink
                to={APP_ROUTES.RecruiterMyJobs}
                className="d-flex w-100 align-items-center"
              >
                {({ isActive }) =>
                  renderSideNav(
                    isActive ? "icon_3_active.svg" : "icon_3.svg",
                    "My Jobs"
                  )
                }
              </NavLink>
            </li>
            <li>
              <NavLink
                to={APP_ROUTES.RecruiterSubmitJob}
                className="d-flex w-100 align-items-center"
              >
                {({ isActive }) =>
                  renderSideNav(
                    isActive ? "icon_39_active.svg" : "icon_39.svg",
                    "Submit Job"
                  )
                }
              </NavLink>
            </li>
            <li>
              <NavLink
                to={APP_ROUTES.RecruiterSavedCandidates}
                className="d-flex w-100 align-items-center"
              >
                {({ isActive }) =>
                  renderSideNav(
                    isActive ? "icon_6_active.svg" : "icon_6.svg",
                    "Saved Candidates"
                  )
                }
              </NavLink>
            </li>
            <li>
              <NavLink
                to={APP_ROUTES.RecruiterAccount}
                className="d-flex w-100 align-items-center"
              >
                {({ isActive }) =>
                  renderSideNav(
                    isActive ? "icon_7_active.svg" : "icon_7.svg",
                    "Account Settings"
                  )
                }
              </NavLink>
            </li>
            <li>
              <Link href="#" className="d-flex w-100 align-items-center ms-0 logout-btn cursor-pointer" onClick={handleLogout}>
                <img
                  src={`${SITE_DIR_URI}images/dashicons/icon_9.svg`}
                  alt=""
                  className="lazy-img"
                />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Aside;
