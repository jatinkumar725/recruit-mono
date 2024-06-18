import React from "react";
import InnerBanner from "../../../components/InnerBanner";

const Index = () => {
  return (
    <>
      <InnerBanner heading="Report fake job recruiter" />

      <div className="container pt-60 mb-30">
        <p>
          At batterjobs.com, we take fraudulent activities seriously. It's
          important to be aware of potential scams targeting job seekers. Here
          are some tips to protect yourself:
        </p>

        <ul>
          <li>Be cautious of job offers that seem too good to be true.</li>
          <li>
            Avoid providing personal information like your social security
            number or financial details before verifying the legitimacy of the
            employer.
          </li>
          <li>Research the company and the job opportunity thoroughly.</li>
          <li>Never pay money upfront for a job or to secure an interview.</li>
          <li>
            Watch out for job postings with generic email addresses (e.g.,
            Gmail, Yahoo) instead of official company domains.
          </li>
          <li>
            Report any suspicious activity or job postings to our support team
            immediately.
          </li>
        </ul>

        <p>
          If you suspect that you have encountered a fraudulent job posting or
          activity on batterjobs.com, please{" "}
          <a href="mailto:support@batterjobs.com">contact us</a> immediately.
        </p>

        <p>
          For more information on how to protect yourself from job scams, you
          can also refer to resources provided by organizations like the{" "}
          <a href="https://www.consumer.ftc.gov/articles/0243-job-scams">
            Federal Trade Commission (FTC)
          </a>
          .
        </p>

        <p>
          Thank you for using batterjobs.com. Your safety and security are our
          top priorities.
        </p>
      </div>
    </>
  );
};

export default Index;
