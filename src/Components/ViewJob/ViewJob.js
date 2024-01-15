import React, { useContext, useEffect, useState } from "react";
import "./ViewJob.css";
import Header from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";
import { UserContext } from "../../contexts/UserContext";

function ViewJob() {

  const {isLoggedIn}=useContext(UserContext)

  const navigate=useNavigate()

  const { jobId } = useParams();

  // const [session, setSession] = useState(false);
  const [data, setData] = useState({});
  // console.log(data.position);

  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   setSession(true);
    // }

    axios
      .get(`${FRONTEND_URL}/jobs/${jobId}`)
      .then((res) => {
        console.log(res.data.job);
        setData(res.data.job);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="view-job">
        <div className="part-1">
          {/* <Header session={session} setSession={setSession} /> */}
          <Header/>
        </div>
        <div className="part-2">
          <div className="heading-part">
            {data &&
              data.position &&
              `${data.position} ${
                data.remote === "Remote" ? "work from home" : "office"
              } ${data.jobType === "Full-Time" ? "job" : "internship"} at ${
                data.companyName
              }`}
          </div>
          <div className="details-part">
            <div className="details-col-1">
              <div className="details-row-1">
                <div className="job-profile">
                  {data && data.position && data.position}
                </div>
                <button className={isLoggedIn?'edit-button':'edit-button-hide'}  onClick={()=>navigate(`/edit/job/${jobId}`)}>Edit Job</button>
              </div>
              <div className="details-row-2">
                {data && data.location && data.location}
              </div>
            </div>
            <div className="details-col-2">
              <div className="details-row-3">
                <div className="salary-logo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M18.375 14C18.375 14.8653 18.1184 15.7112 17.6377 16.4306C17.1569 17.1501 16.4737 17.7108 15.6742 18.042C14.8748 18.3731 13.9951 18.4597 13.1465 18.2909C12.2978 18.1221 11.5183 17.7054 10.9064 17.0936C10.2946 16.4817 9.87787 15.7022 9.70906 14.8535C9.54025 14.0049 9.62689 13.1252 9.95803 12.3258C10.2892 11.5263 10.8499 10.8431 11.5694 10.3623C12.2888 9.88159 13.1347 9.625 14 9.625C15.1603 9.625 16.2731 10.0859 17.0936 10.9064C17.9141 11.7269 18.375 12.8397 18.375 14ZM27.125 7V21C27.125 21.2321 27.0328 21.4546 26.8687 21.6187C26.7046 21.7828 26.4821 21.875 26.25 21.875H1.75C1.51794 21.875 1.29538 21.7828 1.13128 21.6187C0.967187 21.4546 0.875 21.2321 0.875 21V7C0.875 6.76794 0.967187 6.54538 1.13128 6.38128C1.29538 6.21719 1.51794 6.125 1.75 6.125H26.25C26.4821 6.125 26.7046 6.21719 26.8687 6.38128C27.0328 6.54538 27.125 6.76794 27.125 7ZM25.375 12.0695C24.3814 11.7758 23.4772 11.2381 22.7445 10.5055C22.0119 9.77283 21.4742 8.86856 21.1805 7.875H6.81953C6.52576 8.86856 5.98807 9.77283 5.25545 10.5055C4.52283 11.2381 3.61856 11.7758 2.625 12.0695V15.9305C3.61856 16.2242 4.52283 16.7619 5.25545 17.4945C5.98807 18.2272 6.52576 19.1314 6.81953 20.125H21.1805C21.4742 19.1314 22.0119 18.2272 22.7445 17.4945C23.4772 16.7619 24.3814 16.2242 25.375 15.9305V12.0695Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
                <div className="salary-title">
                 {data && data.jobType && `${data.jobType==='Full-Time'?'Salary':'Stipend'}`}
                </div>
              </div>
              <div className="details-row-4">
                {data && data.monthlySalary && `Rs ${data.monthlySalary}/month`}
              </div>
            </div>
            <div className="details-col-3">
              <div className="details-row-5">
                About company
              </div>
              <div className="details-row-6">
               {data && data.about && data.about}
              </div>
            </div>
            <div className="details-col-4">
              <div className="details-row-7">
              {data && data.jobType && `About the ${data.jobType==='Full-Time'?'job':'internship'}`}
              </div>
             <div className="details-row-8">
              {data && data.about && data.about}
             </div>
            </div>
            <div className="details-col-5">
              <div className="details-row-9">
              Skills(s) required
              </div>
              <div className="details-row-10">
              {data && data.skillsRequired && 
                data.skillsRequired.map((skill,index)=>(
                 <div key={index} className="view-skills">{skill}</div>
                ))
              }
              </div>
            </div>
            <div className="details-col-6">
              <div className="details-row-11">
               Additional Information
              </div>
              <div className="details-row-12">
               {data && data.information && data.information}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewJob;
