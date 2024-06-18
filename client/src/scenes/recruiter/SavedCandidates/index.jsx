import React, { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

import { SITE_DIR_URI } from "../../../constants/siteConstants";

import { Avatar } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import {
  useRcGetSavedSeekersQuery,
  useRcDeleteSavedSeekerMutation,
} from "../../../state/recruiter/savedSeeker/api";
// import { setCredentials } from "../../../state/recruiter/authentication/slice";

const Index = () => {

  // const dispatch = useDispatch();

  const [isPageLoading, setIsPageLoading] = useOutletContext();

  const { loggedUserInfo } = useSelector((state) => state.rcAuth);

  const [rcSavedSeekersPaginate, setRcSavedSeekersPaginate] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: savedSeekers = [],
    paginator = {},
    refetch: refetchSavedSeekers,
  } = useRcGetSavedSeekersQuery({
    profileId: loggedUserInfo.profileId,
    options: {
      page: currentPage,
    },
  });

  useEffect(() => {
    if (savedSeekers.length > 0) {
      setRcSavedSeekersPaginate(paginator);
    }
  }, [savedSeekers]);

  /**
   * Handle Delete Post
   */
  const [
    rcDeleteSingleSavedSeeker,
    { isLoading: isRcDeleteSingleSavedSeekerLoading },
  ] = useRcDeleteSavedSeekerMutation();
  
  const handleDeleteSavedSeeker = async (savedSeekerId) => {
    try {

      setIsPageLoading(true);

      const response = await rcDeleteSingleSavedSeeker(savedSeekerId);

      // ? Commenting it because already retrieving totalSavedSeekers for dashboard with another approach  
      // if (response?.data?.profile) {
      //   dispatch(setCredentials(response.data.profile));
      // }

      // Refetch job posts on successful delete
      refetchSavedSeekers();

      setIsPageLoading(false);
      
    } catch (error) {
      console.error("error", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      refetchSavedSeekers;
    }
  };

  const handleNextPage = () => {
    if (currentPage < rcSavedSeekersPaginate.pageCount) {
      setCurrentPage(currentPage + 1);
      refetchSavedSeekers;
    }
  };

  return (
    <div className="position-relative">
      <h2 className="main-title mb-40 lg-mb-30">Saved Candidate</h2>

      <div className="wrapper">
        {savedSeekers.length > 0 ? (
          savedSeekers.map((savedSeeker) => (
            <div key={savedSeeker.sId} className="candidate-profile-card list-layout border-0 mb-25">
              <div className="d-flex">
                <div className="cadidate-avatar position-relative d-block me-auto ms-auto">
                  <NavLink to={savedSeeker.seeker?.staticUrl} className="rounded-circle">
                    <Avatar
                      src={savedSeeker.seeker?.profilePhoto?.uploadPath}
                      width="80px"
                      height="80px"
                    />
                  </NavLink>
                </div>
                <div className="right-side">
                  <div className="row gx-1 align-items-center">
                    <div className="col-xl-3">
                      <div className="position-relative">
                        <h4 className="candidate-name mb-0">
                          <NavLink to={savedSeeker.seeker?.staticUrl} className="tran3s">
                            {savedSeeker.seeker?.name}
                          </NavLink>
                        </h4>
                        {savedSeeker.seeker?.designation && (
                          <div className="candidate-post">
                            {savedSeeker.designation}
                          </div>
                        )}
                        {savedSeeker.seeker?.skills?.length > 0 && (
                          <ul className="cadidate-skills style-none d-flex align-items-center">
                            {savedSeeker.seeker.skills
                              .split(",")
                              .slice(0, 2)
                              .map((skill) => (
                                <li key={skill}>{skill}</li>
                              ))}
                            {savedSeeker.seeker.skills.split(",")?.length > 2 && (
                              <li className="more">
                                {savedSeeker.seeker.skills.split(",")?.length - 2}+
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="candidate-info">
                        <span>Salary</span>
                        <div>₹{savedSeeker.seeker?.currentSalary || "Not mentioned"}</div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="candidate-info">
                        <span>Location</span>
                        <div>
                          {savedSeeker.seeker?.location?.length
                            ? `${savedSeeker.seeker?.location[0].city}, ${savedSeeker.seeker?.location[0].pincode}`
                            : "Not mentioned"}
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-4">
                      <div className="d-flex justify-content-md-end align-items-center">
                        <NavLink
                          to={savedSeeker.seeker?.staticUrl}
                          className="save-btn text-center rounded-circle tran3s mt-10 fw-normal"
                        >
                          <i className="bi bi-eye"></i>
                        </NavLink>
                        <div className="action-dots float-end mt-10 ms-2">
                          <button
                            className="action-btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span></span>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <a className="dropdown-item" href="#">
                                <img
                                  src={`${SITE_DIR_URI}ges/icon/icon_19.svg`}
                                  alt=""
                                  className="lazy-img"
                                />{" "}
                                Share
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeleteSavedSeeker(savedSeeker.sId);
                                }}
                              >
                                <img
                                  src={`${SITE_DIR_URI}ges/icon/icon_21.svg`}
                                  alt=""
                                  className="lazy-img"
                                />{" "}
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-warning border-danger">
            <span colSpan="5" className="text-center p-0 pt-3">
              No saved candidates yet.
            </span>
          </div>
        )}
      </div>

      {rcSavedSeekersPaginate.pageCount > 1 && (
        <div className="dash-pagination d-flex justify-content-end mt-30">
          <ul className="style-none d-flex align-items-center">
            {rcSavedSeekersPaginate.hasPrevPage && (
              <li>
                <button onClick={handlePrevPage}>
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>
            )}
            {[...Array(rcSavedSeekersPaginate.pageCount)].map((_, page) => (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page + 1)}
                  className={currentPage === page + 1 ? "active" : ""}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            {rcSavedSeekersPaginate.hasNextPage && (
              <li>
                <button onClick={handleNextPage}>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Index;
