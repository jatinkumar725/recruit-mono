import React from "react";
import { NavLink, Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, Image } from "@chakra-ui/react";
import { truncateText } from "../../utils/text";

const JobListItem = ({
  companyLink,
  companyLogo,
  companyName,
  jobTitle,
  jobLink,
  jobType,
  jobLocation,
  jobDesignation,
  salaryDetails,
  status,
}) => {

  return (
    <div className="job-list-one style-two position-relative mb-20">
      <div className="row justify-content-between align-items-center">
        <div className="col-xxl-6 col-lg-6">
          <div className="job-title d-flex align-items-center">
            <ChakraLink as={ReactRouterLink} to={companyLink} className="logo">
              <Image
                src={companyLogo}
                alt={companyName}
                className="m-auto"
              />
            </ChakraLink>            
            <div>
              <ChakraLink as={ReactRouterLink} to={companyLink} className="title fs-6 fw-500 job-duration">
                By {truncateText(companyName, 35)}
              </ChakraLink>            
              <ChakraLink as={ReactRouterLink} to={jobLink} className="title fw-500 tran3s d-block">
                {truncateText(jobTitle, 30)}
              </ChakraLink>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-sm-6 ms-auto">
          <span className="job-duration fw-500">{jobType}</span>
          <div className="job-salary">
            <span className="fw-500 text-dark">{!salaryDetails?.hideSalary ? `₹ ${salaryDetails.label}` : 'Not Disclosed'}</span>
          </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-sm-6 ms-auto xs-mt-10">
          <div className="job-location">{jobLocation.city}</div>
          <div className="job-category fw-500 text-dark">
            {jobDesignation.name}
          </div>
        </div>
        <div className="col-lg-2 col-sm-6 mt-3 mt-xxl-0">
          <div className={`job-item-status ${status?.bg}`}>{status?.text}</div>
        </div>
      </div>
    </div>
  );
};

export default JobListItem;
