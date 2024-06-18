import React, { useEffect, useState } from "react";
import { GENDER_TYPES, SITE_DIR_URI } from "../../../constants/siteConstants";
import { useOutletContext, useParams } from "react-router-dom";
import { Avatar, Button, Image, Link } from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

// import Swiper core and required modules
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { formatDate } from "../../../utils/date";
import {
  useLazyRcGetSeekerProfileQuery,
  useLazyRcGetSeekerResumeQuery,
} from "../../../state/recruiter/user/api";
import makeDownloadFile from "../../../utils/makeDownloadFile";
import { useRcSaveSeekerMutation } from "../../../state/recruiter/savedSeeker/api";
// import { setCredentials } from "../../../state/recruiter/authentication/slice";
// import { useDispatch } from "react-redux";

const Index = () => {
  // const dispatch = useDispatch();

  const [isPageLoading, setIsPageLoading] = useOutletContext();

  // Get candidate post details
  const { candidateId } = useParams();

  // Extract slug and postId from pathname
  const slugArray = candidateId.split("-");
  const seekerId = slugArray.pop();

  const [seekerProfile, setSeekerProfile] = useState({});
  const [seekerSkillsArray, setSeekerSkillsArray] = useState([]);

  // Mutations
  const [triggerRcGetSeekerProfile] = useLazyRcGetSeekerProfileQuery(seekerId);
  const [triggerGetSeekerResume] = useLazyRcGetSeekerResumeQuery();
  const [rcSaveSeeker, { isLoading: isRcSaveSeekerLoading }] =
    useRcSaveSeekerMutation();

  const getSeekerProfile = async () => {
    try {
      const response = await triggerRcGetSeekerProfile(seekerId);

      if (response.data) {
        const { skills, ...restData } = response.data;

        setSeekerProfile(response.data);

        // Re-build skills
        const skillsArray = skills.split(",");
        setSeekerSkillsArray(skillsArray);

        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (seekerId) {
      getSeekerProfile();
    }
  }, []);

  const handleDownloadCVResume = async () => {
    try {
      const response = await triggerGetSeekerResume(
        seekerProfile.profileId
      ).unwrap();

      // Use response data to generate download link and trigger it
      if (response) {
        const relativePath = response.uploadPath;
        const fileName = response.uploadName;

        // Trigger download
        makeDownloadFile(relativePath, fileName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveSeeker = async () => {
    try {
      
      setIsPageLoading(true);

      const response = await rcSaveSeeker({
        id: seekerProfile.profileId,
      });
      
      if (response?.data?.savedSeeker) {
        // dispatch(setCredentials(response.data.profile));
        await getSeekerProfile().then(response => response && setIsPageLoading(false));
      }
      
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <div className="inner-banner-one position-relative">
        <div className="container">
          <div className="candidate-profile-card list-layout">
            <div className="d-flex align-items-start align-items-xl-center">
              <div className="cadidate-avatar position-relative d-block me-auto ms-auto">
                <Avatar
                  width="80px"
                  height="80px"
                  src={seekerProfile?.profilePhoto?.uploadPath}
                />
              </div>
              <div className="right-side">
                <div className="row gx-1 align-items-center">
                  <div className="col-xl-2 order-xl-0">
                    <div className="position-relative">
                      <h4 className="candidate-name text-white mb-0">
                        {seekerProfile?.name}
                      </h4>
                      <div className="candidate-post">
                        {seekerProfile?.designation}
                      </div>
                    </div>
                  </div>
                  {seekerProfile?.location?.length > 0 && (
                    <div className="col-xl-2 col-md-4 order-xl-1">
                      <div className="candidate-info">
                        <span>Location</span>
                        <div>
                          {seekerProfile?.location[0].city},{" "}
                          {seekerProfile?.location[0].pincode}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-xl-2 col-md-4 order-xl-2">
                    <div className="candidate-info">
                      <span>Salary</span>
                      <div>
                        ₹
                        {seekerProfile.currentSalary
                          ? seekerProfile.currentSalary
                          : "Not mentioned"}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-md-4 order-xl-3">
                    <div className="candidate-info">
                      <span>Notice Period</span>
                      <div>
                        {seekerProfile.noticePeriod
                          ? seekerProfile.noticePeriod
                          : "Not mentioned"}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-1 col-md-4 order-xl-3">
                    <div className="candidate-info">
                      <span className="text-nowrap">Experience</span>
                      <div>3 Years</div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-4 order-xl-4">
                    <div className="d-flex justify-content-md-end">
                      <Button
                        className="save-btn text-center rounded-circle tran3s"
                        // isLoading={isRcSaveSeekerLoading}
                        onClick={handleSaveSeeker}
                        isDisabled={seekerProfile.isSaved}
                      >
                        <i
                          className={`bi bi-${
                            !seekerProfile.isSaved
                              ? "bookmark-plus"
                              : "bookmark-check"
                          }`}
                        />
                      </Button>
                      {seekerProfile?.cvInfo?.uploadPath && (
                        <Button
                          fontWeight={500}
                          bgColor="transparent"
                          className="cv-download-btn fw-500 tran3s ms-md-3 sm-mt-20"
                          onClick={handleDownloadCVResume}
                        >
                          Download CV
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src={`${SITE_DIR_URI}images/shape/shape_02.svg`}
          alt=""
          className="lazy-img shapes shape_01"
        />
        <img
          src={`${SITE_DIR_URI}images/shape/shape_03.svg`}
          alt=""
          className="lazy-img shapes shape_02"
        />
      </div>
      <section className="candidates-profile bg-color pt-100 lg-pt-70 pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xxl-9 col-lg-8">
              <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
                {seekerProfile?.headline && (
                  <div className="inner-card mb-65 lg-mb-40">
                    <h3 className="title">Bio</h3>
                    <p>{seekerProfile?.headline}</p>
                  </div>
                )}
                {seekerProfile?.overview && (
                  <div className="inner-card mb-65 lg-mb-40">
                    <h3 className="title">Overview</h3>
                    <p>{seekerProfile?.overview}</p>
                  </div>
                )}
                {seekerProfile?.education?.length > 0 && (
                  <div className="inner-card mb-75 lg-mb-50">
                    <h3 className="title">Education</h3>
                    {seekerProfile?.education.map((education, index) => (
                      <div
                        key={education.educationId}
                        className="time-line-data position-relative pt-15 mb-30"
                      >
                        <div className="info position-relative">
                          <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
                            {index + 1}
                          </div>
                          <div className="text_1 fw-500">
                            {education?.institute || education?.examBoard}
                          </div>
                          <h4>
                            {education?.specialisation ||
                              education?.educationType}
                          </h4>
                          <div className="text_1 fw-500">
                            {education.startYear} - {education.endYear}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {seekerSkillsArray.length > 0 && (
                  <div className="inner-card mb-75 lg-mb-50">
                    <h3 className="title">Skills</h3>
                    <ul className="style-none skill-tags d-flex flex-wrap pb-25">
                      {seekerSkillsArray.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {seekerProfile?.employment?.length > 0 && (
                  <div className="inner-card mb-60 lg-mb-50">
                    <h3 className="title">Work Experience</h3>
                    {seekerProfile?.employment.map((employment, index) => (
                      <div key={employment.employmentId} className="time-line-data position-relative pt-15">
                        <div className="info position-relative">
                          <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
                            {index + 1}
                          </div>
                          <h4>{employment?.designaiton}</h4>
                          <div className="text_1 fw-500">
                            {formatDate(employment.startDate, "M Y")} -{" "}
                            {employment.isYourCurrentCompany
                              ? "Present"
                              : formatDate(employment.endDate, "M Y")}
                          </div>
                          <h4 className="mb-0">{`${employment.designation} (${employment.company})`}</h4>
                          {employment?.description && (
                            <p>{employment.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {seekerProfile?.onlineProfiles?.length > 0 &&
                  seekerProfile?.onlineProfiles.map((onlineProfile, index) => (
                    <div
                      key={onlineProfile.ogId}
                      className="inner-card mb-60 lg-mb-50"
                    >
                      <h3 className="title">Online Profile</h3>
                      <div className="time-line-data position-relative pt-15">
                        <div className="info position-relative">
                          <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
                            {index + 1}
                          </div>
                          <h4>{onlineProfile?.name}</h4>
                          <Link
                            href={onlineProfile.url}
                            isExternal
                            color="ActiveCaption"
                            className="d-inline-flex align-items-center text_1 fw-500"
                          >
                            {onlineProfile.url}
                            {""}
                            <ExternalLinkIcon mx="2px" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                {seekerProfile?.projects?.length > 0 && (
                  <div className="inner-card">
                    <h3 className="title">Portfolio</h3>
                    <div className="candidate-portfolio-slider slick-initialized slick-slider slick-dotted">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        breakpoints={{
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                          },
                          1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                          },
                        }}
                        autoplay={{
                          delay: 3500,
                          disableOnInteraction: false,
                        }}
                        loop={seekerProfile?.projects && seekerProfile?.projects.length >= 4}
                        pagination={{
                          clickable: true,
                          el: ".slick-dots",
                        }}
                        modules={[Pagination]}
                        className="slick-list draggable"
                      >
                        {seekerProfile?.projects.map((project) => (
                          <SwiperSlide
                            key={project.projectId}
                            className="item"
                            data-slick-index={-3}
                            aria-hidden="true"
                            style={{ width: 208 }}
                            tabIndex={-1}
                          >
                            <a
                              href={project.url}
                              className="w-100 d-blok"
                              tabIndex={-1}
                              target="_blank"
                            >
                              <Image
                                src={project.imageURL}
                                fallbackSrc={`${SITE_DIR_URI}images/candidates/CP_02.jpg`}
                                className="w-100"
                              />
                            </a>
                            <div className="text_1 fw-500 d-flex align-items-center justify-content-center">
                              {project.name}
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <ul className="slick-dots" role="tablist"></ul>
                    </div>
                  </div>
                )}
                {/* /.inner-card */}
              </div>
              {/* /.candidates-profile-details */}
            </div>
            <div className="col-xxl-3 col-lg-4">
              <div className="cadidate-profile-sidebar ms-xl-5 ms-xxl-0 md-mt-60">
                <div className="cadidate-bio bg-wrapper mb-60 md-mb-40">
                  <ul className="style-none">
                    <li className="border-0">
                      <span>Maritial Status: </span>
                      <div>
                        {seekerProfile?.maritalStatus
                          ? seekerProfile?.maritalStatus
                          : "Not mentioned"}
                      </div>
                    </li>
                    <li>
                      <span>Email: </span>
                      <div>
                        <a href={`mailto:${seekerProfile.email}`}>
                          {seekerProfile.email}
                        </a>
                      </div>
                    </li>
                    <li>
                      <span>Religion: </span>
                      <div>
                        {seekerProfile?.gender
                          ? seekerProfile?.religion
                          : "Not mentioned"}
                      </div>
                    </li>
                    <li>
                      <span>Gender: </span>
                      <div>
                        {seekerProfile?.gender
                          ? GENDER_TYPES[seekerProfile?.gender]
                          : "Not mentioned"}
                      </div>
                    </li>
                    <li>
                      <span>Expected Salary: </span>
                      <div>
                        {seekerProfile?.expectedCtc
                          ? `₹ ${seekerProfile?.expectedCtc}`
                          : "Not mentioned"}
                      </div>
                    </li>
                  </ul>
                  {seekerProfile?.cvInfo?.uploadPath && (
                    <Button
                      className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15"
                      bgColor="#31795a"
                      fontWeight={500}
                      onClick={handleDownloadCVResume}
                      _hover={{
                        background: "#00BF58",
                      }}
                    >
                      Download CV
                    </Button>
                  )}
                </div>
                {/* /.cadidate-bio */}
              </div>
              {/* /.cadidate-profile-sidebar */}
            </div>
          </div>
          {/* /.row */}
        </div>
      </section>
    </>
  );
};

export default Index;
