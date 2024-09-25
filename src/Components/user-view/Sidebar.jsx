import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClientFront";
import { UserStateContext } from "../../contexts/ContextProvider";

export default function Sidebar() {
  const { currentUser } = UserStateContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState([]);

  useEffect(() => {
    fetchPusher()
    if (!state) {
      localStorage.clear();
      window.location.href = "/home";
    }  })
  const fetchPusher = async () => {
    try {
      const response = await axiosClient.post("me");
      setState(response.data.user.state);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 404") {
        setErrorMessage(`قريبأ ستعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
      } 
    } 
  };
  const logout2 = (e) => {
    e.preventDefault();
    localStorage.clear();
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  };

  return (
    <>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <div className="col-12 col-lg-4 col-xl-3 order-2 order-lg-1">
        <div className="card mb-3">
          <div className="card-body text-center">
            <img
              src={currentUser.imageUrl}
              alt="Kathy Davis"
              className="img-fluid rounded-circle mb-2"
              width="128"
              height="128"
            />
            <h4 className="card-title mb-0">{currentUser.name}</h4>
            <div className="text-muted mb-2">Front-end Developer</div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-header">
            <div className="card-actions float-left">
              <div className="dropdown show">
                <a href="#" data-toggle="dropdown" data-display="static">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-more-horizontal align-middle"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            <h5 className="card-title mb-0 pt-2">Pages</h5>
          </div>
          <div className="card-body">
            <ul className="list-unstyled mb-0 " >
              <li className="nav-item text-blue-500 hover:text-black my-1 mx-auto">
              <Link className="nav-link" to="/">
              <i className="bi bi-person ml-3"></i>
              <span >Hi {currentUser.name}</span>
            </Link>
              </li>
              <li className="nav-item text-blue-500 hover:text-black my-1">
            <Link className="nav-link collapsed  " to="/Home">
              <i className="bi bi-house ml-3"></i>
              <span className=" text-blue-500 hover:text-black">Home</span>
            </Link>
          </li>
          <li className="nav-item text-blue-500 hover:text-black my-1">
            <Link className="nav-link collapsed " to="/recommendation">
              <i className="bi bi-badge-ad ml-3"></i>
              <span className=" text-blue-500 hover:text-black">Advices</span>
            </Link>
          </li>
          <li className="nav-item text-blue-500 hover:text-black my-1">
            <Link className="nav-link collapsed " to="/Video">
              <i className="bi bi-camera-reels ml-3"></i>
              <span className=" text-blue-500 hover:text-black">Video</span>
            </Link>
          </li>
          {/* <li className="nav-item text-blue-500 hover:text-black my-1">
            <Link className="nav-link collapsed " to="/groups">
              <i className="bi bi-wechat ml-3"></i>
              <span className=" text-blue-500 hover:text-black">Chat</span>
            </Link>
          </li>
          <li className="nav-item text-blue-500 hover:text-black my-1">
            <Link className="nav-link collapsed " to="/">
              <i className="bi bi-person-bounding-box ml-3"></i>
              <span className=" text-blue-500 hover:text-black">Profile</span>
            </Link>
          </li> */}
          {state == 'super_admin'|| state == 'admin' ?
          <li className="nav-item text-blue-500 hover:text-black my-1">
            <Link className="nav-link collapsed " to="/dashboard">
              <i className="bi bi-kanban ml-3"></i>
              <span className=" text-blue-500 hover:text-black">Dashboard</span>
            </Link>
          </li>
          :
          null
} 
          <li className="nav-item text-blue-500 hover:text-black my-1">
          <a className="dropdown-item d-flex align-items-center "
                    onClick={(e) => logout2(e)}
                    href="#"
                  >
                    <i className="bi bi-box-arrow-right ml-3"></i>
                    <span>Sign Out</span></a>
          </li>
            </ul>
          </div>
        </div>
       
      </div>
    </>
  );
}
