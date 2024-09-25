/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'
import { useEffect, useState } from "react";
// import { Alert } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../../axiosClientFront";
import { UserStateContext } from "../../contexts/ContextProvider";

export default function SidebarBuffer() {
  const { currentUser } = UserStateContext();
  // const [message, setMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState(null);
  const [id, setId] = useState(null);
  const { userState } = UserStateContext();
  const location = useLocation();
  useEffect(() => {
    fetchPusher();
    if (userState == state) {
      if (
        userState != "super_admin" ||
        userState != "admin" ||
        state != "support"
      ) {
        logout();
      }
    }
  }, []);
  function sidekick() {
    const toggle =
      document.getElementById("sidebar").parentElement.parentElement;
    toggle.classList.remove("toggle-sidebar");
  }
  const fetchPusher = async () => {
    try {
      const response = await axiosClient.post("me");
      setState(response.data.user.state);
      setId(response.data.user.id);
      console.log(response.data.user.state);
    } catch (err) {
      console.log(err);
      setErrorMessage("error", err.message);
    }
  };
  const isCurrentLinkActive = (linkTo) => {
    return location.pathname === linkTo ? "" : "collapsed";
  };
  const logout = () => {
    localStorage.clear();
    window.location.href = "/home";
  };
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
        <Alert variant="danger" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Alert>
      )}
      <aside id="sidebar" className="sidebar border-l-4 border-gray-800">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${isCurrentLinkActive("/buffer")}`}
              to="/buffer"
              onClick={(e) => sidekick(e)}
            >
              <i className="bi bi-grid"></i>
              <span>أهلا {currentUser.name}</span>
            </Link>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-heading">الصفحات</li>
          {id == "682" ? 
            null
           :state && state == "super_admin" ? (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/buffer/UserBuffer"
                  )}`}
                  to="/buffer/UserBuffer"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person"></i>
                  <span>مستخدمين الخزانات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/buffer/UserBufferExpire"
                  )}`}
                  to="/buffer/UserBufferExpire"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person"></i>
                  <span>مستخدمين الخزانات المنتهي المدة</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/buffer/UserBufferUnActive"
                  )}`}
                  to="/buffer/UserBufferUnActive"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person"></i>
                  <span>مستخدمين الخزانات المنتهيه</span>
                </Link>
              </li>
            
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/buffer/buffers"
                  )}`}
                  to="/buffer/buffers"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-boxes"></i>
                  <span>الخزانات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/buffer/UserBufferDay"
                  )}`}
                  to="/buffer/UserBufferDay"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-boxes"></i>
                  <span>سجل الخزانات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/buffer/UserBufferUser"
                  )}`}
                  to="/buffer/UserBufferUser"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-boxes"></i>
                  <span>سجل الارباح</span>
                </Link>
              </li>
          
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/Home">
                  <i className="bi bi-person-badge"></i>
                  <span>صفحة الرئيسية</span>
                </Link>
              </li>
            </>
          ) 
          : null}
        </ul>
      </aside>
    </>
  );
}
