import React, { useState } from "react";
import validator from "validator";
import "./Register.css";
import image from "../../assets/image 466.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    checked: false,
    error1: "",
    error2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const correct_name = value.replace(/\s+/g, " ");
      const correct_value = correct_name.replace(/[^a-zA-Z ]/g, "");

      setFormData({
        ...formData,
        [name]: correct_value,
      });
    } else if (name === "email") {
      setFormData({
        ...formData,
        [name]: value,
        error1: "",
      });
    } else if (name === "mobile") {
      const correct_value = value.replace(/[^\d]/g, "");
      let mobile =
        correct_value.length <= 10 ? correct_value : correct_value.slice(0, 10);

      setFormData({
        ...formData,
        [name]: mobile,
      });
    } else if (name === "password") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: !formData.checked,
        error2: "",
      });
    }
  };

  const validateForm = () => {
    let success = true;

    if (!validator.isEmail(formData.email) && formData.email.length > 0) {
      setFormData({
        ...formData,
        error1: "Please provide a valid email id",
      });
      success = false;
    }

    if (!formData.checked) {
      setFormData({
        ...formData,
        error2: "Check this box if you want to proceed",
      });
      success = false;
    }

    if (
      formData.name.trim().length === 0 ||
      formData.email.trim().length === 0 ||
      formData.mobile.trim().length === 0 ||
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
      .post("http://localhost:4000/signup", formData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, {
          position: "top-left",
        });
        localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.error.message, {
          position: "top-left",
          theme: "dark",
        });
      });
  };

  return (
    <>
      <div className="Register-Page">
        <div className="left">
          <div className="heading">
            <div className="title-1">Create an account</div>
            <div className="title-2">Your personal job finder is here</div>
          </div>
          <form className="registration">
            <div className="register-box">
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div className="register-box">
              <input
                type="email"
                name="email"
                required
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {formData.error1 === "" ? (
                ""
              ) : (
                <div className="error-msg">{formData.error1}</div>
              )}
            </div>
            <div className="register-box">
              <input
                type="text"
                name="mobile"
                className="form-input"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile"
              />
            </div>
            <div className="register-box">
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="terms-condns">
              <input
                type="checkbox"
                name="checked"
                id="check"
                checked={formData.checked}
                onChange={handleChange}
              />
              <div className="tnc">
                By creating an account, I agree to our terms of use and privacy
                policy
              </div>
            </div>
            {formData.error2 === "" ? (
              ""
            ) : (
              <div className="error-msg">{formData.error2}</div>
            )}
            <div className="box-1">
              <div className="button-box">
                <button className="create-btn" onClick={handleSubmit}>
                  Create Account
                </button>
              </div>
              <div className="txt-msg">
                <span className="message">Already have an account?</span>{" "}
                <Link to="/login" className="link">
                  Signin
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="right">
          <img src={image} className="default" alt="default" />
        </div>
      </div>
    </>
  );
}
