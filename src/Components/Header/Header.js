import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header({session,setSession}) {

const navigate=useNavigate();

const [recruiterName,setRecruiterName]=useState('');

useEffect(()=>{

  if(session){
    setRecruiterName(JSON.parse(localStorage.getItem("recruiterName")))
  }
  else{
    setRecruiterName('')
  }
},[session])


const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('recruiterName');
    setSession(false)
}


  return (
    <div className='header'>
      <div className='job-finder'>
      Jobfinder
      </div>
      <div className='buttons' style={{display:session?'none':'flex'}}>
       <button className='login-button' onClick={()=>navigate('/login')}>
        Login
       </button>
       <button  className='register-button' onClick={()=>navigate('/register')}>
        Register
       </button>
      </div>
      <div className='buttons'style={{display:session?'flex':'none'}}>
        <div className='logout-button' onClick={handleLogout}>Logout</div>
        <div className='username'>{`Hello! ${recruiterName}`}</div>
      </div>
    </div>
  )
}

export default Header
