# Recruiter Delete/Deactivate

1. If recruiter is delete then job posts of the recruiter will delete or not?
- If not delete and marked isDeleted true, then we have can use it in our admin analytics to analyze:
a. Which role or position is performing well and demanding in market
b. Whats market value of role
c. Top hiring companies
d. Qualification analysis for the role
e. Experience and Responsibilities relation - means how much experience person would people recommending for the set of responsibilities.

- If delete the post data:
a. Only storage will impact
b. Orphan data will be taking space
c. Data searching, filtering make little bit overhead.

2. How recruiters will be verify after email and mobile? - 4 docs -> pan, company details, etc. ( manual )
- How do we know the company they are hiring for are authentic?

3. Do I allow recruiters to change their professional details after registration? - no
a. If no - then if recruiter what to change hiring to other company he/she needs to create a new account.
- In future, if we shift recruiter accounts to subscription model then it may be very challenging for users to use the application, as they need to pay for every new account 

b. If yes, then do I re-verify them with kyc process? If yes, then should there any restrictions that would apply till kyc like stop job posting, shift account to hold, etc.  

4. Can muliple recruiters create account for one company ? - no
- If yes, then they can post jobs under the same company and on company, jobs were list from each all recruiter accounts of the company
- If yes, how can verify that acount created by recruiter on befalf of a company is authorized person. Because, there are uncertain chances anyone can create account for xyz company and post jobs under it. Which may cause data redundancy and inconsistency.

5. If I preview user details in applications list, then on delete account by seeker will applicant remove from post - I think it's correct

If no - then I need to add extra fields in applied post to store applicant details and then preview them - It will helps to keep history of applicants

6. If post is delete or recruiter is delete do I need to remove applied history from all seekers ?
If no - then How can I display post details to applied the seeker, because the data is dependent on populate postMId 


