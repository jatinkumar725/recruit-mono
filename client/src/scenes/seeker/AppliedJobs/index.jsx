import React, { useEffect, useState } from "react";
import { useSkGetAppliedJobPostsQuery } from "../../../state/seeker/post/api";
import { getKeyByValue } from "../../../utils/objects";
import JobListItem from "../../../components/Dashboard/JobListItem";
import { SITE_DIR_URI } from "../../../constants/siteConstants";
import { JOB_TYPES } from "../../../constants/siteConstants";
import { APPLICATION_STATUS } from "../../../constants/postConstants";

const Index = () => {

  const [skAppliedJobPostsList, setSkAppliedJobPostsList] = useState([]);
  const [skAppliedJobPostsPaginate, setSkAppliedJobPostsPaginate] = useState(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: { data: appliedJobPosts = [], paginator } = {},
    refetch: refetchJobPosts,
  } = useSkGetAppliedJobPostsQuery({
    options: {
      // limit: 1,
      page: currentPage,
    },
  });

  useEffect(() => {
    if (appliedJobPosts.length > 0) {
      setSkAppliedJobPostsList(appliedJobPosts);
      setSkAppliedJobPostsPaginate(paginator);
    }
  }, [appliedJobPosts]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < skAppliedJobPostsPaginate.pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <h2 className="main-title mb-40 lg-mb-30">Applied Job</h2>

      <div className="wrapper">
        {skAppliedJobPostsList.length > 0 ? (
          skAppliedJobPostsList.map((jobPost, index) => (
            <JobListItem
              key={jobPost.post.postId}
              companyLink={jobPost.post.companyDetails?.link || null}
              companyName={jobPost.post.companyDetails?.name}
              companyLogo={
                jobPost.post?.companyLogo?.uploadPath ??
                `${SITE_DIR_URI}images/logo/media_22.png`
              }
              jobTitle={jobPost.post.title}
              jobLink={jobPost.post.jdUrl}
              jobType={getKeyByValue(JOB_TYPES, jobPost.post.jobType)}
              jobLocation={jobPost.post?.location[0]}
              jobDesignation={{
                id: -1,
                name: jobPost.post.designation,
              }}
              salaryDetails={jobPost.post.salaryDetails}
              status={APPLICATION_STATUS[jobPost.applicationStatus]}
            />
          ))
        ) : (
          <div className="alert alert-warning border-danger">
            <span colSpan="5" className="text-center p-0 pt-3">
              You have not submitted any job applications.
            </span>
          </div>
        )}
      </div>

      {skAppliedJobPostsPaginate.pageCount > 1 && (
        <div className="dash-pagination d-flex justify-content-start mt-30">
          <ul className="style-none d-flex align-items-center">
            <li>
              <button
                onClick={handlePrevPage}
                disabled={!skAppliedJobPostsPaginate.hasPrevPage}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            {[...Array(skAppliedJobPostsPaginate.pageCount)].map((_, page) => (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page + 1)}
                  className={currentPage === page + 1 ? "active" : ""}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNextPage}
                disabled={!skAppliedJobPostsPaginate.hasNextPage}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Index;
