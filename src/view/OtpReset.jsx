import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react18-input-otp";
import axiosClient from "../axiosClientFront";

const OtpReset = () => {
  const [otp, setOtp] = useState("");
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const [email] = useState(localStorage.getItem("email"));
  const [action] = useState("reset");
  console.log(email);
  useEffect(() => {
    axiosClient
      .post("resendOtp", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleSubmit = () => {
    console.log({
      email: email,
      otp: otp,
      action: action,
    });
    axiosClient
      .post("checkOtp", {
        email: email,
        otp: otp,
        action: action,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("checkOtp", res.data.success);
          console.log(res.data.user);
          window.location.href = "/passwordReset";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div >
       {/* <!-- ======= Header ======= --> */}
       <header
        id="header"
        className=" fixed-top  header-transparent"
      >
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <h1>
              <a href="index.html">Applauds</a>
            </h1>
            {/* <!-- Uncomment below if you prefer to use an image logo --> */}
            {/* <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>--> */}
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link className="nav-link scrollto active" to="/">
                  Home
                </Link>
              </li>
              <li>
                <a className="nav-link scrollto" href="#features">
                  App Features
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#gallery">
                  Gallery
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#faq">
                  F.A.Q
                </a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>name</span> <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="#">email</a>
                  </li>
                  <li className="dropdown">
                    <a href="#">
                      <span>Deep Drop Down</span>
                      <i className="bi bi-chevron-right"></i>
                    </a>
                    <ul>
                      <li>
                        <a href="#">Deep Drop Down 1</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 2</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 3</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 4</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 5</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Drop Down 2</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/dashboard">
                  dashboard
                </Link>
              </li>
              <a
                href="#"
                className={"block px-4 py-2 text-sm text-gray-700"}
              >
                Sign out
              </a>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
          {/* <!-- .navbar --> */}
        </div>
      </header>
      {/* <!-- End Header --> */}
    <div className="flex justify-center mt-56 ">
      <div className=" max-w-sm rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold bg-white">Enter OTP</h1>
          <OtpInput
            className="otp-field bg-white border-0 pe-[12px]"
            value={otp}
            onChange={handleChange}
            numInputs={6}
            isSucceeded={true}
            successStyle="success"
            separator={<span>-</span>}
            separateAfter={3}
            onSubmit={handleSubmit}
          />
          <button type="submit" onClick={handleSubmit} className="btn btn-blue text-2xl font-bold">
            Enter
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OtpReset;
