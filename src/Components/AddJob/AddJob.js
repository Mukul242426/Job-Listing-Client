import React, { useState } from "react";
import "./AddJob.css";
import image from "../../assets/Image 24.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddJob() {

  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    companyName: "",
    logoUrl: "",
    position: "",
    monthlySalary: "",
    jobType: "",
    remote: "",
    location: "",
    description: "",
    about: "",
    skillsRequired: [],
    information: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "companyName" || name === "position") {
      const correct_name = value.replace(/\s+/g, " ");
      const correct_value = correct_name.replace(/[^a-zA-Z ]/g, "");
      setFormData({
        ...formData,
        [name]: correct_value,
      });
    } else if (name === "monthlySalary") {
      const correct_value = value.replace(/[^\d]/g, "");
      const salary =
        correct_value.length <= 6 ? correct_value : correct_value.slice(0, 6);
      setFormData({
        ...formData,
        [name]: salary,
      });
    }
    else if(name==="skillsRequired"){
      const correct_value=value.split(',')
      setFormData({
        ...formData,
        [name]:correct_value
      })
    }
    
    else
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  const handleClick=()=>{

    const jwttoken=JSON.parse(localStorage.getItem('token'))

    axios.post('http://localhost:4000/jobs',formData,{
      headers:{
        'Content-Type':'application/json',
         Authorization:`Bearer ${jwttoken}`
      }
    })
    .then((res)=>{
     console.log(res)
     toast.success(res.data.message,{
      position:'top-left',
      theme:'dark'
     })
     navigate('/')
    })
    .catch((err)=>{
      console.log(err)
      toast.error(err.response.data.error.message,{
        position:'top-left',
        theme:'dark'
      })
    })
  }

  return (
    <div className="add-job">
      <div className="create-side">
        <div className="container-heading">Add job description</div>
        <div className="input-container">
          <div className="field-title">Company Name</div>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="data-field"
            placeholder="Enter your company name here"
          />
        </div>
        <div className="input-container">
          <div className="field-title">Add logo URL</div>
          <input
            type="text"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            className="data-field"
            placeholder="Enter the link"
          />
        </div>
        <div className="input-container">
          <div className="field-title">Job position</div>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="data-field"
            placeholder="Enter job position"
          />
        </div>
        <div className="input-container">
          <div className="field-title">Monthly salary</div>
          <input
            type="text"
            name="monthlySalary"
            value={formData.monthlySalary}
            onChange={handleChange}
            className="data-field"
            placeholder="Enter amount in rupees"
          />
        </div>
        <div className="input-container">
          <div className="field-title">Job Type</div>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="jobType"
          >
            <option value="" disabled>
              Select
            </option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
          </select>
        </div>
        <div className="input-container">
          <div className="field-title">Remote/office</div>
          <select
            name="remote"
            value={formData.remote}
            onChange={handleChange}
            className="remote"
          >
            <option value="" disabled>
              Select
            </option>
            <option>Remote</option>
            <option>Office</option>
          </select>
        </div>
        <div className="input-container">
          <div className="field-title">Location</div>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="data-field"
            placeholder="Enter location"
          />
        </div>
        <div className="input-container">
          <div className="job-desc">Job Description</div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="text-area"
            rows={5}
            placeholder="Type the job description"
          />
        </div>
        <div className="input-container">
          <div className="about-comp">About Company</div>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="text-area"
            rows={5}
            placeholder="Type about your company"
          />
        </div>
        <div className="input-container">
          <div className="field-title">Skills Required</div>
          <input
            type="text"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            className="data-field"
            placeholder="Enter the must have skills"
          />
        </div>
        <div className="input-container">
          <div className="field-title">Information</div>
          <input
            type="text"
            name="information"
            value={formData.information}
            onChange={handleChange}
            className="data-field"
            placeholder="Enter the additional information"
          />
        </div>
        <div className="add-cancel-buttons">
          <button className="cancel-opt" onClick={()=>navigate('/')}>Cancel</button>
          <button className="add-opt" onClick={handleClick}>+ Add Job</button>
        </div>
      </div>
      <div className="image-side">
        <img src={image} alt="add-job" className="image-24" />
        <div className="some-text">Recruiter add job details here</div>
      </div>
    </div>
  );
}

export default AddJob;
