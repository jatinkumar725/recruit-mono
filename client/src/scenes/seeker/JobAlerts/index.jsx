import React from "react";

import { SITE_DIR_URI } from './../../../constants/siteConstants';
import JobListItem from "../../../components/Dashboard/JobListItem";

const index = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0">Job Alerts</h2>
        <div className="short-filter d-flex align-items-center">
          <div className="text-dark fw-500 me-2">Short by:</div>
          <select className="nice-select">
            <option value="0">New</option>
            <option value="1">Category</option>
            <option value="2">Job Type</option>
          </select>
        </div>
      </div>

      <div className="wrapper">
        <JobListItem 
          companyLink="#"
          companyName="XYZ Ltd."
          companyLogo={`${SITE_DIR_URI}images/logo/media_22.png`}
          jobTitle="Developer & expert in java c++"
          jobLink="#"
          jobType="Full Time"
          jobLocation={{
            id: 1,
            name: "Mumbai",
            state: "Maharashtra",
            country: "India",
            city: "Mumbai",
            pincode: "4000",
          }}
          jobDesignation={{
            id: 1,
            name: "Developer",
          }}
          salaryDetails={{
            salaryLabel: "1-3 Lpa",
          }}
        />
      </div>

      <div className="dash-pagination d-flex justify-content-start mt-30">
        <ul className="style-none d-flex align-items-center">
          <li>
            <a href="#" className="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>..</li>
          <li>
            <a href="#">7</a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default index;
