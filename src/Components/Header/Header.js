import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Header.css";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";

// function Header({session,setSession}) {
function Header() {

  const {isLoggedIn,setIsLoggedIn}=useContext(UserContext)

  const navigate = useNavigate();

  // const [recruiterName, setRecruiterName] = useState("");

  // useEffect(()=>{

  //   if(session){
  //     setRecruiterName(JSON.parse(localStorage.getItem("recruiterName")))
  //   }
  //   else{
  //     setRecruiterName('')
  //   }
  // },[session])



  // const handleLogout=()=>{
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('recruiterName');
  //     setSession(false)
  //     toast.success('Logged Out Successfully',{
  //       position:'top-left',
  //       theme:'light'
  //     })
  // }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('recruiterName');
    setIsLoggedIn(false);
    toast.success('Logged Out Successfully',{
            position:'top-left',
            theme:'light'
          })
  };

  return (
    <div className="header">
      <div className="job-finder">Jobfinder</div>
      {/* <div className='buttons' style={{display:session?'none':'flex'}}> */}
      <div className="buttons" style={{display:isLoggedIn?'none':'flex'}}>
        <button className="login-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="register-button"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
      {/* <div className='buttons'style={{display:session?'flex':'none'}}> */}
      <div className="buttons" style={{display:isLoggedIn?'flex':'none'}}>
        <div className="logout-button" onClick={handleLogout}>
          Logout
        </div>
        <div className="username">{`Hello! ${JSON.parse(localStorage.getItem('recruiterName'))}`}</div>
      </div>
    </div>
  );
}

export default Header;
