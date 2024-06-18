import React, { useEffect, useState } from "react";

import { JOB_TYPES, SITE_DIR_URI } from "./../../../constants/siteConstants";

import DashCard from "./../../../components/Dashboard/DashCard";
import { useSkGetAppliedJobPostsQuery } from "../../../state/seeker/post/api";
import { Image } from "@chakra-ui/react";
import { convertSingleToDoubleDigitNumber } from "../../../utils/number";
import { NavLink } from "react-router-dom";
import { getKeyByValue, pluckList } from "../../../utils/objects";

const index = () => {
  const initialDashCardData = [
    {
      title: "Search Appearances",
      value: "0",
      imageLink: `${SITE_DIR_URI}images/dashicons/icon_12.svg`
    },
    {
      title: "Applied Jobs",
      value: "0",
      imageLink: `${SITE_DIR_URI}images/dashicons/icon_15.svg`,
    }
  ];

  const {
    data: { data: appliedJobPosts = [] } = {},
    refetch: refetchJobPosts,
  } = useSkGetAppliedJobPostsQuery({
    options: {
      limit: 5,
      page: 1,
    },
  });

  const [updatedDashCardData, setUpdatedDashCardData] = useState(initialDashCardData);

  // Applied job posts
  const [skAppliedJobPostsList, setSkAppliedJobPostsList] = useState([]);
  const [skAppliedJobPostsLength, setSkAppliedJobPostsLength] = useState(0);

  // Recommended job posts
  const [recommendedJobPostsList, setSkRecommendedJobPostsList] = useState([]);

  useEffect(() => {
    if (appliedJobPosts.length > 0) {
      setSkAppliedJobPostsList(appliedJobPosts);
      setSkAppliedJobPostsLength(appliedJobPosts.length);
    }
  }, [appliedJobPosts]);

  // useEffect(() => {    
  //   if (skAppliedJobPostsLength) {
  //     const updatedData = updatedDashCardData;
  //     updatedData[1].value = convertSingleToDoubleDigitNumber(skAppliedJobPostsLength);
  //     setUpdatedDashCardData(updatedData);
  //   }
  // }, [skAppliedJobPostsLength]);

  return (
    <>
      <h2 className="main-title">Dashboard</h2>
      <div className="row">
        {/* {updatedDashCardData.map((item, index) => (
          <DashCard 
            key={index}  
            {...item}  
          />
        ))} */}
        <DashCard 
          title = "Search Appearances"
          value = "0"
          imageLink = {`${SITE_DIR_URI}images/dashicons/icon_12.svg`}
        />
        <DashCard
          title = "Applied Jobs"
          value = {skAppliedJobPostsLength || '0'}
          imageLink = {`${SITE_DIR_URI}images/dashicons/icon_15.svg`}  
        />
      </div>

      <div className="row d-flex pt-50 lg-pt-10">
        <div className="col-xl-5 col-lg-6 d-flex">
          <div className="recent-job-tab bg-white border-20 mt-30 w-100">
            <h4 className="dash-title-two">Recommended Jobs</h4>
            <div className="wrapper">
              { recommendedJobPostsList.length > 0 ? recommendedJobPostsList.map((item, index) => (
                <div key={item.post?.postId} className="job-item-list d-flex align-items-center">
                  <div>
                    <Image
                      fallbackSrc={`${SITE_DIR_URI}images/logo/media_22.png`}
                      alt=""
                      className="lazy-img logo"
                    />
                  </div>
                  <div className="job-title">
                    <h6 className="mb-5">
                      <NavLink to={item.post?.jdUrl}>{item.post?.title}</NavLink>
                    </h6>
                    <div className="meta">
                      <span>{getKeyByValue(JOB_TYPES, item.post?.jobType)}</span> . <span>{pluckList(item.post?.location, 'city').join(', ')}</span>
                    </div>
                  </div>
                </div>
              )) : <p className="text-center mt-20">You have no job recommendations yet</p>}
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-6 d-flex">
          <div className="recent-job-tab bg-white border-20 mt-30 w-100">
            <h4 className="dash-title-two">Recent Applied Job</h4>
            <div className="wrapper">
              { skAppliedJobPostsLength > 0 ? skAppliedJobPostsList.map((item, index) => (
                <div key={item.post?.postId} className="job-item-list d-flex align-items-center">
                  <div>
                    <Image
                      src={item.post?.companyLogo?.uploadPath}
                      fallbackSrc={`${SITE_DIR_URI}images/logo/media_22.png`}
                      alt=""
                      className="lazy-img logo"
                    />
                  </div>
                  <div className="job-title">
                    <h6 className="mb-5">
                      <NavLink to={item.post?.jdUrl}>{item.post?.title}</NavLink>
                    </h6>
                    <div className="meta">
                      <span>{getKeyByValue(JOB_TYPES, item.post?.jobType)}</span> . <span>{pluckList(item.post?.location, 'city').join(', ')}</span>
                    </div>
                  </div>
                </div>
              )) : <p className="text-center mt-20">You have not submitted any job applications</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
