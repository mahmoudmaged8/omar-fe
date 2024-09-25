import Aos from 'aos';
import { useInView } from 'react-intersection-observer';
import { Link, Navigate } from 'react-router-dom';
import { UserStateContext } from '../contexts/ContextProvider';

export const HeaderLanding = () => {
    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "/";
      };
      const { inView: isVisible } = useInView();
      Aos.init();
      const { currentUser, userToken } = UserStateContext();
      if (!userToken) {
        return <Navigate to="/home" />;
      }
  return (
    <header
    id="header"
    className={`${
      isVisible
        ? " fixed-top  header-transparent"
        : "fixed-top  header-transparent header-scrolled"
    }`}
  >
    <div className="container d-flex align-items-center justify-content-between">
      <div className="logo">
          {/* <a href="#hero">Home</a> */}
          <img src={currentUser.imageUrl} alt="logo" />
        {/* <!-- Uncomment below if you prefer to use an image logo --> */}
      </div>

      <nav id="navbar" className="navbar">
        <ul>
          <li>
            <Link className="nav-link scrollto active" to="/Home#hero">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link scrollto" to="/Home#features">
              App Features
            </Link>
          </li>
          <li>
            <Link className="nav-link scrollto" to="/Home#gallery">
              Gallery
            </Link>
          </li>
          <li>
            <Link className="nav-link scrollto" to="/Home#testimonials">
              testimonials
            </Link>
          </li>
          <li>
            <Link className="nav-link scrollto" to="/Home#pricing">
              Pricing
            </Link>
          </li>
          <li>
            <Link className="nav-link scrollto" to="/Home#contact">
              Contact
            </Link>
          </li>
          <li className="dropdown">
            <a href="#">
              <span>{currentUser.name}</span>{" "}
              <i className="bi bi-chevron-down"></i>
            </a>
            <ul>
              <li>
                <a href="#">{currentUser.email}</a>
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
            <Link className="nav-link scrollto" to="/">
              Advice
            </Link>
          </li>
          <a
            href="#"
            onClick={(e) => logout(e)}
            className={"block px-4 py-2 text-sm text-gray-700"}
          >
            Sign out
          </a>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>
  )
}
