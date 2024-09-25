/* eslint-disable react-hooks/exhaustive-deps */
import {
  faEnvelope,
  faLink,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import log from "../assets/img/log.svg";
import reg from "../assets/img/register.svg";
import "../assets/style.css";
import axiosClient from "../axiosClientFront";
export default function Login() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState([]);
  // const [code, setCode] = useState(null);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    comming_afflite: "",
    password: "",
  });
  const handleInputRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleInputLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  function handleSubmitLogin(e) {
    e.preventDefault();
    // console.log(login);
    axiosClient
      .post("login", login)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          // console.log(res.data.user);
          localStorage.setItem("user", res.data.user.name);
          localStorage.setItem("user_id", res.data.user.id);
          localStorage.setItem("email", res.data.user.email);
          // localStorage.setItem("plan", res.data.user.plan.name);
          localStorage.setItem("state", res.data.user.state);
          // console.log(res.data.user.verified);
          // if (res.data.user.verified == 1) {
            localStorage.setItem("checkOtp", res.data.user.verified);
            localStorage.setItem("token", res.data.user.token);
            if(res.data.user.state == "super_admin"&& res.data.user.id == 84 ){
              window.location.href = "/buffer/UserBuffer";
            }else if (res.data.user.state == "super_admin"||res.data.user.state == "admin"||res.data.user.state == "support") {
              window.location.href = "/dashboard";
              
            }else {
              window.location.href = "/Home";
            }
            
            // return <Navigate to="/Home#pricing" />;
            // window.location.href = "/Home#pricing";
            // window.location.href = "/Home";
          // }
        }else{
          setErrorMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setRegister({ ...register, phone: value });
  }, [value]);
  function handleSubmitRegister(e) {
    e.preventDefault();
    // console.log(register);
    axiosClient
      .post("create", register)
      .then((res) => {
        // console.log(res.data.success);
        if (res.data.success) {
          localStorage.setItem("token", res.data.user.token);
          localStorage.setItem("user", JSON.stringify(res.data.success.user));
          localStorage.setItem("email", res.data.user.email);
          window.location.href = "/home";
          setSuccessMessage("User registered successfully");
        } else {
          // console.log(res.data.errors);
          if (res.data.errors.email) {
            setErrorMessage(res.data.errors.email);
          }
          // setErrorMessage(res.data.errors);
        }
      })
      .catch((err) => {
        console.log(err);
        // setErrorMessage(err.errors);
      });
  }
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      window.location.href = "https://upvela.app/register?code=" + code;
      // console.log(code);
      // switcherUp()
      // setCode(code);
      // setRegister({ ...register, comming_afflite: code });
    }
  }, []);

  const containerRef = useRef(null);

  // const [errorMessage, setErrorMessage] = useState("");  
  // const container = document.getElementById("containers");

  function switcherUp() {
    containerRef.current.classList.add("sign-up-mode");
    }
  function switcherIn() {
    containerRef.current.classList.remove("sign-up-mode");
  }

 
  return (
    <>
       {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage("")}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}
      <div className="containers" id="containers" ref={containerRef}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSubmitLogin} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faUser} className="" />
                </div>
                <input
                  placeholder="Username"
                  id="email-Sign-in"
                  name="email"
                  style={{boxShadow: 'none'}}
                  type="email"
                  autoComplete="email"
                  required
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmitRegister();
                    }
                  }}
                  onChange={handleInputLogin}
                />
              </div>
              <div className="input-field">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faLock} className="fas fa-lock" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  id="password-Sign-in"
                  name="password"
                  style={{boxShadow: 'none'}}
                  autoComplete="current-password"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmitRegister();
                    }
                  }}
                  required
                  onChange={handleInputLogin}
                />
              </div>
              <Link to="https://upvela.app/sendEmail" className="forgot-password-link">Forgot Password</Link>
              <input type="submit" value="Login" className="btn btn-primary" />
            </form>
            <form onSubmit={handleSubmitRegister} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faUser} className="" />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  id="name"
                  name="name"
                  style={{boxShadow: 'none'}}
                  autoComplete="name"
                  required
                  onChange={handleInputRegister}
                />
              </div>
              <div className="input-field">
                <PhoneInput
                  className=" w-96"
                  international
                  defaultCountry="EG"
                  countryCallingCodeEditable={false}
                  placeholder="phone"
                  id="phone"
                  name="phone"
                  minLength="8"
                  maxLength="16"
                  autoComplete="Enter phone number"
                  required
                  onChange={setValue}
                />
              </div>
              <div className="input-field">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faLink} />
                </div>
                <input
                  type="text"
                  placeholder="comming_afflite"
                  id="comming_afflite"
                  value={register.comming_afflite}
                  name="comming_afflite"
                  autoComplete="comming_afflite"
                  style={{boxShadow: 'none'}}
                  minLength="4"
                  maxLength="15"
                  size="10"
                  required
                  // readOnly={code ? true : false}
                  onChange={handleInputRegister}
                />
              </div>
              <div className="input-field">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="fas fa-lock" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  style={{boxShadow: 'none'}}
                  name="email"
                  autoComplete="email"
                  required
                  onChange={handleInputRegister}
                />
              </div>
              <div className="input-field">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faLock} className="fas fa-lock" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  style={{boxShadow: 'none'}}
                  name="password"
                  autoComplete="current-password"
                  required
                  onChange={handleInputRegister}
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel right-panel">
          <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={switcherIn}
              >
                Sign in
              </button>
            </div>

            <img src={log} className="image" alt="" />
          </div>
          <div className="panel left-panel">
          <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                className="btn btn-primary transparent"
                id="sign-up-btn"
                onClick={switcherUp}
              >
                Sign up
              </button>
            </div>
            <img src={reg} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
