import React, { useEffect, useState } from "react";

import { JOB_TYPES, SITE_DIR_URI } from "../../../constants/siteConstants";
import {
  useRcDeleteSingleJobPostMutation,
  useRcGetJobPostsQuery,
} from "../../../state/recruiter/post/api";
import { getKeyByValue } from "../../../utils/objects";
import { formatDate } from "../../../utils/date";
import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../../constants/routeConstant";
import SharePost, { useSharePost } from "../../../components/Share/Post";

const Index = () => {
  const [rcJobPostsList, setRcJobPostsList] = useState([]);
  const [rcJobPostsPaginate, setRcJobPostsPaginate] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: { data: jobPosts = [], paginator } = {},
    refetch: refetchJobPosts,
  } = useRcGetJobPostsQuery({
    options: {
      // limit: 1,
      page: currentPage,
    }
  });

  useEffect(() => {
    if (jobPosts.length > 0) {
      setRcJobPostsList(jobPosts);
      setRcJobPostsPaginate(paginator);
    }
  }, [jobPosts]);

  /**
   * Handle Delete Post
   */
  const [rcDeleteSingleJobPost, { isLoading: isRcDeleteSingleJobPostLoading }] =
    useRcDeleteSingleJobPostMutation();
  const handleDeletePost = async (postId) => {
    try {
      const response = await rcDeleteSingleJobPost(postId);

      // Refetch job posts on successful delete
      refetchJobPosts();
    } catch (error) {
      console.error("error", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      refetchJobPosts
    }
  };

  const handleNextPage = () => {
    if (currentPage < rcJobPostsPaginate.pageCount) {
      setCurrentPage(currentPage + 1);
      refetchJobPosts
    }
  };

  /**
   * Share post
   */

  const [sharePost, setSharePost] = useSharePost(false);

  const handleSharePost = (event, jdUrl) => {
    event.preventDefault();

    setSharePost({
      open: true,
      jdUrl,
    });
  };

  return (
    <div className="position-relative">
      <h2 className="main-title">My Jobs</h2>

      <div className="bg-white card-box border-20">
        <div className="table-responsive">
          <table className="table job-alert-table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Job Created</th>
                <th scope="col">Applicants</th>
                <th scope="col">Job Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="border-0">
              {rcJobPostsList.length > 0 ? (
                rcJobPostsList.map((jobPost) => (
                  <tr className="job-list-one" key={jobPost.postId}>
                    <td>
                      <div className="job-name fw-500">
                        <NavLink
                          className="job-name"
                          to={jobPost.jdUrl}
                        >
                          {jobPost.title}
                        </NavLink>
                      </div>
                    </td>
                    <td>{formatDate(jobPost.postDate, "d F, Y")}</td>
                    <td>
                      {jobPost.totalApplicants > 0 ? (
                        <NavLink
                          className="job-duration"
                          to={`${APP_ROUTES.RecruiterJobApplication}/${jobPost.postId}`}
                        >
                          {`${jobPost.totalApplicants} Applications`}
                        </NavLink>
                      ) : (
                        `${jobPost.totalApplicants} Applications`
                      )}
                    </td>
                    <td>{getKeyByValue(JOB_TYPES, jobPost.jobType)}</td>
                    <td>
                      <div className="action-dots float-end">
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
                            <a className="dropdown-item" href="#" onClick={(event) => handleSharePost(event, jobPost.jdUrl)}>
                              <img
                                src={`${SITE_DIR_URI}images/dashicons/icon_19.svg`}
                                alt=""
                                className="lazy-img"
                              />{" "}
                              Share
                            </a>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to={`${APP_ROUTES.RecruiterEditJob}?postId=${jobPost.postId}`}
                            >
                              <img
                                src={`${SITE_DIR_URI}images/dashicons/icon_20.svg`}
                                alt=""
                                className="lazy-img"
                              />{" "}
                              Edit
                            </NavLink>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeletePost(jobPost.postId);
                              }}
                            >
                              <img
                                src={`${SITE_DIR_URI}images/dashicons/icon_21.svg`}
                                alt=""
                                className="lazy-img"
                              />{" "}
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-0 pt-3">
                    No job posts yet.{" "}
                    <NavLink
                      to={APP_ROUTES.RecruiterSubmitJob}
                      className="text-decoration-underline text-success"
                    >
                      Click
                    </NavLink>{" "}
                    to create new post
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {rcJobPostsPaginate.pageCount > 1 && (
        <div className="dash-pagination d-flex justify-content-end mt-30">
          <ul className="style-none d-flex align-items-center">
            {rcJobPostsPaginate.hasPrevPage && (<li>
              <button
                onClick={handlePrevPage}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>) }
            {[...Array(rcJobPostsPaginate.pageCount)].map((_, page) => (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page + 1)}
                  className={currentPage === page + 1 ? "active" : ""}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            {rcJobPostsPaginate.hasNextPage && (<li>
              <button
                onClick={handleNextPage}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>)}
          </ul>
        </div>
      )}
      <SharePost isOpen={sharePost.open} onCloseSharePost={() => setSharePost({ ...sharePost, open: false })} jdUrl={sharePost.jdUrl} />
    </div>
  );
};

export default Index;
