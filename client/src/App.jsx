import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
// import { ScrollRestoration } from "react-router-dom";

// Site: Layout
import Layout from './scenes/site/Layout';

// Site: Pages
import Home from './scenes/site/Home';
import AboutUs from './scenes/site/About';
import ContactUs from './scenes/site/Contact';
import ReportIssue from './scenes/site/Feedback';
import FAQ from './scenes/site/FAQ';
import PrivacyPolicy from './scenes/site/PrivacyPolicy';
import TermsConditions from './scenes/site/TermsConditions';
import FraudAlert from './scenes/site/FraudAlert';
import JobPostProfile from './scenes/site/Post';
import JobPostSearchResult from './scenes/site/JobPostSearchResult';
import CandidateProfile from './scenes/recruiter/Candidate';
import NotFound from './scenes/site/NotFound';

// Seeker: Pages
import Register from './scenes/seeker/Register';
import SeekerLogin from './scenes/seeker/Login';
import SeekerForgotPassword from './scenes/seeker/ForgotPassword';
import SeekerResetPassword from './scenes/seeker/ResetPassword';

// Seeker: Layout
import SeekerLayout from './scenes/seeker/Layout';
import SeekerDashboard from './scenes/seeker/Dashboard';
import SeekerProfile from './scenes/seeker/Profile';
import SeekerUploadResume from './scenes/seeker/UploadResume';
import SeekerJobAlerts from './scenes/seeker/JobAlerts';
import SeekerAppliedJobs from './scenes/seeker/AppliedJobs';
import SeekerAccountSettings from './scenes/seeker/Account';

// Recruiter: Pages
import RecruiterLogin from './scenes/recruiter/Login';
import RecruiterRegister from './scenes/recruiter/Register';

// Recruiter: Layout
import RecruiterLayout from './scenes/recruiter/Layout';
import RecruiterDashboard from './scenes/recruiter/Dashboard';
import RecruiterProfile from './scenes/recruiter/Profile';
import RecruiterMyJobs from './scenes/recruiter/MyJobs';
import RecruiterSubmitJob from './scenes/recruiter/SubmitJob';
import RecruiterEditJob from './scenes/recruiter/EditJob';
import RecruiterSavedCandidates from './scenes/recruiter/SavedCandidates';
import RecruiterJobApplications from './scenes/recruiter/JobApplications';
import RecruiterAccount from './scenes/recruiter/Account';
import ScrollToTop from './scrollToTop';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="feedback" element={<ReportIssue />} />
        <Route path="privacypolicy" element={<PrivacyPolicy />} />
        <Route path="termsconditions" element={<TermsConditions />} />
        <Route path="report-fake-job-recruiter" element={<FraudAlert />} />
        <Route path="job/:jobSlug" element={<JobPostProfile />} />
        <Route path="job-search/:jobSearchSlug" element={<JobPostSearchResult />} />
        <Route path="candidate-listing/:candidateId" element={<CandidateProfile />} />
        <Route path="register/createAccount" element={<Register />} />
        <Route path="rpLogin" element={<SeekerLogin />} />
        <Route path="rpLogin/forgotPassword" element={<SeekerForgotPassword />} />
        <Route path="rpLogin/resetPassword" element={<SeekerResetPassword />} />
        <Route path="rpRecruit/login" element={<RecruiterLogin />} />
        <Route path="rpRecruit/register" element={<RecruiterRegister />} />
      </Route>
      
      <Route path="/" element={<SeekerLayout />}>
        <Route path="mnjSeeker/dashboard" element={<SeekerDashboard />} />
        <Route path="mnjSeeker/profile" element={<SeekerProfile />} />
        <Route path="mnjSeeker/uploadResume" element={<SeekerUploadResume />} />
        <Route path="mnjSeeker/jobAlerts" element={<SeekerJobAlerts />} />
        <Route path="mnjSeeker/appliedJobs" element={<SeekerAppliedJobs />} />
        <Route path="mnjSeeker/account" element={<SeekerAccountSettings />} />
      </Route>
      
      <Route path="/" element={<RecruiterLayout />}>
        <Route path="recruit/dashboard/homepage" element={<RecruiterDashboard />} />
        <Route path="recruit/dashboard/profile" element={<RecruiterProfile />} />
        <Route path="recruit/dashboard/jobs" element={<RecruiterMyJobs />} />
        <Route path="recruit/dashboard/createJob" element={<RecruiterSubmitJob />} />
        <Route path="recruit/dashboard/editJob" element={<RecruiterEditJob />} />
        <Route path="recruit/dashboard/savedCandidates" element={<RecruiterSavedCandidates />} />
        <Route path="recruit/dashboard/applications/:postId" element={<RecruiterJobApplications />} />
        <Route path="recruit/dashboard/account" element={<RecruiterAccount />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </>
  )
)

export default function App({routes}) {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );

}