import React, { useContext } from "react";
import "./JobPost.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function JobPost({ job }) {

  const {isLoggedIn}=useContext(UserContext);

  const navigate=useNavigate();

  const isValidUrl = (Url) => {
    try {
      new URL(Url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const defaultUrl =
    "https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg";
  return (
    <div className="JobPost">
      <div className="col-1">
        <div className="logo-box">
          <img
            src={isValidUrl(job.logoUrl) ? job.logoUrl : defaultUrl}
            className="company-logo"
            alt="logo"
          />
        </div>
        <div className="job-details">
          <div className="job-role">{job.position}</div>
          <div className="job-metaInfo">
            <div className="salary">₹ {job.monthlySalary}</div>
            <div className="location">{job.location}</div>
          </div>
          <div className="job-type">
            <div className="option-1">{job.remote}</div>
            <div className="option-2">{job.jobType}</div>
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="criteria-box">
          {job.skillsRequired.map((skill, index) => (
            <div key={index} className="required-skill">{skill}</div>
          ))}
        </div>
        <div className="job-btns">
          <button className={isLoggedIn?'edit-job':'hide'} onClick={()=>navigate(`/edit/job/${job._id}`)}>
            Edit Job
          </button>
          <button className="view-details" onClick={()=>navigate(`/view/job/${job._id}`)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
