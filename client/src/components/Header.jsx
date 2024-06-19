import React from "react";
import { Link } from "react-router-dom";

import { SITE_DIR_URI } from "./../constants/siteConstants";
import { APP_ROUTES } from "../constants/routeConstant";

// import { useSelector } from "react-redux";

import { useLocation } from 'react-router-dom';
import Cookies from "js-cookie";

const Header = () => {
  
  // Check if seeker is logged-in
  const isLoggedUserSeeker = Cookies.get('rp_at');

  const currentUrl = useLocation().pathname;

  const cl = currentUrl === '/job-search/19076558' ? 'header-sticked' : "";

  return (
    <header className={`theme-main-menu menu-overlay menu-style-two sticky-menu ${cl}`}>
      <div className="inner-content position-relative">
        <div className="top-header">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo order-lg-0">
              <Link
                to={APP_ROUTES.Home}
                className="d-flex align-items-center"
              >
                <img src={`${SITE_DIR_URI}images/logo/BJ-1.png`} width={200} alt="" />
              </Link>
            </div>

            <div className="right-widget ms-auto ms-lg-0 order-lg-2 d-none d-md-block">
              <ul className="d-flex align-items-center style-none">
                {/* If not logged in */}
                {!isLoggedUserSeeker && (
                  <>
                    <li>
                      <Link
                        to={APP_ROUTES.SeekerLogin}
                        className="fw-500 login-btn-three tran3s"
                      >
                        Login/Sign up
                      </Link>
                    </li>
                    <li className="ms-3">
                      <Link
                        to={APP_ROUTES.RecruiterLogin}
                        className="btn-five"
                      >
                        Employer Login
                      </Link>
                    </li>
                  </>
                )}
                {/* If logged in */}
                {isLoggedUserSeeker && (
                  <li className="ms-3">
                    <Link
                      to={APP_ROUTES.SeekerDashboard}
                      className="btn-five"
                    >
                      Go to dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <nav className="navbar navbar-expand-lg p0 ms-3 ms-lg-5 order-lg-1">
              <button
                className="navbar-toggler d-block d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="d-block d-lg-none">
                    <div className="logo">
                      <Link to={APP_ROUTES.Home} className="d-block">
                        <img
                          src={`${SITE_DIR_URI}images/logo/BJ-1.png`}
                          alt=""
                          width="100"
                        />
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown mega-dropdown-sm">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={APP_ROUTES.Home}
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                    >
                      Jobs
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="row gx-1">
                        <div className="col-md-4">
                          <div className="menu-column">
                            <h6 className="mega-menu-title">Popular Categories</h6>
                            <ul className="style-none mega-dropdown-list">
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>IT jobs</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Sale jobs</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Marketing jobs</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Data Science jobs</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>HR jobs</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Engineering jobs</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="menu-column">
                            <h6 className="mega-menu-title">Jobs in demand</h6>
                            <ul className="style-none mega-dropdown-list">
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Fresher Jobs</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>MNC Jobs</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="company-v3.html"
                                  className="dropdown-item"
                                >
                                  <span>Remote Jobs</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Work form home jobs</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Walk-in jobs</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="menu-column">
                            <h6 className="mega-menu-title">Job by location</h6>
                            <ul className="style-none mega-dropdown-list">
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Jobs in delhi</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Jobs in mumbai</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="job-list" className="dropdown-item">
                                  <span>Jobs in pune</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="job-list" className="dropdown-item">
                                  <span>Jobs in kolkata</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="job-list" className="dropdown-item">
                                  <span>Jobs in uttrakhand</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown mega-dropdown-sm">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={APP_ROUTES.Home}
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                    >
                      Companies
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="row gx-1">
                        <div className="col-md-6">
                          <div className="menu-column">
                            <h6 className="mega-menu-title">Explore Categories</h6>
                            <ul className="style-none mega-dropdown-list">
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Unicorn</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>MNC</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Startup</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Product based</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Internet</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="menu-column">
                            <h6 className="mega-menu-title">Explore collections</h6>
                            <ul className="style-none mega-dropdown-list">
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Top companies</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>IT companies</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="company-v3.html"
                                  className="dropdown-item"
                                >
                                  <span>Fintech companies</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Sponsored companies</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="job-list"
                                  className="dropdown-item"
                                >
                                  <span>Featured companies</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="#"
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="contact" role="button">
                      Contact
                    </Link>
                  </li>
                  {/* If not logged in */}
                  {!isLoggedUserSeeker && (
                    <>
                      <li className="d-md-none mt-5">
                        <Link
                          to={APP_ROUTES.SeekerLogin}
                          className="fw-500 login-btn-three text-center tran3s w-100"
                        >
                          Login/Sign up
                        </Link>
                      </li>
                      <li className="d-md-none mt-5">
                        <Link
                          to={APP_ROUTES.RecruiterLogin}
                          className="btn-five w-100"
                        >
                          Employer Login
                        </Link>
                      </li>
                    </>
                  )}
                  {/* If logged in */}
                  {isLoggedUserSeeker && (
                    <li className="d-md-none mt-5">
                      <Link
                        to={APP_ROUTES.SeekerDashboard}
                        className="btn-five w-100"
                      >
                        Go to dashboard
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
