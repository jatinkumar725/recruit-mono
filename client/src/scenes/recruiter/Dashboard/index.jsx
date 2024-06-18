import React, { useEffect, useState } from "react";
import { SITE_DIR_URI } from "./../../../constants/siteConstants";
import DashCard from "./../../../components/Dashboard/DashCard";
import { useRcGetDashboardQuery } from "../../../state/recruiter/profile/api";

const Index = () => {
  const { data: dashboardData, refetch: refetchDashboardData } = useRcGetDashboardQuery();

  // Define the initial dashCardData with static values
  const initialDashCardData = [
    {
      key: "totalSavedSeekers",
      title: "Saved Candidates",
      value: "0",
      imageLink: `${SITE_DIR_URI}images/dashicons/icon_13.svg`
    },
    {
      key: "totalShortlistedApplications",
      title: "Shortlisted Candidates",
      value: "0",
      imageLink: `${SITE_DIR_URI}images/dashicons/icon_12.svg`
    },
    {
      key: "totalJobPosts",
      title: "Job Posts",
      value: "0",
      imageLink: `${SITE_DIR_URI}images/dashicons/icon_15.svg`,
    }
  ];

  // State to hold the updated dashCardData with API values
  const [updatedDashCardData, setUpdatedDashCardData] = useState(initialDashCardData);

  // Effect to update dashCardData when dashboardData changes
  useEffect(() => {
    if (dashboardData) {
      const updatedData = initialDashCardData.map(item => {
        const valueFromAPI = dashboardData[item.key];
        if (valueFromAPI !== undefined) {
          return { ...item, value: valueFromAPI.toString() };
        } else {
          return item; // Keep the original item if API data is not available
        }
      });
      setUpdatedDashCardData(updatedData);
    }
  }, [dashboardData]); // Trigger effect on changes to dashboardData

  return (
    <>
      <h2 className="main-title">Dashboard</h2>
      <div className="row gy-4">
        {updatedDashCardData.map(item => (
          <DashCard 
            key={item.key}
            {...item}
          />
        ))}
      </div>
    </>
  );
};

export default Index;