import React, { useEffect, useState } from "react";
import { useSiteGetRecentJobPostsQuery } from "../../../state/site/post/api";
import { NavLink, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants/routeConstant";
import { EMPLOYMENT_TYPES, JOB_TYPES } from "../../../constants/siteConstants";
import { getKeyByValue, pluckList } from "../../../utils/objects";
import { formatDate } from "../../../utils/date";
import { useSkApplyToJobPostMutation } from "../../../state/seeker/post/api";
import { Button } from "@chakra-ui/react";
import { truncateText } from "../../../utils/text";

const MAXIMUM_VISIBLE_JOB_LOCATIONS = 2;

const RecentJobPosts = () => {
  const navigate = useNavigate();

  const { data, refetch: refetchRecentJobPosts } = useSiteGetRecentJobPostsQuery(1);
  const loggedIn = data?.loggedIn || false;
  const recentJobPosts = data?.jobDetails || [];

  const [loadingStatesOfPostId, setLoadingStatesOfPostId] = useState(null);

  const handleOnClickApply = (postId) => {
    if (loggedIn) {
      setLoadingStatesOfPostId(postId);
      handleApplyPostBySeeker(postId);
    } else {
      navigate(APP_ROUTES.SeekerLogin);
    }
  };

  const [skApplyJobPost, { isLoading: isSkApplyJobPostLoading }] = useSkApplyToJobPostMutation();

  const handleApplyPostBySeeker = async (postId) => {
    try {
      const response = await skApplyJobPost({ postId: parseInt(postId) }).unwrap();
      if (response.data) {
        refetchRecentJobPosts();
      }
    } catch (error) {
      console.error("Error applying to job post:", error);
      // Handle error gracefully, e.g., show a toast notification
    }
  };

  return (
    <section className="job-listing-one mt-160 lg-mt-100 sm-mt-80">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <div className="title-four text-center text-lg-start">
              <h2>Recent Listings</h2>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex justify-content-lg-end">
              <NavLink to="job-search/19076558" className="btn-six d-none d-lg-inline-block">
                Explore all jobs
              </NavLink>
            </div>
          </div>
        </div>

        <div className="job-listing-wrapper mt-60 md-mt-40 wow fadeInUp">
          {recentJobPosts.map((jobPost) => (
            <div key={jobPost.postId} className="job-list-one position-relative border-style mb-20">
              <div className="row justify-content-between align-items-center">
                <div className="col-xxl-3 col-lg-4">
                  <NavLink to={jobPost.jdUrl} className="title fw-500 ms-0 tran3s d-block">
                    {truncateText(jobPost.title, 45)}
                  </NavLink>
                  <NavLink to={`job-details-v1/${jobPost.postId}`}>
                    {truncateText(jobPost.companyDetails.name, 30)}
                  </NavLink>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                  <span className="job-duration fw-500">
                    {getKeyByValue(JOB_TYPES, jobPost.jobType)}, {getKeyByValue(EMPLOYMENT_TYPES, jobPost?.employmentType)}
                  </span>
                  <div className="job-date">{formatDate(jobPost.postDate, "d F, Y")}</div>
                </div>
                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
                  <div className="job-location">
                    <NavLink to={jobPost.jdUrl}>
                      {pluckList(jobPost.location.slice(0, MAXIMUM_VISIBLE_JOB_LOCATIONS), "city").join(", ")}
                      <span className="ms-2 text-site-primary fw-500">
                        {jobPost.location.length > MAXIMUM_VISIBLE_JOB_LOCATIONS && `${jobPost.location.length - MAXIMUM_VISIBLE_JOB_LOCATIONS}+`}
                      </span>
                    </NavLink>
                  </div>
                  <div className="job-category">
                    <NavLink to={`job-details-v1/${jobPost.postId}`}>{jobPost.designation}</NavLink>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="btn-group d-flex align-items-center justify-content-md-end sm-mt-20">
                    <Button
                      className="apply-btn text-center tran3s"
                      height="auto"
                      onClick={() => handleOnClickApply(jobPost.postId)}
                      isLoading={isSkApplyJobPostLoading && loadingStatesOfPostId === jobPost.postId}
                      isDisabled={jobPost.applyDate}
                    >
                      {jobPost.applyDate ? "APPLIED" : "APPLY"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-40 d-lg-none">
          <NavLink to="job-search" className="btn-six">
            Explore all jobs
          </NavLink>
        </div>

        <div className="text-center mt-50 wow fadeInUp">
          <div className="btn-eight fw-500">
            Do you want to post a job for your company? <NavLink to={APP_ROUTES.RecruiterLogin}>Click here</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentJobPosts;