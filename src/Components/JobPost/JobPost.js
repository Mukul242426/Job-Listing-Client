import React from 'react'
import './JobPost.css'

export default function JobPost({job}) {

  const isValidUrl=(Url)=>{
    try{
        new URL(Url)
        return true;

    }catch(err){
        return false;
    }
  }   

  const defaultUrl="https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg"
  return (
    <div className='JobPost'>
      <div className='col-1'>
      <div className='logo-box'>
       <img src={isValidUrl(job.logoUrl)?job.logoUrl:defaultUrl} className='company-logo' alt="logo"/>
      </div>
      </div>
      <div className='col-2'>
       
      </div>
    </div>
  )
}
