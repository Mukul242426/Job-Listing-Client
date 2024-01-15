import React, { useContext, useState } from "react";
import "./Login.css";
import image from "../../assets/image 466.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import {FRONTEND_URL} from '../../utils/utils'
import { UserContext } from "../../contexts/UserContext";

export default function Login() {

  const {setIsLoggedIn}=useContext(UserContext)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setFormData({
        ...formData,
        [name]: value,
        error: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let success = true;

    if (!validator.isEmail(formData.email) && formData.email.length > 0) {
      setFormData({
        ...formData,
        error: "Please provide a valid email id",
      });
      success = false;
    }

    if (
      formData.email.trim().length === 0 ||
      formData.password.trim().length === 0
    ) {
      toast.error("All Fields are required", {
        position: "top-left",
        theme: "dark",
      });
      success = false;
    }

    return success;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios
      .post(`${FRONTEND_URL}/login`, formData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, {
          position: "top-left",
          theme: "light",
        });
        localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
        localStorage.setItem("recruiterName",JSON.stringify(res.data.recruiterName))
        setIsLoggedIn(true)
        navigate("/");
      })
      .catch((err) => {
        console.log("Catch Block");
        console.log(err.response.data.error.message);
        toast.error(err.response.data.error.message, {
          position: "top-left",
          theme: "dark",
        });
      });
  };

  return (
    <>
      <div className="Login-Page">
        <div className="login-side">
          <div className="title">
            <div className="sub-title-1">Already have an account</div>
            <div className="sub-title-2">Your personal job finder is here</div>
          </div>
          <form className="Signin">
            <div className="login-box">
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {formData.error === "" ? (
                ""
              ) : (
                <div className="error-msg">{formData.error}</div>
              )}
            </div>
            <div className="login-box">
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="box-1">
              <div className="button-box">
                <button className="login-btn" onClick={handleSubmit}>
                  Sign in
                </button>
              </div>
              <div className="txt-msg">
                <span className="message">Don't have an account?</span>{" "}
                <Link to="/register" className="link">
                  Signup
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="right">
          <div className="random-text">Your Personal Job Finder</div>
          <img src={image} className="default" alt="default" />
        </div>
      </div>
    </>
  );
}
