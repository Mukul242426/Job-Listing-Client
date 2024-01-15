import './App.css';
import {Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import AddJob from './Components/AddJob/AddJob';
import ViewJob from './Components/ViewJob/ViewJob';
import EditJob from './Components/EditJob/EditJob';
import { UserContext } from './contexts/UserContext';
import { useState , useEffect} from 'react';


function App() {

  const [isLoggedIn,setIsLoggedIn]=useState(false)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLoggedIn(true)
    }
  },[])

  return (
   <>
   <ToastContainer/>
   <UserContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
   <Routes>
   <Route path ="/" element={<Home/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/create/job" element={<AddJob/>}/>
   <Route path="/view/job/:jobId" element={<ViewJob/>}/>
   <Route path="/edit/job/:jobId" element={<EditJob/>}/>
   </Routes>
   </UserContext.Provider>

   </>
  );
}

export default App;
