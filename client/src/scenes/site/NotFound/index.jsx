import React from "react";
import { SITE_DIR_URI } from "../../../constants/siteConstants";
import { APP_ROUTES } from "../../../constants/routeConstant";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (<div className="error-page d-flex align-items-center justify-content-center">
  <div className="container">
      <div className="row align-items-center">
          <div className="col-xl-5 col-md-6 ms-auto order-md-last">
              <div className="error">404</div>
              <h2>Page Not Found </h2>
              <p className="text-md">Can not find what you need? Take a moment and do a search below or start from our Homepage.</p>
              <NavLink to={APP_ROUTES.Home} className="btn-one w-100 d-flex align-items-center justify-content-between mt-30">
                  <span>GO BACK</span>
                  <img src={`${SITE_DIR_URI}images/icon/icon_61.svg`} alt="" />
              </NavLink>
          </div>
          <div className="col-md-6 order-md-first">
              <img src={`${SITE_DIR_URI}images/assets/404.svg`} alt="" className="sm-mt-60" />
          </div>
      </div>
  </div>
</div>);
};

export default NotFound;
