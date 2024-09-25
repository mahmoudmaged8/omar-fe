import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.min.css";
import "../assets/css/style.css";
import img1 from "../assets/img/hero-img.png";
import "../assets/js/main";
import axiosClient from "../axiosClientFront";
// import { UserStateContext } from "../contexts/ContextProvider";
import Home from "../view/Home";
import { UserStateContext } from "../contexts/ContextProvider";
export default function UserLayout() {
  const { ref: myRef, inView: isVisible } = useInView();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [state, setState] = useState(null);
  AOS.init();
  const toggleMobileNav = () => {
    setIsMobileNavOpen((prevState) => !prevState); // Toggle the state
  };
  // const {  currentUser } = UserStateContext();
  useEffect(() => {
    fetchPusher();
    // console.log(currentUser);
  });
  const fetchPusher = async () => {
    try {
      const response = await axiosClient.post("me");
      setState(response.data.user.state);
      // console.log(response.data.user.state);
    } catch (err) {
      console.log(`error ${err}`);
      // console.log("error");
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
    window.location.href = "/home";
  };
  const { currentUser } = UserStateContext();
  return (
    <>
      {/* <!-- ======= Header ======= --> */}
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
            {/* <!-- <a href="index.html"><img src="assets/img/New_logo.png" alt="" className="img-fluid"></a>--> */}
          </div>

          <nav
            id="navbar"
            className={`navbar ${isMobileNavOpen ? "navbar-mobile" : ""}`}
          >
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  الصفحة الرئيسية
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#features">
                  المميزات
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#gallery">
                  النتائج
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#pricing">
                  الباقات
                </a>
              </li>

              {state == "super_admin" || state == "admin" || state == "support" ? (
                <li>
                  <Link className="nav-link collapsed " to="/dashboard">
                    {/* <i className="bi bi-kanban ml-3"></i> */}
                    لوحة التحكم
                  </Link>
                </li>
              ) : null}
              {state ? (
                <a
                  href="#"
                  onClick={(e) => logout2(e)}
                  className={"block px-4 py-2 text-sm text-gray-700"}
                >
                  تسجبيل الخروج
                </a>
              ) : (
                <li>
                  <Link className="nav-link scrollto" to="/login">
                    الدخول
                  </Link>
                </li>
              )}
            </ul>
            <i
              className={`bi bi-list mobile-nav-toggle ${
                isMobileNavOpen ? "bi-x" : ""
              }`}
              onClick={toggleMobileNav}
            ></i>
          </nav>
        </div>
      </header>

      {/* <!-- ======= Hero Section ======= --> */}
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
            >
              <div ref={myRef}>
                <h1>
                  أول تطبيق في الشرق الأوسط يقدم خدمات متكاملة في مجال العملات
                  الرقمية
                </h1>
                <h2>
                  نسعى لنكون المرجع الأول والأخير في مجال العملات الرقمية بالوطن
                  العربي.
                </h2>
                <a
                  href="https://play.google.com/store/apps/details?id=com.upvela.upvela"
                  className="download-btn"
                  target="blank"
                >
                  <i className="bx bxl-play-store"></i> Google Play
                </a>
                {/* <a href="#" className="download-btn">
                  <i className="bx bxl-apple"></i> App Store
                </a> */}
              </div>
            </div>
            <div
              className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
              data-aos="fade-up"
            >
              <img src={img1} className="img-fluid" alt="hero" />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Hero --> */}

      <Home />

      {/* <!-- ======= Footer ======= --> */}
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row w-100 justify-between">
              <div className="col-lg-3 col-md-6 footer-contact">
                <h4>upvela</h4>
                <p>
                  50 Intersection Of Rd. 24, El Arab Sq.,
                  <br />
                  معادي السرايات الغربية، قسم المعادي، محافظة القاهرة <br />
                  <br />
                  <strong>Phone:</strong> +2 012 2365 4789
                  <br />
                  <strong>Email:</strong> info@upvila.com
                  <br />
                </p>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#hero">الصفحة الرئيسية</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#features">المميزات</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#gallery">النتائج</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#pricing">الباقات</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#">Web Design</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#">Web Development</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#">Product Management</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#">Marketing</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#">Graphic Design</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Social Networks</h4>
                {/* <p>
                Tamed quem nullo quae Legal multo auth snit culpa legal
                  noster magna
                </p> */}
                <div className="social-links mt-3">
                  <a
                    href="https://twitter.com/upvela?s=21&t=V3aj14GZGHUnKlhjD4aw-w"
                    className="twitter"
                    target="blank"
                  >
                    <i className="bx bxl-twitter"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/UpVela"
                    className="facebook"
                    target="blank"
                  >
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/upvela/"
                    className="instagram"
                    target="blank"
                  >
                    <i className="bx bxl-instagram"></i>
                  </a>
                  <a
                    href="https://www.tiktok.com/@upvela?_t=8eRrOGXMktR&_r=1"
                    className="google-plus"
                    target="blank"
                  >
                    <i className="bx bxl-tiktok"></i>
                  </a>
                  <a
                    href="https://www.snapchat.com/add/upvela"
                    className="linkedin"
                    target="blank"
                  >
                    <i className="bx bxl-snapchat"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <img src={currentUser.imageUrl} alt="logo" />
              </div>
            </div>
          </div>
        </div>

        <div className="container py-4">
          <div className="copyright">
            &copy; Copyright
            <strong>
              <span>Upvela</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="#">Upvela</a>
          </div>
        </div>
      </footer>
      {/* <!-- End Footer --> */}

      <a
        href="#"
        className={`${
          isVisible
            ? "back-to-top d-flex align-items-center justify-content-center"
            : "back-to-top d-flex align-items-center justify-content-center active"
        }`}
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}