{
    "loggedIn": false,
    "brandedJd": false,
    "jobDetails": {
        "videoProfilePreferred": false,
        "savedJobFlag": 0,
        "education": {
            "ug": [
                "B.Tech/B.E. in Electronics/Telecommunication, Electrical and Electronics, Instrumentation, Information Technology, Computers"
            ],
            "degreeCombination": "",
            "premiumProcessed": false,
            "pg": [],
            "ppg": [],
            "label": "",
            "isSchool": null
        },
        "hideApplyButton": false,
        "applyCount": 3000,
        "groupId": 67040,
        "roleCategory": "Software Development",
        "mode": "jp",
        "tagLabels": [],
        "jobRole": "Full Stack Developer",
        "isTopGroup": 0,
        "clientLogo": "https://www.naukri.com/hotjobs/images/v3/prowess.gif",
        "wfhType": "3",
        "companyDetail": {
            "name": "Prowess India Consulting Services",
            "details": "<p>A pioneering generative AI company experiencing rapid growth and pushing the boundaries of technology to solve tomorrows challenges today. Its cutting-edge solutions impact various industries, making processes smarter and more efficient. As it continue to scale, it is seeking ambitious B.Tech/B.E Computer Science graduates passionate about technology and eager to learn & grow.</p>",
            "address": "",
            "media": {
                "ppt": [],
                "video": [],
                "photos": []
            },
            "hiringFor": "",
            "clientType": ""
        },
        "jobIconType": "",
        "shortDescription": "As it continue to scale,it is seeking ambitious BTech / BE Computer Science graduates passionate about technology and eager to learn & grow| Company is looking for Full Stack Developer with 0 ( Freshers) to 3 years of relevant expertise. | Years of Experience : 0 to 3 Years",
        "consent": false,
        "segmentInfo": [],
        "jobId": "150424008105",
        "companyId": 86896,
        "brandingTags": [],
        "functionalArea": "Engineering - Software & QA",
        "fatFooter": {},
        "referenceCode": "FSD-AI",
        "vacancy": 4,
        "template": "",
        "wfhLabel": "Hybrid",
        "description": "<p><strong>Explore career opportunity with a pioneering generative AI company experiencing rapid growth and pushing the boundaries of technology to solve tomorrows challenges today</strong>. Its cutting-edge solutions impact various industries, making processes smarter and more efficient. As it continue to scale, it is seeking ambitious B.Tech/B.E Computer Science graduates passionate about technology and eager to learn & grow.</p><br /><p><strong>Company is looking for Full Stack Developer with 0 ( Freshers) to 3 years of relevant expertise. </strong></p><br /><p><strong>Designation : Full Stack Developer ( Junior)</strong></p><br /><p><strong>Work Location : Jaipur / Delhi / Bangalore</strong></p><br /><p><strong>Years of Experience : 0 to 3 Years </strong></p><br /><p><strong>Notice Period : Immediate joiners or serving notice ( 15 days remaining ) </strong></p><br /><p><strong>Education : B.Tech/B.E in CS / Related field ( including Final Year) Note : BCA/MSc/MCA need not apply</strong></p><br /><p><strong>Job Summary :</strong></p><br /><p>As a Junior Full Stack Developer you will play a crucial role in building and maintaining company's innovative AI-powered applications. This role offers a blend of front-end and back-end development opportunities, allowing you to gain comprehensive experience in full-stack technology stacks. You will collaborate closely with a team of experts to create scalable, efficient, and robust solutions.</p><p> </p><p><strong>Responsibilities:</strong></p><p>1. Participate in the entire application lifecycle, focusing on coding, debugging, and testing.</p><p>2. Collaborate with the team to ideate and develop new features for our AI products.</p><p>3. Work on both client and server-side code, ensuring high performance and responsiveness.</p><p>4. Contribute to the design and development of APIs.</p><p>5. Stay up-to-date with emerging technological trends and apply them to operations and activities.</p><p>6. Help in maintaining code quality, organization, and automatization.</p><p> </p><p><strong>Desired Skills:</strong></p><p>1. Strong grasp of fundamental programming languages such as JavaScript and Python.</p><p>2. Familiarity with front-end technologies (e.g., HTML, CSS, JavaScript, Angular, React) and back-end frameworks (e.g., Node.js, Django, Flask).</p><p>3. Understanding of database technologies (e.g., MySQL, MongoDB) and web servers (e.g., Apache, Nginx).</p><p>4. Knowledge of machine learning/AI concepts is a plus.</p><p>5. Excellent problem-solving skills and willingness to learn new technologies.</p><p>6. Strong communication and teamwork abilities.</p><p> </p><p><strong>What We Offer:</strong></p><p>1. Competitive entry-level salary and benefits.</p><p>2. The opportunity to work on groundbreaking projects in a high-growth industry.</p><p>3. A dynamic, innovative work environment with a flat hierarchy.</p><p>4. Comprehensive training and mentorship for professional and personal growth.</p><p>5. Flexible working hours and the possibility of remote work.</p><p> </p><p><strong>If you are ready to embark on a rewarding career journey in the field of cutting edge of AI technology -  Submit your application with the asked details ( mentioned below), including your resume and a brief cover letter explaining why you’re a great fit for the role .</strong> Company is an equal-opportunity employer , which celebrates diversity and is committed to creating an inclusive environment for all employees. Become part of company's mission to redefine the future with AI. We look forward to your application!</p><br /><p><strong>Share your updated CV in the word format to take this ahead.</strong></p><p>Current Company ( if employed):</p><p>Current Location :</p><p>Are you open to work in Jaipur (J) or Delhi (D) or Bangalore (B) or Anyone (A) :</p><p>Total years of experience :</p><p>Brief writeup on your suitability ( why you should be considered ) :</p><p>Key Skills you have :</p><p>Certification, if any :</p><p>Current CTC :</p><p>Expected CTC :</p><p>Notice Period ( 10-15 days preferred ) :</p><p>Reason for Change :</p>",
        "staticCompanyName": "prowess-india-consulting-services-jobs-careers-86896",
        "industry": "Emerging Technologies (AI/ML)",
        "staticUrl": "https://www.naukri.com/job-listings-full-stack-developer-0-to-3-years-ai-focused-india-prowess-india-consulting-services-jaipur-bengaluru-delhi-ncr-0-to-3-years-150424008105",
        "title": "Full Stack Developer | 0 To 3 Years | AI Focused | India",
        "walkIn": false,
        "maximumExperience": 3,
        "logStr": "--jobsearchDesk-3-F-0-1--1713328659168312-",
        "views": 4431,
        "jobType": "fulltime",
        "minimumExperience": 0,
        "employmentType": "Full Time, Permanent",
        "banner": "https://www.naukri.com/hotjobs/images/v3/prowess.gif",
        "microsite": false,
        "createdDate": "2024-04-15 22:35:43",
        "consultant": true,
        "socialBanner": "https://www.naukri.com/hotjobs/images/social/prowess.gif",
        "showRecruiterDetail": false,
        "locations": [
            {
                "localities": [],
                "label": "Jaipur",
                "url": "https://www.naukri.com/jobs-in-jaipur"
            },
            {
                "localities": [],
                "label": "Bengaluru",
                "url": "https://www.naukri.com/jobs-in-bangalore"
            },
            {
                "localities": [],
                "label": "Delhi / NCR",
                "url": "https://www.naukri.com/jobs-in-delhi-ncr"
            }
        ],
        "keySkills": {
            "other": [
                {
                    "clickable": "css",
                    "label": "CSS"
                },
                {
                    "clickable": "problem solving",
                    "label": "Problem Solving"
                },
                {
                    "clickable": "java script",
                    "label": "Javascript"
                },
                {
                    "clickable": "html",
                    "label": "HTML"
                },
                {
                    "clickable": "node.js",
                    "label": "Node.js"
                },
                {
                    "clickable": "",
                    "label": "Angular"
                },
                {
                    "clickable": "",
                    "label": "Flask"
                }
            ],
            "preferred": [
                {
                    "clickable": "django",
                    "label": "Django"
                },
                {
                    "clickable": "",
                    "label": "Full Stack"
                },
                {
                    "clickable": "",
                    "label": "React"
                },
                {
                    "clickable": "python",
                    "label": "Python"
                }
            ]
        },
        "salaryDetail": {
            "minimumSalary": 80000,
            "maximumSalary": 300000,
            "currency": "INR",
            "hideSalary": false,
            "variablePercentage": 0,
            "label": "80,000-3 Lacs"
        },
        "board": "1"
    },
    "seo": {
        "classf": "Jobs & Career: Job Search, Apply Jobs, Post Jobs",
        "flag": "JD",
        "noindex": "n",
        "bcrumb": "",
        "id": 1763,
        "title": "Full Stack Developer | 0 To 3 Years | AI Focused | India - Delhi/NCR,Bengaluru/Bangalore,Jaipur - Prowess India Consulting Services - 0 to 3 years of experience",
        "keyword": "Full Stack Developer | 0 To 3 Years | AI Focused | India in Prowess India Consulting Services Delhi/NCR,Bengaluru/Bangalore,Jaipur",
        "url": "job-listings-jobDesc",
        "descp": "Job Description for Full Stack Developer | 0 To 3 Years | AI Focused | India in Prowess India Consulting Services in Delhi/NCR,Bengaluru/Bangalore,Jaipur for 0 to 3 years of experience. Apply Now!",
        "canon": null
    },
    "cardsSequence": [
        {
            "label": "Job Details",
            "key": 1
        },
        {
            "label": "About Company",
            "key": 2
        }
    ]
}


