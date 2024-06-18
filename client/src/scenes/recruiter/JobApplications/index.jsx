import React, { useEffect, useState } from "react";
import { SITE_DIR_URI } from "../../../constants/siteConstants";
import {
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import {
  useLazyRcGetAttachmentsOfJobPostQuery,
  useRcGetApplicationsOfJobPostMutation,
  useRcMarkReadOnApplicationOfJobPostMutation,
  useRcShortlistRejectApplicationOfJobPostMutation,
} from "../../../state/recruiter/post/api";
import { NavLink, useParams } from "react-router-dom";
import { formatDate, formatTime } from "../../../utils/date";
import { formatFileSize } from "../../../utils/files";
import makeDownloadFile from "../../../utils/makeDownloadFile";
// import { APP_ROUTES } from "../../../constants/routeConstant";
import { formatUnit } from "../../../utils/format";
import { truncateText } from "../../../utils/text";

const Index = () => {
  const { postId } = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const [formatCounts, setFormatCounts] = useState({
    unread: 0,
    total: 0,
  });
  const [activeEventLoading, setActiveEventLoading] = useState({
    2: false,
    3: false,
  });
  const [applicationsOfJobPost, setApplicationsOfJobPost] = useState([]);
  const [selectedMessageFormat, setSelectedMessageFormat] = useState(0);
  const [hasUnread, setHasUnread] = useState(false);

  // Mutations
  const [
    rcGetApplicationsOfJobPost,
    { isLoading: idRcGetApplicationsOfJobPostLoading },
  ] = useRcGetApplicationsOfJobPostMutation();

  const [rcGetAttachmentsOfJobPostTrigger] =
    useLazyRcGetAttachmentsOfJobPostQuery();

  const [
    rcMarkReadOnApplication,
    { isLoading: isRcMarkReadOnApplicationLoading },
  ] = useRcMarkReadOnApplicationOfJobPostMutation();

  const [
    rcShortlistRejectApplication,
    { isLoading: isRcShortlistRejectApplicationLoading },
  ] = useRcShortlistRejectApplicationOfJobPostMutation();

  const getApplicationsForJobPosts = async (filter = null) => {
    try {
      const dataToSend = {
        postId,
      };

      if (filter) {
        dataToSend.filter = filter;
      }

      const response = await rcGetApplicationsOfJobPost(dataToSend);
      if (response.data) {
        setHasUnread(
          (response.data?.unreadCount && !filter) === 0 ? false : true
        );
        setFormatCounts({
          unread: response.data.unreadCount,
          total: response.data.totalCount,
        });
        setApplicationsOfJobPost(response.data.applications);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApplicationsForJobPosts();
  }, []);

  // useEffect(() => {
  //   if (applicationsOfJobPost[activeTab]?.unread) {
  //     handleOnReadMessage(activeTab);
  //   }
  // }, [applicationsOfJobPost]);

  const handleSelectedMessageFormat = (format) => {
    if (format === selectedMessageFormat) {
      return;
    }
    setSelectedMessageFormat(format);
    switch (format) {
      case 0: // All applications
        getApplicationsForJobPosts();
        break;
      case 1: // Unread applications
        getApplicationsForJobPosts({ unread: true });
        break;
      default:
        break;
    }
  };

  // Handle on read message
  const handleOnReadMessage = async (tabIndex) => {
    try {
      setActiveTab(tabIndex);

      if (applicationsOfJobPost[tabIndex - 1].unread) {
        const applicationId = applicationsOfJobPost[tabIndex - 1].applicationId;

        const response = await rcMarkReadOnApplication(applicationId).unwrap();

        if (response.data) {
          getApplicationsForJobPosts();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle download attachment
  const handleDownloadAttachments = async (applicationId) => {
    try {
      const response = await rcGetAttachmentsOfJobPostTrigger(
        applicationId
      ).unwrap();

      const { data: { attachments } = {} } = response;

      // Use response data to generate download link and trigger it
      if (attachments) {
        attachments.forEach((attachment) => {
          const relativePath = attachment.uploadPath;
          const fileName = attachment.uploadName;

          // Trigger download
          makeDownloadFile(relativePath, fileName);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle download attachment
  const handleAcceptRejectRequest = async (applicationId, statusId) => {
    try {

      setActiveEventLoading({
        ...activeEventLoading,
        [statusId]: true
      });

      const response = await rcShortlistRejectApplication({
        applicationId,
        data: {
          status: statusId,
        },
      });

      if (response.data) {
        getApplicationsForJobPosts();

        setActiveEventLoading({
          ...activeEventLoading,
          [statusId]: false
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // On page load
  // list all applications labels in left side ( in descending order of date ),
  // view details in right side by default
  // sent unread to false for application ( can do something like to create queue which do this )

  // On change tab view correspond data and sent unread to false

  return (
    <div className="position-relative">
      <h2 className="main-title m0">Job Post Applications</h2>
      {applicationsOfJobPost?.length > 0 ? (
        <div className="bg-white card-box border-20 p0 mt-30">
          <Tabs
            className="message-wrapper"
            onChange={(index) => handleOnReadMessage(index)}
          >
            <div className="row gx-0">
              <div className="col-lg-4">
                <div className="message-sidebar pt-20">
                  <div className="ps-3 pe-3 ps-xxl-4 pe-xxl-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="page-title fw-500">Inbox</div>
                    </div>
                    <div
                      className="message_filter d-flex align-items-center gap-4 mt-20 mb-20"
                      id="module_btns"
                    >
                      <button
                        className={`filter_btn ${
                          selectedMessageFormat === 0 && "active"
                        }`}
                        onClick={() => handleSelectedMessageFormat(0)}
                      >
                        All ({formatCounts.total})
                      </button>
                      {hasUnread && (
                        <button
                          className={`filter_btn ${
                            selectedMessageFormat === 1 && "active"
                          }`}
                          onClick={() => handleSelectedMessageFormat(1)}
                        >
                          <span style={{ background: "#3BDA84" }} /> Unread (
                          {formatCounts.unread})
                        </button>
                      )}
                    </div>
                  </div>
                  <TabList className="email-read-panel d-block border-0">
                    <Tab hidden />
                    {applicationsOfJobPost.map((application, index) => (
                      <Tab
                        key={application.seeker?.userId}
                        className={`w-100 d-block email-list-item ps-3 pe-3 ps-xxl-4 pe-xxl-4 border-bottom-0 border-end-0 text-start shadow-0 ${application.unread ? 'primary' : ''} ${
                          index + 1 === activeTab ? "selected" : ""
                        }`}
                      >
                        <div className="email-short-preview position-relative">
                          <div className="d-flex flex-column align-items-start justify-content-between">
                            <div className="d-flex align-items-center justify-content-between w-100">
                              <div className="sender-name">
                                {truncateText(application.seeker?.name, 24)}
                              </div>
                              <div className="date">
                                {formatDate(application.applicationDate, "d/m/Y")}
                              </div>
                            </div>
                            <div className="text-secondary">{truncateText(application.seeker?.email, 30)}</div>
                          </div>
                          <div className="mail-text">
                            {application.seeker?.bio}
                          </div>
                        </div>
                      </Tab>
                    ))}
                  </TabList>
                </div>
              </div>
              <div className="col-lg-8">
                <TabPanels>
                  <TabPanel>
                    <div className="d-flex align-items-center justify-content-center flex-column p-5">
                      <img src={`${SITE_DIR_URI}images/assets/chat-cuate.png`} width={280} alt="preview pings" />
                      <div className="fw-500 mt-3 fs-5">Click or Tap on pings to view application</div>
                    </div>
                  </TabPanel>
                  {applicationsOfJobPost.map((application, index) => (
                    <TabPanel key={application.seeker?.userId}>
                      <div className="open-email-container pb-40">
                        <div className="email-header d-flex justify-content-between ps-4 pe-4 ps-xxl-5 pe-xxl-5 pb-0">
                          <div className="sender-info d-flex align-items-center">
                            <Avatar
                              size="md"
                              src={application.seeker?.profilePhoto?.uploadPath}
                            />
                            <div className="ps-3">
                              <div className="sender-name">
                                <NavLink to={application.seeker?.staticUrl}>
                                  {application.seeker?.name}
                                </NavLink>
                              </div>
                              <div className="sender-email">
                                {application.seeker?.email}
                              </div>
                            </div>
                          </div>
                          <div className="email-info">
                            <div className="time">
                              {formatTime(
                                application.applicationDate.split(" ")[1],
                                "H:i"
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="email-header d-flex justify-content-between ps-4 pe-4 ps-xxl-5 pe-xxl-5 pb-0">
                          <div className="d-flex align-items-center">
                            <span className="d-flex align-items-center gap-2">
                              <img
                                src={`${SITE_DIR_URI}images/icon/icon_54.svg`}
                                width={16}
                                height={16}
                                alt=""
                              />
                              {application.seeker?.location?.length > 0
                                ? `${application.seeker?.location[0].city}, ${application.seeker?.location[0].pincode}`
                                : "Not mentioned"}
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="d-flex align-items-center gap-2">
                              <img
                                src={`${SITE_DIR_URI}images/icon/icon_26.svg`}
                                width={20}
                                height={20}
                                alt=""
                              />
                              {application.seeker?.experience
                                ? `${formatUnit(
                                    application.seeker?.experience.year,
                                    "Year"
                                  )} ${formatUnit(
                                    application.seeker?.experience.month,
                                    "Month"
                                  )}`
                                : "Not mentioned"}
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="d-flex align-items-center gap-2">
                              <img
                                src={`${SITE_DIR_URI}images/icon/icon_69.svg`}
                                width={20}
                                height={20}
                                alt=""
                              />
                              {application.seeker?.noticePeriod
                                ? application.seeker?.noticePeriod
                                : "Not mentioned"}
                            </span>
                          </div>
                        </div>
                        <div className="email-header divider d-flex gap-4 ps-4 pe-4 ps-xxl-5 pe-xxl-50">
                          {application.applicationStatus === 1 && (
                            <>
                              <button
                                className="btn-one d-flex align-items-center justify-content-center"
                                style={{ minWidth: 100 }}
                                onClick={() =>
                                  handleAcceptRejectRequest(
                                    application.applicationId,
                                    3
                                  )
                                }
                                disabled={isRcShortlistRejectApplicationLoading}
                              >
                                {(activeEventLoading[3]) ? <Spinner /> : 'Rejected'}
                              </button>
                              <button
                                className="btn-five d-flex align-items-center justify-content-center"
                                style={{ minWidth: 100 }}
                                onClick={() =>
                                  handleAcceptRejectRequest(
                                    application.applicationId,
                                    2
                                  )
                                }
                                disabled={isRcShortlistRejectApplicationLoading}
                              >
                                {(activeEventLoading[2]) ? <Spinner /> : 'Shortlist'}
                              </button>
                            </>
                          )}
                          {application.applicationStatus === 2 && (
                            <p className="text-primary fw-500">
                              *You have shortlisted this candidate
                            </p>
                          )}
                          {application.applicationStatus === 3 && (
                            <p className="text-danger fw-500">
                              *You have rejected this candidate
                            </p>
                          )}
                        </div>
                        <div className="email-body divider">
                          <div className="ps-4 pe-4 ps-xxl-5 pe-xxl-5">
                            {application.seeker?.bio && (
                              <>
                                <h4>Bio</h4>
                                <p>{application.seeker?.bio}</p>
                              </>
                            )}
                            {application.seeker?.overview && (
                              <>
                                {" "}
                                <h4>Overview</h4>
                                <p>{application.seeker?.overview}</p>
                              </>
                            )}
                            {application.seeker?.skills?.length > 0 && (
                              <>
                                <h4>Skills</h4>
                                <div className="job-company-info p-0 bg-transparent">
                                  <div className="job-tags d-flex flex-wrap">
                                    {application.seeker?.skills
                                      .split(",")
                                      .map((skill) => (
                                        <span key={skill}>{skill}</span>
                                      ))}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        {application.seeker?.cvInfo && (
                          <div className="email-footer">
                            <div className="ps-4 pe-4 ps-xxl-5 pe-xxl-5">
                              <div className="attachments">
                                <div className="d-flex justify-content-between mb-5">
                                  <h6 className="m0">Attachment</h6>
                                  <span
                                    className="all-download"
                                    onClick={() =>
                                      handleDownloadAttachments(
                                        application.applicationId
                                      )
                                    }
                                  >
                                    Download All
                                  </span>
                                </div>
                                <div className="d-flex">
                                  <div className="file tran3s d-flex align-items-center mt-10">
                                    <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                                      <img
                                        src={`${SITE_DIR_URI}images/icon/icon_31.svg`}
                                        alt=""
                                        className="lazy-img"
                                      />
                                    </div>
                                    <div className="ps-2">
                                      <div className="file-name">
                                        {application.seeker?.cvInfo.uploadName}
                                      </div>
                                      <div className="file-size">
                                        {formatFileSize(
                                          application.seeker?.cvInfo.fileSize *
                                            1000000
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabPanel>
                  ))}
                </TabPanels>
              </div>
            </div>
          </Tabs>
        </div>
      ) : (
        <div className="alert alert-warning border-danger mt-4">
          <span colSpan="5" className="text-center p-0 pt-3">
            No applications found on this job post
          </span>
        </div>
      )}
    </div>
  );
};

export default Index;
