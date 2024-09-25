import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserStateContext } from "../../contexts/ContextProvider";

export default function HeaderDashboard() {
  useEffect(() => {
    const toggle =
      document.getElementById("header").parentElement.parentElement
        .parentElement;
    const toggleParent =
      document.getElementById("header").parentElement.parentElement
        .parentElement.parentElement;
    toggle.classList.remove("pop");
    toggleParent.classList.remove("bg-white");
    toggleParent.classList.add("bg-black");
    // console.log(toggle);
  });
  function sidekick() {
    const toggle =
      document.getElementById("header").parentElement.parentElement;
    toggle.classList.toggle("toggle-sidebar");
  }
  const { currentUser } = UserStateContext();
  const logout2 = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/home";
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    // alert("hello");
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <header
        id="header"
        className="header h-max d-flex align-items-center w-100 min-w-max border-b-4 border-gray-800 sticky-top"
      >
        <div className="d-flex align-items-center justify-content-between w-[18.5rem] border-l-4 border-gray-800 bg-black">
          <Link to="/dashboard" className="logo d-flex align-items-center ">
            <img src={currentUser.imageUrl} alt="" />
          </Link>
          <i
            className="bi bi-list toggle-sidebar-btn"
            onClick={(e) => sidekick(e)}
          ></i>
        </div>

        <nav className="header-nav mr-auto ">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item dropdown pe-3">
              <div
                className="nav-link nav-profile d-flex align-items-center pe-0 cursor-pointer"
                // href="#"
                onClick={toggleDropdown}
              >
                <span className="d-none d-md-block dropdown-toggle ps-1">
                  {currentUser.name}
                </span>
                <div className="w-[3px] h-8 ml-1 bg-gray-500"></div>
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center w-8 h-8 bg-gray-500 text-white">
                  {currentUser.name.slice(0, 1).toUpperCase()}
                </div>
              </div>

              {/* Conditionally render the dropdown menu */}
              {isDropdownOpen && (
                <ul className="absolute top-16 right-[-120px] min-w-[50px] list-none bg-zinc-900 rounded divide-y divide-gray-100 shadow text-white px-2">
                  <li className="dropdown-heaader">
                    <h6 className="text-center my-1">welcome {currentUser.name}</h6>
                    <div className="text-center my-2 ">
                      {currentUser.email}
                    </div>
                  </li>
                 
                  <li>
                    <div
                      className="text-center my-4"
                      onClick={(e) => logout2(e)}
                      // href="#"
                    >
                      <span>Sign Out</span>
                      <i className="bi bi-box-arrow-right"></i>
                    </div>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
