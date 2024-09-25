/* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react'
import { useInView } from "react-intersection-observer";
import { Navigate, Outlet } from "react-router-dom";
import { UserStateContext } from "../contexts/ContextProvider";
import HeaderDashboard from "./dashboard/HeaderDashboard";
import Sidebar from "./dashboard/Sidebar";

export default function DashboardLayout() {
  const { ref: myRef, inView: isVisible } = useInView();
  const {  userState } = UserStateContext();
  const logout = () => {
    localStorage.clear();
    window.location.href = "/home";
  };
  if (!userState) {
    logout();
    return <Navigate to="/home" />;
  }

  return (
    <>
    <div className="w-max max-w-full md:w-full md:max-w-full">
      {/* <!-- ======= Header ======= --> */}
      <HeaderDashboard />
      {/* <!-- End Header --> */}

      {/* <!-- ======= Sidebar ======= --> */}
      <Sidebar />
      {/* <!-- End Sidebar--> */}
      <main id="d-main" className="main">
      <Outlet />
      </main>
      {/* <!-- ======= Footer ======= --> */}
      <footer id="d-footer" className="footer" ref={myRef}>
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Upvela Team </span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="#">Upvela</a>
        </div>
      </footer>
      {/* <!-- End Footer --> */}

      <a
        href="#"
        className={`back-to-top d-flex align-items-center justify-content-center${isVisible? "active" : ""}`}
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
      </div>
    </>
  );
}