{
    "count": 10,
    "data": [
        {
            "name": "Umang ",
            "company": "HIND TV",
            "location": "Delhi",
            "total_work_experience": "3 Yrs 0 Month",
            "functional_area": "Actor / Anchor",
            "title": "Anchor cum producer",
            "cand_id": "606e91942709593544b10efd",
            "unique_id": "bc7c6bb3eb7736e8e0bae6ada941d7c0661fd8e96139f84f6d9bb961",
            "doc_id": "gAAAAABmOjDh5D9xSGVd6fZP6I_4vyG3d-I3FmtGmDB50JObksVtx3kwChdiMAHBvY2MVb0ROlUnc9VfdVlITxEKFAAhfs54vfjnf8v-V2YuA-B4todwci9xTvWs4DvNhwzIGQaZy00CloRiPZ0Y1oCkc0EUcf3yWQ=="
        },
        {
            "name": "Kritika Bhatnagar",
            "company": "India Daily Live",
            "location": "Delhi",
            "total_work_experience": "3 Yrs 0 Month",
            "functional_area": "Actor / Anchor",
            "title": "News Anchor",
            "cand_id": "6408c926735e36090452703f",
            "unique_id": "7e05c29daac4b711a11204675dbbb2370eb40fc85e7b98c5c93db5cd",
            "doc_id": "gAAAAABmOjDhH7dU5og5EgiYsGjky36SQYXzWTd15WXtiS_Bk6-V01NQ3vrKMySB3gsLHEhOiyJTlJnQ4yHZzsK6sf5Xj8eYItI4WaXNkYmbeT_pmunkXIc6mnyJGIiWjlSyRzFrKg57au4337x3ar_h6GJ5V4-WvbgHRG4cShin1U_jj-gSmI4="
        },
        {
            "name": "Hiba ",
            "company": "TV9 Network",
            "location": "Delhi",
            "total_work_experience": "4 Yrs 0 Month",
            "functional_area": "Actor / Anchor",
            "title": "Anchor / Assistant Producer",
            "cand_id": "5bf953eb65ef5f1b20c0fac9",
            "unique_id": "969270d84f83bc6f23acb9a17ce69647687dfb23190ffc5022e632d5",
            "doc_id": "gAAAAABmOjDhlsMGw2DoLtTOBoosdAasrTDWKlJw_vDGS1Pa86TXwPc1Caf0h2hqs5-rJmSWWkX54NQJNvoVO9jPrfqrlG1b1744NPNS9fEXj20pYtDprE1WGaH8Yo-0H6AybFs-2TGvj_1cnwU7BvxqmJ1nd6jzcw=="
        },
        {
            "name": "Aanchal verma",
            "company": "Pulse 24 News",
            "location": "Delhi",
            "total_work_experience": "4 Yrs 0 Month",
            "functional_area": "Actor / Anchor",
            "title": "News Anchor",
            "cand_id": "62aa1f486da8bf5a7315622f",
            "unique_id": "f2c56693883c686c9689bee82ead49a176e498b0f451de1a82531184",
            "doc_id": "gAAAAABmOjDhewQARxRXheSGI4d9hQQDOLgMV15zWR0hltUrUZzYCOeQcdD8YGCes-ug98pVB9aXUEkhxDg0757KGK7abc4RyrDoxG1QcSHvAySTrwFlZ_HFdR3mtDEPs-MDcXZzNACNc8ZytYuHGqUrLLeYGDxYv6_U6IZYAQZv9cWRe4KNlN4="
        },
        {
            "name": "Vidhi sharma",
            "company": "Citi hulchul news channel",
            "location": "Delhi",
            "total_work_experience": "3 Yrs 0 Month",
            "functional_area": "Actor / Anchor",
            "title": "Anchor",
            "cand_id": "64d8bcd37f5803437a0a117d",
            "unique_id": "1c582f112de922e4d8f78ba049cc3c1e407e822cc1cfff96b5a38c29",
            "doc_id": "gAAAAABmOjDhx3GPfdsGwPi31wDz2zUhIPBRcMjdSqKieGDYvXOxlleurVibHXWJhDwDN7SWDa2cXTWLE3fMhZuR82lfpTM4CNzr4sWwCpIIkz--w2tLOzmIPiLykBxdtWJEXfBsnUkCuPHEPTm7SjL20zl45nvSMrt3XX-3k0rMEVA7FNpHzAI="
        },
        {
            "name": "Sakeena Yousuf",
            "company": "Hind Voice",
            "location": "Delhi",
            "total_work_experience": "3 Yrs 0 Month",
            "functional_area": "Actor / Anchor",
            "title": "News Anchor",
            "cand_id": "64d210c3db88725b81bfc48f",
            "unique_id": "97d45f40ded23231196bc89155180584aacb38159cd478542b6e1ca3",
            "doc_id": "gAAAAABmOjDhm7fIuJsuGG4UOuRYbFY0cRzd6JkH06j-wC_QOQbwt8phT20KNYpurG0Uh6hMFY-vrUZ-lyOoZnvwrDrqt0OZZL3EVCOLPfORZv33oxlyNxxuCj9bQldZX_jgvEvKyM6lEGeBVl4D3rk-r_kj_RC8tBppcwDoKRR_6ap_L-1dF-Y="
        },
        {
            "name": "ANJANEY DUBEY ",
            "company": "Gorakhpur News Channel",
            "location": "Gorakhpur",
            "total_work_experience": "2 Yrs 0 Month",
            "functional_area": "Actor / Anchor",
            "title": "Anchor",
            "cand_id": "64ac4e80782f5830625a004e",
            "unique_id": "9d3c5897306e80592b9ee34fceba28751dafd87e9bd06790b32c95b1",
            "doc_id": "gAAAAABmOjDhneCm4EM36h3flQ8c2KCAul9DyidrdcY7oYEdqZQ0smhfFZSK5tkjiNWn2IHRy-r_6S4MsxjSDfKyvMcGrKwyVP1pWOrN0Wt8yyzbn6lSs0Ua3HKyyPqPeIrhEy7szF3eLC-RvJrYuZTy5FaS3P_sUYoG26e3Tar68flBB9WlDD8="
        },
        {
            "name": "Shrishti Jain",
            "company": "Henry Harvin Education",
            "location": "Noida",
            "total_work_experience": "2 Yrs 0 Month",
            "functional_area": "Actor / Anchor",
            "title": "Event Anchor",
            "cand_id": "5aa18ede8afe5f352addd34e",
            "unique_id": "25d074d34473bbb4014b393da220193d70186b9807017b146d261ab4",
            "doc_id": "gAAAAABmOjDhHLkZ45nSgVHYB0jKlF_H00_Wxz6imq5FFqFB5XKG-meL-pSiFnMoKWlE7o5B8UkQ0WdrHjIHI3KNWewIAwZXJAHG0tYeyRFv45KvmPMUNKbXthy-x62HvjWbZCXE4bpWu3IDxeWV2AA2-7OqGAmv3w=="
        },
        {
            "name": "GARIMA KAUSHIK ",
            "company": "Freelance",
            "location": "Delhi",
            "total_work_experience": "3 Yrs 0 Month",
            "functional_area": "Actor / Anchor",
            "title": "Anchor",
            "cand_id": "55b74ccbcce9fb7e1232bb80",
            "unique_id": "00a48e6369d94957aec0ec2039dd11171627135493de368d1bda21a7",
            "doc_id": "gAAAAABmOjDhNj6-_NJsWB_2z--kAY-eMHHg0oK_xa0yGIt6ze2iNFqTlNxTUEJ2zWtMn-ItwCG1J0SRHOwh_drjCLZwUiW8hWFdqp4GlbUamWGDTCjF1sDXAo-b7Fh3akCRJuCBeSRC6G81_-oBHklRqODn1qiIT0TOgtujqcC4nzWfCaJuA2E="
        },
        {
            "name": "Kajol ",
            "company": "reliance big entertainment",
            "location": "Delhi",
            "total_work_experience": "2 Yrs 3 Months",
            "functional_area": "Actor / Anchor",
            "title": "Anchor",
            "cand_id": "5f7acd827945071719ec1eb1",
            "unique_id": "fa0e42b8bd192373adee3a5e1f4512105b703f584aaec8e8f7dcd0b0",
            "doc_id": "gAAAAABmOjDhLXXj9ipW0lwqK45PzjKTmbT3UL9bWGoU7QzxeCaRqDetBo4a3BZ3DlzecoGOd8QyB3ml0kllS88-k4OuYa3r_r8gSaVsw-RJawAN-gRJt1LZphsQgYGUk6on_YiKcFcOVUKF4XwT_UYeqGfiy-8UZQ=="
        }
    ],
    "is_IT_cand": false,
    "view_all_count": 15
}