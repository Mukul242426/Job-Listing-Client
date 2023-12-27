import React from "react";
import "./Widget.css";

function Widget({ skillName, selectedSkills,setSelectedSkills }) {
  const handleDelete = (e) => {

    e.preventDefault()

    let updatedSkills=selectedSkills.filter((skill)=>{
        if(skill!=skillName){
            return true;
        }
        else{
            return false;
        }
    })
    setSelectedSkills(updatedSkills)

  };

  return (
    <div className="Widget">
      <div className="skillName">{skillName}</div>
      <div className="close-btn" onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="21"
          viewBox="0 0 19 21"
          fill="none"
        >
          <path
            d="M2 2.00012L16.8729 19.3519"
            stroke="white"
            strokeWidth="2.36417"
            strokeLinecap="round"
          />
          <path
            d="M2.00024 19.3521L16.8728 2"
            stroke="white"
            strokeWidth="2.36417"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default Widget;
