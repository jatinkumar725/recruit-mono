import React from "react";
import { SITE_DIR_URI } from "../constants/siteConstants";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../constants/routeConstant";

const Footer = () => {
  return (
    <>
      <section className="fancy-banner-five bg-image position-relative pt-100 lg-pt-60 pb-100 lg-pb-60">
        <div className="container">
          <div className="position-relative">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="title-one text-center text-lg-start">
                  <h2 className="main-font text-white">
                    Looking for Post OR Get a job?
                  </h2>
                </div>
              </div>
              <div className="col-lg-5 ms-auto">
                <p className="text-lg text-white mb-35 lg-mb-20 md-mt-20 text-center text-lg-start">
                  Find your dream job &amp; earn from all world the leading
                  brands.
                </p>
                <ul className="btn-group style-none d-flex justify-content-center justify-content-lg-start">
                  <li className="me-2 ms-2 ms-lg-0">
                    <Link
                      to={APP_ROUTES.SeekerLogin}
                      className="btn-seven border6"
                    >
                      Looking for job?
                    </Link>
                  </li>
                  <li className="ms-2 ms-2 ms-lg-0">
                    <Link
                      to={APP_ROUTES.RecruiterLogin}
                      className="btn-five border6"
                    >
                      Start Hiring
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="footer-one bg-two white-version">
        <div className="container">
          <div className="inner-wrapper">
            <div className="row">
              <div className="col-lg-2 col-md-3 footer-intro mb-15">
                <div className="logo mb-15">
                  <Link
                    to={APP_ROUTES.Home}
                    className="d-flex align-items-center"
                  >
                    <img
                      src={`${SITE_DIR_URI}images/logo/BJ-1.png`}
                      alt=""
                      width="200px"
                    />
                  </Link>
                </div>
                <img
                  src={`${SITE_DIR_URI}images/shape/shape_32.svg`}
                  alt=""
                  className="lazy-img mt-80 sm-mt-30 sm-mb-20"
                />
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 mb-20">
                <h5 className="footer-title text-white">Services​</h5>
                <ul className="footer-nav-link style-none">
                  <li>
                    <Link to="#">Browse jobs</Link>
                  </li>
                  <li>
                    <Link to="#">Top companies</Link>
                  </li>
                  <li>
                    <Link to={APP_ROUTES.SeekerLogin}>Find work</Link>
                  </li>
                  <li>
                    <Link to={APP_ROUTES.RecruiterLogin}>
                      Hire candidates
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 mb-20">
                <h5 className="footer-title text-white">Company</h5>
                <ul className="footer-nav-link style-none">
                  <li>
                    <Link to={APP_ROUTES.About}>About us</Link>
                  </li>
                  <li>
                    <Link to="#">Blogs</Link>
                  </li>
                  <li>
                    <Link to="faq">FAQ’s</Link>
                  </li>
                  <li>
                    <Link to="contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 mb-20">
                <h5 className="footer-title text-white">Support</h5>
                <ul className="footer-nav-link style-none">
                  <li>
                    <Link to="privacypolicy">Privacy policy</Link>
                  </li>
                  <li>
                    <Link to="termsconditions">Terms & conditions</Link>
                  </li>
                  <li>
                    <Link to="report-fake-job-recruiter">
                      Fraud Alert
                    </Link>
                  </li>
                  <li>
                    <Link to="feedback">Report Issue</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 mb-20 footer-newsletter">
                <h5 className="footer-title text-white">Newsletter</h5>
                <p className="text-white">Join & get important new regularly</p>
                <form action="#" className="d-flex">
                  <input type="email" placeholder="Enter your email*" />
                  <button>Send</button>
                </form>
                <p className="note">
                  We only send interesting and relevant emails.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-footer mt-50 lg-mt-20">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-4 order-lg-3 mb-15">
                <ul className="style-none d-flex order-lg-last justify-content-center justify-content-lg-end social-icon">
                  <li>
                    <a href="#">
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-dribbble"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-google"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 order-lg-2">
                <p className="text-white opacity-50 mb-15">
                  Copyright @{new Date().getFullYear()} batterjobs.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
