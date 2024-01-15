import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import Header from "../Header/Header";
import image1 from "../../assets/Vector (4).png";
import axios from "axios";
import Widget from "../Widget/Widget";
import JobPost from "../JobPost/JobPost";
import { useNavigate } from "react-router-dom";
import {FRONTEND_URL} from '../../utils/utils'
import { UserContext } from "../../contexts/UserContext";


export default function Home() {

  const {isLoggedIn}=useContext(UserContext);

  const navigate=useNavigate()

  // const [session, setSession] = useState(false);
  const [position, setPosition] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [options, setOptions] = useState([]);
  const [jobs,setJobs]=useState([]);

  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   setSession(true);
    // }
    axios
      .get(`${FRONTEND_URL}/skills`)
      .then((res) => {
        setOptions(res.data.skills);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(()=>{

    const url=`${FRONTEND_URL}/jobs?position=${position}&selectedSkills=${selectedSkills.join(',')}`
    console.log(url)
    axios.get(url)
    .then((res)=>{
      console.log(res.data.jobs)
      setJobs(res.data.jobs)
    })
    .catch((err)=>console.log(err))
  },[position,selectedSkills])

  const handlePosition = (e) => {
    setPosition(e.target.value);
  };

  const handleSkills = (e) => {
    if (!selectedSkills.includes(e.target.value))
      setSelectedSkills([...selectedSkills, e.target.value]);
  };

  return (
    <>
      {/* <Header session={session} setSession={setSession} /> */}
      <div className="home">
        <div className="big-box-1">
        {/* <Header session={session} setSession={setSession} /> */}
        <Header/>
        </div>
         <div className="big-box-2">
        <div className="filter-container">
          <div className="search-bar">
            <img src={image1} alt="search" className="icon" />
            <input
              type="text"
              name="position"
              value={position}
              placeholder="Type any job title"
              className="position-input"
              onChange={handlePosition}
            />
          </div>
          <div className="skills-container">
            <div className="select-skills">
              <select
                onChange={handleSkills}
                value=""
                className="dropdown"
              >
                <option value="" disabled>
                  Skills
                </option>
                {options.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div className="applied-skills">
              {selectedSkills.map((skillName, index) => (
               
                <Widget
                  key={index}
                  skillName={skillName}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                />
               
              ))}
            </div>
            {isLoggedIn && (<button className="add-btn" onClick={()=>navigate('/create/job')}>
              + Add Job
            </button>)}
          </div>
          {/* {selectedSkills.length>0 && (
                  <div className="clear-btn-show" onClick={()=>setSelectedSkills([])}>Clear</div>
                )} */}
        </div>
        <div className={jobs.length>0?"display-jobs":'no-match'}>
          {jobs.length>0 ? jobs.map((job,index)=>(
            // <JobPost key={job._id} job={job} session={session}/>
            <JobPost key={job._id} job={job}/>
          )):'No matching jobs found'}
        </div>
      </div>
      </div>
    </>
  );
}
