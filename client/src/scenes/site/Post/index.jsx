import React, { useEffect, useState } from "react";

import { Link, NavLink, useParams } from "react-router-dom";

import { EMPLOYMENT_TYPES, JOB_TYPES, SITE_DIR_URI } from "./../../../constants/siteConstants";
import { SHARE_LINKS } from "../../../constants/shareConstat";
import { APP_ROUTES } from "../../../constants/routeConstant";

import InnerBanner from "../../../components/InnerBanner";
import { Box, Image, Spinner } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

import { useSelector } from "react-redux";
import {
  useSiteGetJobPostDetailsQuery,
  useSiteJobPostViewsMutation,
} from "../../../state/site/post/api";
import { useSkApplyToJobPostMutation } from "../../../state/seeker/post/api";

import { getKeyByValue, pluckList } from "../../../utils/objects";
import { formatDate } from "../../../utils/date";

const Index = () => {
  // Get job post details
  const { jobSlug } = useParams();

  // Extract slug and postId from pathname
  const slugArray = jobSlug.split("-");
  const postId = slugArray.pop();

  const { loggedUserInfo } = useSelector((state) => state.skAuth);

  // Mutations
  const { data, refetch: refetchJobPostDetails } =
    useSiteGetJobPostDetailsQuery({ postId });
  const [skApplyJobPost, { isLoading: isSkApplyJobPostLoading }] =
    useSkApplyToJobPostMutation();

  const [jobPostDetails, setJobPostDetails] = useState({});

  /**
   * Post View
   */
  const [siteJobPostViews, { isLoading: isLoadingSiteJobPostViews }] =
    useSiteJobPostViewsMutation();

  const triggerJobPostViews = async () => {
    try {
      await siteJobPostViews({
        postId: parseInt(postId),
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      const { skills, jobType, postDate, employmentType, location, ...restData } = data.jobDetails;

      // Re-build skills
      const skillsArray = skills.split(",");

      // Re-build job type
      const jobTypeDetails = getKeyByValue(JOB_TYPES, jobType);

      // Re-build employment type
      const employmentTypeDetails = getKeyByValue(EMPLOYMENT_TYPES, employmentType);

      // Re-build post date
      const postDateFormat = formatDate(postDate, "d F, Y");

      // Re-build location
      const locationDetails = pluckList(location, "city");

      setJobPostDetails({
        ...restData,
        skills: skillsArray,
        jobType: jobTypeDetails,
        employmentType: employmentTypeDetails,
        postDate: postDateFormat,
        location: locationDetails,
      });

      // Trigger job post views
      triggerJobPostViews();
    }
  }, [data]);

  // Handle apply post
  const handleApplyPostBySeeker = async () => {
    try {
      const response = await skApplyJobPost({
        postId: parseInt(postId),
      }).unwrap();

      if (response.data) {
        refetchJobPostDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* 
		=============================================
			Inner Banner
		============================================== 
		*/}
      <InnerBanner
        heading={jobPostDetails.title}
        beforeTitle={
          <div className="post-date">
            {jobPostDetails.postDate} by{" "}
            <Link
              href="#website-link"
              // target="_blank"
              className="fw-500 text-white"
            >
              {jobPostDetails.companyDetails &&
                jobPostDetails.companyDetails.name}
            </Link>
          </div>
        }
        afterTitle={
          <ul className="share-buttons d-flex flex-wrap justify-content-center style-none mt-10">
            <li>
              <a
                href={SHARE_LINKS.facebook + jobPostDetails.jdUrl}
                target="_blank"
                className="d-flex align-items-center justify-content-center"
              >
                <i className="bi bi-facebook" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href={SHARE_LINKS.twitter + jobPostDetails.jdUrl}
                target="_blank"
                className="d-flex align-items-center justify-content-center"
              >
                <i className="bi bi-twitter" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a
                to={SHARE_LINKS.linkedin + jobPostDetails.jdUrl}
                href="_blank"
                className="d-flex align-items-center justify-content-center"
              >
                <i className="bi bi-linkedin" />
                <span>Linkedin</span>
              </a>
            </li>
          </ul>
        }
      />
      {/* /.inner-banner-one */}
      {/* 
		=============================================
			Job Details
		============================================== 
		*/}
      <section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="details-post-data pe-xxl-4">
                <div className="post-block border-style">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      1
                    </div>
                    <h4 className="block-title">Job Description</h4>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobPostDetails.description,
                    }}
                  />
                </div>
                <div className="post-block border-style mt-40 lg-mt-30 job-company-info bg-transparent">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      2
                    </div>
                    <h4 className="block-title">Key Skills:</h4>
                  </div>
                  <div className="job-tags d-flex flex-wrap pt-15">
                    {jobPostDetails.skills &&
                      jobPostDetails.skills.map((skill) => (
                        <NavLink key={skill} to="#" className="py-1 px-4">
                          {skill}
                        </NavLink>
                      ))}
                  </div>
                </div>
                <div className="post-block border-style mt-40 lg-mt-30">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      3
                    </div>
                    <h4 className="block-title">Education</h4>
                  </div>
                  <ul className="mt-20 list-unstyled">
                    <li>
                      <span className="fw-500">UG: </span>{" "}
                      {!jobPostDetails.education?.reqUg
                        ? jobPostDetails.education?.ug
                        : "Graduation not required"}
                    </li>
                    {!jobPostDetails.education?.reqUg &&
                      jobPostDetails.education?.pg && (
                        <li>
                          <span className="fw-500">PG: </span>
                          {jobPostDetails.education?.pg}
                        </li>
                      )}
                    {!jobPostDetails.education?.reqUg &&
                      jobPostDetails.education?.ppg && (
                        <li>
                          <span className="fw-500">Doctoral/Ph.D: </span>
                          {jobPostDetails.education?.ppg}
                        </li>
                      )}
                  </ul>
                </div>
                <div className="post-block border-style mt-40 lg-mt-30">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      4
                    </div>
                    <h4 className="block-title">About Company</h4>
                  </div>
                  {jobPostDetails.companyDetails?.details && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobPostDetails.companyDetails?.details,
                      }}
                    />
                  )}
                </div>
                <div className="post-block border-style mt-40 lg-mt-30">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      5
                    </div>
                    <h4 className="block-title">
                      Safeguard Your Job Search: Beware of Imposters
                    </h4>
                  </div>
                  <p>
                    Job seekers, beware of imposters! Scammers may pose as
                    legitimate employers or recruiters to gain access to your
                    personal information or scam you out of money. To protect
                    yourself, be cautious of unsolicited job offers, check the
                    company's website and social media profiles, never provide
                    sensitive personal information, be wary of upfront fees, and
                    trust your instincts. If you encounter any suspicious
                    activity, contact us immediately. Stay safe and secure while
                    searching for your dream job!
                  </p>
                </div>
              </div>
              {/* /.details-post-data */}
            </div>
            <div className="col-xl-4">
              <div className="job-company-info ms-xxl-0 lg-mt-50">
                {jobPostDetails.companyLogo && (
                  <Image
                    src={jobPostDetails.companyLogo}
                    fallbackSrc={`${SITE_DIR_URI}images/logo/media_37.png`}
                    alt=""
                    className="lazy-img m-auto logo"
                  />
                )}
                <div className="text-md text-dark text-center">
                  {jobPostDetails.companyDetails?.name}
                </div>
                {jobPostDetails.companyLogo && (
                  <Link
                    to="#website-link"
                    target="_blank"
                    className="website-btn tran3s"
                  >
                    Visit website
                  </Link>
                )}
                <div className="border-top mt-40 pt-40">
                  <ul className="job-meta-data row style-none">
                    <li className="col-xl-7 col-md-4 col-sm-6">
                      <span>Salary</span>
                      <div>₹ {!jobPostDetails.salaryDetails?.hideSalary ? jobPostDetails.salaryDetails?.label : 'Not Disclosed'}</div>
                    </li>
                    <li className="col-xl-5 col-md-4 col-sm-6">
                      <span>Industry</span>
                      <div>{jobPostDetails.industry}</div>
                    </li>
                    <li className="col-xl-7 col-md-4 col-sm-6">
                      <span>Location</span>
                      <div>
                        {jobPostDetails.location &&
                          [...new Set(jobPostDetails.location)].join(",")}
                      </div>
                    </li>
                    <li className="col-xl-5 col-md-4 col-sm-6">
                      <span>Employment Type</span>
                      <div>{jobPostDetails.employmentType}, {jobPostDetails.jobType}</div>
                    </li>
                    <li className="col-xl-7 col-md-4 col-sm-6">
                      <span>Date</span>
                      <div>{jobPostDetails.postDate}</div>
                    </li>
                    <li className="col-xl-5 col-md-4 col-sm-6">
                      <span>Experience</span>
                      <div>
                        {`${jobPostDetails.minimumExperience} - ${jobPostDetails.maximumExperience} years`}
                      </div>
                    </li>
                    <li className="col-xl-7 col-md-4 col-sm-6">
                      <span>Openings</span>
                      <div>{jobPostDetails.totalOpening}</div>
                    </li>
                    <li className="col-xl-5 col-md-4 col-sm-6">
                      <span>Applicants</span>
                      <div>{jobPostDetails.totalApplicants}</div>
                    </li>
                  </ul>
                  {jobPostDetails?.applyDate ? (
                    <Box
                      className="btn-five w-100 mt-10"
                      paddingY="8px"
                      border="2px solid transparent"
                      _hover={{
                        background: "#00BF58",
                      }}
                    >
                      Applied
                    </Box>
                  ) : data?.loggedIn ? (
                    <Box
                      as="button"
                      onClick={handleApplyPostBySeeker}
                      disabled={isSkApplyJobPostLoading}
                      className="btn-one w-100 mt-10 d-flex align-items-center justify-content-center gap-2"
                    >
                      {isSkApplyJobPostLoading ? <Spinner /> : "Apply Now"}
                    </Box>
                  ) : (
                    <NavLink
                      to={`${APP_ROUTES.SeekerLogin}?redirectURL=${jobPostDetails.jdUrl}`}
                      className="btn-one w-100 mt-10"
                      onClick={() =>
                        sessionStorage.setItem(
                          "redirectURL",
                          jobPostDetails.jdUrl
                        )
                      }
                    >
                      Login to apply
                    </NavLink>
                  )}
                </div>
              </div>
              {/* /.job-company-info */}
            </div>
          </div>
        </div>
      </section>
      {/*
		=====================================================
			Related Job Slider
		=====================================================
		*/}
      <section className="related-job-section pt-90 lg-pt-70 pb-120 lg-pb-70">
        <div className="container">
          <div className="position-relative">
            <div className="title-three text-center text-md-start mb-55 lg-mb-40">
              <h2 className="main-font">Related Jobs</h2>
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={{
                // Add navigation controls
                prevEl: ".prev_e",
                nextEl: ".next_e",
              }}
              modules={[Navigation, Autoplay]}
              className="related-job-slider"
            >
              <SwiperSlide>
                <div className="item">
                  <div className="job-list-two style-two position-relative">
                    <a href="job-details-v2.html" className="logo">
                      <img
                        src="images/logo/media_22.png"
                        alt=""
                        className="m-auto"
                      />
                    </a>
                    <a
                      href="job-details-v2.html"
                      className="save-btn text-center rounded-circle tran3s"
                      title="Save Job"
                    >
                      <i className="bi bi-bookmark-dash" />
                    </a>
                    <div>
                      <a
                        href="job-details-v2.html"
                        className="job-duration fw-500"
                      >
                        Fulltime
                      </a>
                    </div>
                    <div>
                      <a
                        href="job-details-v2.html"
                        className="title fw-500 tran3s"
                      >
                        Lead designer &amp; expert in maya 3D
                      </a>
                    </div>
                    <div className="job-salary">
                      <span className="fw-500 text-dark">$300-$450</span> / Week
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-auto">
                      <div className="job-location">
                        <a href="job-details-v2.html">USA, California</a>
                      </div>
                      <a
                        href="job-details-v2.html"
                        className="apply-btn text-center tran3s"
                      >
                        APPLY
                      </a>
                    </div>
                  </div>{" "}
                  {/* /.job-list-two */}
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div className="job-list-two style-two position-relative">
                    <a href="job-details-v2.html" className="logo">
                      <img
                        src="images/logo/media_23.png"
                        alt=""
                        className="m-auto"
                      />
                    </a>
                    <a
                      href="job-details-v2.html"
                      className="save-btn text-center rounded-circle tran3s"
                      title="Save Job"
                    >
                      <i className="bi bi-bookmark-dash" />
                    </a>
                    <div>
                      <a
                        href="job-details-v2.html"
                        className="job-duration fw-500 part-time"
                      >
                        Part-time
                      </a>
                    </div>
                    <div>
                      <a
                        href="job-details-v2.html"
                        className="title fw-500 tran3s"
                      >
                        Developer &amp; expert in c++ &amp; java.
                      </a>
                    </div>
                    <div className="job-salary">
                      <span className="fw-500 text-dark">$10-$15</span> / Hour
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-auto">
                      <div className="job-location">
                        <a href="job-details-v2.html">USA, Alaska</a>
                      </div>
                      <a
                        href="job-details-v2.html"
                        className="apply-btn text-center tran3s"
                      >
                        APPLY
                      </a>
                    </div>
                  </div>{" "}
                  {/* /.job-list-two */}
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div className="job-list-two style-two position-relative">
                    <a href="job-details-v2.html" className="logo">
                      <img
                        src="images/logo/media_24.png"
                        alt=""
                        className="m-auto"
                      />
                    </a>
                    <a
                      href="job-details-v2.html"
                      className="save-btn text-center rounded-circle tran3s"
                      title="Save Job"
                    >
                      <i className="bi bi-bookmark-dash" />
                    </a>
                    <div>
                      <a
                        href="job-details-v2.html"
                        className="job-duration fw-500 part-time"
                      >
                        Part-time
                      </a>
                    </div>
                    <div>
                      <a
                        href="job-details-v2.html"
                        className="title fw-500 tran3s"
                      >
                        Marketing specialist in SEO &amp; Affiliate.{" "}
                      </a>
                    </div>
                    <div className="job-salary">
                      <span className="fw-500 text-dark">$40k</span> / Yearly
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-auto">
                      <div className="job-location">
                        <a href="job-details-v2.html">AUS, Sydney</a>
                      </div>
                      <a
                        href="job-details-v2.html"
                        className="apply-btn text-center tran3s"
                      >
                        APPLY
                      </a>
                    </div>
                  </div>{" "}
                  {/* /.job-list-two */}
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div className="job-list-two style-two position-relative">
                    <a href="job-details-v2.html" className="logo">
                      <img
                        src="images/logo/media_25.png"
                        alt=""
                        className="m-auto"
                      />
                    </a>
                    <a
                      href="job-details-v2.html"
                      className="save-btn text-center rounded-circle tran3s"
                      title="Save Job"
                    >
                      <i className="bi bi-bookmark-dash" />
                    </a>
                    <div>
                      <a
                        href="job-details-v2.html"
                        className="job-duration fw-500"
                      >
                        Fulltime
                      </a>
                    </div>
                    <div>
                      <a
                        href="job-details-v2.html"
                        className="title fw-500 tran3s"
                      >
                        Lead &amp; Product &amp; Web Designer.
                      </a>
                    </div>
                    <div className="job-salary">
                      <span className="fw-500 text-dark">$2k-3k</span> / Month
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-auto">
                      <div className="job-location">
                        <a href="job-details-v2.html">UAE, Dubai</a>
                      </div>
                      <a
                        href="job-details-v2.html"
                        className="apply-btn text-center tran3s"
                      >
                        APPLY
                      </a>
                    </div>
                  </div>{" "}
                  {/* /.job-list-two */}
                </div>
              </SwiperSlide>
            </Swiper>
            <ul className="slider-arrows slick-arrow-one color-two d-flex justify-content-center style-none sm-mt-20">
              <li className="prev_e slick-arrow">
                <i className="bi bi-arrow-left" />
              </li>
              <li className="next_e slick-arrow">
                <i className="bi bi-arrow-right" />
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/*
		=====================================================
			Job Portal Intro
		=====================================================
		*/}
      <section className="job-portal-intro">
        <div className="container">
          <div className="wrapper bottom-border pt-65 md-pt-50 pb-65 md-pb-50">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="text-center text-lg-start">
                  <h2>Most complete job portal.</h2>
                  <p className="text-md m0 md-pb-20">
                    Signup and start find your job or talents.
                  </p>
                </div>
              </div>
              <div className="col-lg-5">
                <ul className="btn-group style-none d-flex flex-wrap justify-content-center justify-content-lg-end">
                  <li className="me-2">
                    <NavLink to={APP_ROUTES.SeekerLogin} className="btn-three">
                      Looking for job?
                    </NavLink>
                  </li>
                  <li className="ms-2">
                    <NavLink
                      to={APP_ROUTES.RecruiterRegister}
                      className="btn-four"
                    >
                      Post a job
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /.job-portal-intro */}
    </>
  );
};

export default Index;
