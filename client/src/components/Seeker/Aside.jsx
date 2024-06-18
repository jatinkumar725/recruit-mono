import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Avatar } from "@chakra-ui/react";

import { SITE_DIR_URI } from "../../constants/siteConstants";

// Redux
import { useSkLogoutMutation } from "./../../state/seeker/authentication/api";
import { useSkGetMeQuery } from "./../../state/seeker/profile/api";
// import { formatDateTimeAgo, getTimeAgo } from "../../utils/date";
import { logout } from "../../state/seeker/authentication/slice";
import { APP_ROUTES } from "../../constants/routeConstant";

const Aside = ({ setIsPageLoading, isAsideNavbarOpen, handleToggleNav }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loggedUserInfo, timestamp } = useSelector((state) => state.skAuth);
  const { data: { data: myProfileData } = {} } = useSkGetMeQuery(2);

  // Mutations
  const [skLogout, { isLoading: isLogoutLoading }] = useSkLogoutMutation();

  // Handle Logout
  const handleLogout = async (event) => {
    try {

      event.preventDefault();

      // Dispatch event
      setIsPageLoading(true);

      const response = await skLogout().unwrap();
      
      // Clear IndexedDb
      dispatch(logout());
      
      // Dispatch event
      // setIsPageLoading(false);
      
      // Navigate to login page
      navigate("/rpLogin");
    
    } catch (error) {
      console.error("Error logging out: ", error);
      setIsPageLoading(false);
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
          <NavLink to={APP_ROUTES.SeekerDashboard}>
            <img src={`${SITE_DIR_URI}images/logo/BJ-black.png`} alt="" />
          </NavLink>
          <button className="close-btn d-block d-md-none" onClick={handleToggleNav}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="user-data">
          <div className="user-avatar d-flex align-items-center justify-content-center">
            <Avatar size="lg" src={myProfileData?.profilePhoto?.uploadPath} />
          </div>
          <div className="user-name-data user-name text-center mt-0 mb-4">
            {loggedUserInfo?.name}
          </div>
          {/* <div className="user-name-data text-secondary text-center mt-0 mb-3">
            Profile last updated -{" "}
            <span className="fw-500">{myProfileData?.lastModAgo}</span>
          </div> */}
        </div>
        <nav className="dasboard-main-nav">
          <ul className="style-none">
            <li>
              <NavLink
                to={APP_ROUTES.SeekerDashboard}
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
                to={APP_ROUTES.SeekerProfile}
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
                to={APP_ROUTES.SeekerUploadResume}
                className="d-flex w-100 align-items-center"
              >
                {({ isActive }) =>
                  renderSideNav(
                    isActive ? "icon_3_active.svg" : "icon_3.svg",
                    "Resume"
                  )
                }
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to={APP_ROUTES.SeekerJobAlerts}
                className="d-flex w-100 align-items-center"
              >
                {({ isActive }) =>
                  renderSideNav(
                    isActive ? "icon_5_active.svg" : "icon_5.svg",
                    "Job Alert"
                  )
                }
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to={APP_ROUTES.SeekerAppliedJobs}
                className="d-flex w-100 align-items-center"
              >
                {({ isActive }) =>
                  renderSideNav(
                    isActive ? "icon_6_active.svg" : "icon_6.svg",
                    "Applied Job"
                  )
                }
              </NavLink>
            </li>
            <li>
              <NavLink
                to={APP_ROUTES.SeekerAccountSettings}
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
        {/* <div className="profile-complete-status my-4">
          <div className="progress-value fw-500">87%</div>
          <div className="progress-line position-relative">
            <div className="inner-line" style={{ width: "80%" }}></div>
          </div>
          <p>Profile Complete</p>
        </div> */}
      </div>
    </aside>
  );
};

export default Aside;
