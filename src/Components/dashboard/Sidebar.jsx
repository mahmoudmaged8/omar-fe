/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'
import { useEffect, useState } from "react";
// import { Alert } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../../axiosClientFront";
import { UserStateContext } from "../../contexts/ContextProvider";

export default function Sidebar() {
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
              className={`nav-link ${isCurrentLinkActive("/dashboard")}`}
              to="/dashboard"
              onClick={(e) => sidekick(e)}
            >
              <i className="bi bi-grid"></i>
              <span>أهلا {currentUser.name}</span>
            </Link>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-heading">الصفحات</li>
          {id == "682" ? (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/users"
                  )}`}
                  to="/dashboard/users"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-people"></i>
                  <span>المستخدمين</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/Userglobalbool"
                  )}`}
                  to="/dashboard/Userglobalbool"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person-hearts"></i>
                  <span>الجلوبال بول</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/panning"
                  )}`}
                  to="/dashboard/panning"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person-dash"></i>
                  <span>المستخدمين في قائمة الحظر</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/deleted"
                  )}`}
                  to="/dashboard/deleted"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-trash3"></i>
                  <span>المستخدمين المحذوفين</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/userswithdraw"
                  )}`}
                  to="/dashboard/userswithdraw"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-cash"></i>
                  <span>طلبات السحب</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/recommendation"
                  )}`}
                  to="/dashboard/recommendation"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-badge-ad"></i>
                  <span>توصيات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/notifications"
                  )}`}
                  to="/dashboard/notifications"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-bell"></i>
                  <span>الاشعارات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/videos"
                  )}`}
                  to="/dashboard/videos"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-film"></i>
                  <span>الفيديو</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/Home">
                  <i className="bi bi-person-badge"></i>
                  <span>صفحة الرئيسية</span>
                </Link>
              </li>
            </>
          ) :state && state == "super_admin" ? (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/super_admin"
                  )}`}
                  to="/dashboard/super_admin"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person-fill"></i>
                  <span>مدير الموقع</span>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/buffer/UserBuffer"
                  )}`}
                  to="/buffer/UserBuffer"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person-fill"></i>
                  <span> الخزنات</span>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/admins"
                  )}`}
                  to="/dashboard/admins"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person"></i>
                  <span>الادمن</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/support"
                  )}`}
                  to="/dashboard/support"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person-hearts"></i>
                  <span>الدعم</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/users"
                  )}`}
                  to="/dashboard/users"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-people"></i>
                  <span>المستخدمين</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/Userglobalbool"
                  )}`}
                  to="/dashboard/Userglobalbool"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person-hearts"></i>
                  <span>الجلوبال بول</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/userbotactive"
                  )}`}
                  to="/dashboard/userbotactive"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-robot"></i>
                  <span> قائمة المستخدمين للبوت</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/bots"
                  )}`}
                  to="/dashboard/bots"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-robot"></i>
                  <span> البوتات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/panning"
                  )}`}
                  to="/dashboard/panning"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-person-dash"></i>
                  <span>المستخدمين في قائمة الحظر</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/deleted"
                  )}`}
                  to="/dashboard/deleted"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-trash3"></i>
                  <span>المستخدمين المحذوفين</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/userswithdraw"
                  )}`}
                  to="/dashboard/userswithdraw"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-cash"></i>
                  <span>طلبات السحب</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/recommendation"
                  )}`}
                  to="/dashboard/recommendation"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-badge-ad"></i>
                  <span>توصيات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/notifications"
                  )}`}
                  to="/dashboard/notifications"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-bell"></i>
                  <span>الاشعارات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/posts"
                  )}`}
                  to="/dashboard/posts"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-postcard-heart"></i>
                  <span>مقالات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/tickers"
                  )}`}
                  to="/dashboard/tickers"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-currency-bitcoin"></i>
                  <span>العملات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/globelpoll"
                  )}`}
                  to="/dashboard/globelpoll"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-boxes"></i>
                  <span>الشركاء</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/plans"
                  )}`}
                  to="/dashboard/plans"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-boxes"></i>
                  <span>الخطط</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/advertisement"
                  )}`}
                  to="/dashboard/advertisement"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-badge-ad-fill"></i>
                  <span>اعلانات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/loges"
                  )}`}
                  to="/dashboard/loges"
                >
                  <i className="bi bi-flag"></i>
                  <span>تقارير البيع والشراء</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/archive"
                  )}`}
                  to="/dashboard/archive"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-file-post-fill"></i>
                  <span>الارشيف</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/telegram"
                  )}`}
                  to="/dashboard/telegram"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-telegram"></i>
                  <span>تليجرام</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/videos"
                  )}`}
                  to="/dashboard/videos"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-film"></i>
                  <span>الفيديو</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/Home">
                  <i className="bi bi-person-badge"></i>
                  <span>صفحة الرئيسية</span>
                </Link>
              </li>
            </>
          ) : state == "admin" ? (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/recommendation"
                  )}`}
                  to="/dashboard/recommendation"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-badge-ad"></i>
                  <span>توصيات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/posts"
                  )}`}
                  to="/dashboard/posts"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-postcard-heart"></i>
                  <span>مقالات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/tickers"
                  )}`}
                  to="/dashboard/tickers"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-currency-bitcoin"></i>
                  <span>العملات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/plans"
                  )}`}
                  to="/dashboard/plans"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-boxes"></i>
                  <span>الخطط</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/Home">
                  <i className="bi bi-person-badge"></i>
                  <span>صفحة الرئيسية</span>
                </Link>
              </li>
            </>
          ) : state == "support" ? (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/users"
                  )}`}
                  to="/dashboard/users"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-people"></i>
                  <span>المستخدمين</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/recommendation"
                  )}`}
                  to="/dashboard/recommendation"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-badge-ad"></i>
                  <span>توصيات</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/plans"
                  )}`}
                  to="/dashboard/plans"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-boxes"></i>
                  <span>الخطط</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isCurrentLinkActive(
                    "/dashboard/notifications"
                  )}`}
                  to="/dashboard/notifications"
                  onClick={(e) => sidekick(e)}
                >
                  <i className="bi bi-bell"></i>
                  <span>الاشعارات</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/Home">
                  <i className="bi bi-person-badge"></i>
                  <span>صفحة الرئيسية</span>
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </aside>
    </>
  );
}
