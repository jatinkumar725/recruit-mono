import React from "react";
import { SITE_DIR_URI } from "../../constants/siteConstants";
import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../constants/routeConstant";

const Header = ({ handleToggleNav }) => {
  return (
    <header className="dashboard-header">
      <div className="d-flex align-items-center justify-content-end">
        <button
          className="dash-mobile-nav-toggler d-block d-md-none me-auto"
          onClick={handleToggleNav}
        >
          <span></span>
        </button>
        <form action="#" className="search-form">
          <input type="text" placeholder="Search here.." />
          <button>
            <img
              src={`${SITE_DIR_URI}images/dashicons/icon_10.svg`}
              alt=""
              className="lazy-img m-auto"
            />
          </button>
        </form>
        {/* <div className="profile-notification ms-2 ms-md-5 me-4">
          <button
            className="noti-btn dropdown-toggle"
            type="button"
            id="notification-dropdown"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <img
              src={`${SITE_DIR_URI}images/dashicons/icon_11.svg`}
              alt=""
              className="lazy-img"
            />
            <div className="badge-pill"></div>
          </button>
          <ul className="dropdown-menu" aria-labelledby="notification-dropdown">
            <li>
              <h4>Notification</h4>
              <ul className="style-none notify-list">
                <li className="d-flex align-items-center">
                  <img
                    src={`${SITE_DIR_URI}images/dashicons/icon_36.svg`}
                    alt=""
                    className="lazy-img icon"
                  />
                  <div className="flex-fill ps-2">
                    <h6>You have 3 new mails</h6>
                    <span className="time">3 hours ago</span>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <img
                    src={`${SITE_DIR_URI}images/dashicons/icon_37.svg`}
                    alt=""
                    className="lazy-img icon"
                  />
                  <div className="flex-fill ps-2">
                    <h6>Your job post has been approved</h6>
                    <span className="time">1 day ago</span>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <img
                    src={`${SITE_DIR_URI}images/dashicons/icon_38.svg`}
                    alt=""
                    className="lazy-img icon"
                  />
                  <div className="flex-fill ps-2">
                    <h6>Your meeting is cancelled</h6>
                    <span className="time">3 days ago</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div> */}
        <div className="ms-4">
          <NavLink
            className="job-post-btn tran3s"
            to={APP_ROUTES.RecruiterSubmitJob}
          >
            Post a Job
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
