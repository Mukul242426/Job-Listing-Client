import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {

const navigate=useNavigate();

const [session,setSession]=useState(false)


useEffect(()=>{
    if(localStorage.getItem('token')){
        setSession(true)
    }
},[])

const handleLogout=()=>{
    localStorage.removeItem('token');
    setSession(false);
}


  return (
    <div className='header'>
      <div className='job-finder'>
      Job Finder
      </div>
      <div className='buttons' style={{display:session?'none':'flex'}}>
       <button className='login-button' onClick={()=>navigate('/login')}>
        Login
       </button>
       <button className='register-button' onClick={()=>navigate('/register')}>
        Register
       </button>
      </div>
      <div className='buttons'style={{display:session?'flex':'none'}}>
        <button className='logout-button' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Header
