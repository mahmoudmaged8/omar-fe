/* eslint-disable react/jsx-key */
// import React from 'react'
import { useEffect, useState } from "react";
import { A11y, Autoplay, FreeMode, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import details1 from "../assets/img/details-1.png";
import details2 from "../assets/img/details-2.png";
import details3 from "../assets/img/details-3.png";
import details4 from "../assets/img/details-4.png";
import features from "../assets/img/features.png";
import gallery1 from "../assets/img/gallery/gallery-1.jpg";
import gallery10 from "../assets/img/gallery/gallery-10.jpg";
import gallery11 from "../assets/img/gallery/gallery-11.jpeg";
import gallery12 from "../assets/img/gallery/gallery-12.jpg";
import gallery2 from "../assets/img/gallery/gallery-2.jpg";
import gallery3 from "../assets/img/gallery/gallery-3.jpg";
import gallery4 from "../assets/img/gallery/gallery-4.jpg";
import gallery5 from "../assets/img/gallery/gallery-5.jpg";
import gallery6 from "../assets/img/gallery/gallery-6.jpg";
import gallery7 from "../assets/img/gallery/gallery-7.jpg";
import gallery8 from "../assets/img/gallery/gallery-8.jpg";
import gallery9 from "../assets/img/gallery/gallery-9.jpg";
import axiosClient from "../axiosClientFront";
import { UserStateContext } from "../contexts/ContextProvider";

export default function Home() {
  const [plans, setPlans] = useState([]);
  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get("plans");
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlans();
    const toggleParent =document.getElementById("main").parentElement.parentElement.parentElement;
    // console.log(toggleParent);
    toggleParent.classList.remove("bg-black");
    toggleParent.classList.add("bg-white");
  }, []);
  const handleClick = async () => {
    window.location.href = "https://play.google.com/store/apps/details?id=com.upvela.upvela";
    // try {
    //   const post = {
    //     plan_id: planId,
    //     user_id: localStorage.getItem("user_id"),
    //   };

    //   const response = await axiosClient.post("orderpay", post);
    //   if (response.data.success) {
        
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };
  const { userToken,currentUser } = UserStateContext();
  console.log(currentUser);
  return (
    <main id="main">
      {/* <!-- ======= App Features Section ======= --> */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-title">
            <h2>مميزات التطبيق</h2>
          
          </div>

          <div className="row no-gutters">
            <div className="col-xl-7 d-flex align-items-stretch order-2 order-lg-1">
              <div className="content d-flex flex-column justify-content-center">
                <div className="row">
                  <div className="col-md-6 icon-box" data-aos="fade-up">
                    <i className="bx bx-receipt"></i>
                    <h4>توصيات ناجحة</h4>
                    <p>
                      نقدم توصيات دقيقة وموثوقة تمنح المتداولين القدرة على اتخاذ
                      قراراتهم بثقة، مما يبقيك في صدارة عالم العملات المشفرة.
                    </p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="bx bx-cube-alt"></i>
                    <h4>فيديوهات تعليمية</h4>
                    <p>
                      نؤمن بأهمبة تزويد مستخدمينا بالمعرفة، وتقدم كنزًا من
                      الموارد التعليمية ، من أدلة التداول إلى الدروس المفيدة ،
                      لمساعدتك على تحسين مهاراتك في التداول واتخاذ قرارات
                      مستنيرة.
                    </p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i className="bx bx-images"></i>
                    <h4>تحليل الخبراء</h4>
                    <p>
                      يعمل فريقنا من الخبراء على فحص اتجاهات السوق والرسوم
                      البيانية والبيانات على مدار الساعة، مما يمكّنك من التداول
                      بدقة وذكاء.
                    </p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i className="bx bx-shield"></i>
                    <h4>تحديثات في الوقت الفعلي</h4>
                    <p>
                      عالم العملات المشفرة المتغير باستمرار ، فإن التوقيت هو كل
                      شيء ، لن تفوتك أي صفقة. تبقيك تحديثاتنا في الوقت الفعلي
                      على اطلاع دائم ، حتى أثناء تنقلك ، مما يضمن حصولك على أحدث
                      المعلومات لاستغلال الفرص المربحة.
                    </p>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <i className="bx bx-atom"></i>
                    <h4>التسويق بالعمولة</h4>
                    <p>
                      نقدم برنامج يمكنك من كسب مكافآت عن طريق دعوة الأصدقاء
                      والمعارف الآخرين إلى منصتنا. شارك قوة Up Vela واستفد من
                      الفوائد معا
                    </p>
                  </div>
            
                </div>
              </div>
            </div>
            <div
              className="col-xl-5 d-flex align-items-stretch justify-content-center order-1 order-lg-2"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <img src={features} className="img-fluid" alt="features" />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End App Features Section --> */}

      {/* <!-- ======= Details Section ======= --> */}
      <section id="details" className="details">
        <div className="container">
          <div className="row content">
            <div className="col-md-4" data-aos="fade-right">
              <img src={details1} className="img-fluid" alt="details1" />
            </div>
            <div className="col-md-8 pt-4" data-aos="fade-up">
              <h3>ابدأ رحلتك</h3>
              <p className="fst-italic">
                رحلتك مع Up Vela تبدأ بتحميل بسيط. انتقل إلى متجر التطبيقات
                الخاص بك وقم بتثبيت Up Vela على جهازك واستعد لدخول عالم التداول.
              </p>
          
            </div>
          </div>

          <div className="row content">
            <div className="col-md-4 order-1 order-md-2" data-aos="fade-left">
              <img src={details2} className="img-fluid" alt="details2" />
            </div>
            <div
              className="col-md-8 pt-5 order-2 order-md-1"
              data-aos="fade-up"
            >
              <h3>ملفك الشخصي</h3>
              <p className="fst-italic">
                بمجرد التثبيت ، افتح التطبيق وقم بالتسجيل. قم بإعداد ملفك
                الشخصي. وبذلك تكون قمت ببناء بوابتك للدخول في مجتمع Up Vela.
              </p>
        
            </div>
          </div>

          <div className="row content">
            <div className="col-md-4" data-aos="fade-right">
              <img src={details3} className="img-fluid" alt="details3" />
            </div>
            <div className="col-md-8 pt-5" data-aos="fade-up">
              <h3>استلم التوصيات</h3>
              <p>
                يزودك فريقنا من الخبراء بتوصيات دقيقة ، مما يضمن عدم تفويت أي
                فرصة محتملة مربحة، استلم التوصية و نفذها في الوقت الفعلي.
              </p>
            </div>
          </div>

          <div className="row content">
            <div className="col-md-4 order-1 order-md-2" data-aos="fade-left">
              <img src={details4} className="img-fluid" alt="details4" />
            </div>
            <div
              className="col-md-8 pt-5 order-2 order-md-1"
              data-aos="fade-up"
            >
              <h3>تفاعل مع المجتمع</h3>
              <p className="fst-italic ">
                تواصل مع مجتمع متداولين Up Vela، انضم إلى المناقشات وشارك
                الأفكار واحتفل بنجاحاتك.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Details Section --> */}

      {/* <!-- ======= Gallery Section ======= --> */}
      <section id="gallery" className="gallery">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>النتائج</h2>
            {/* <p>
                Magnam dolores commodi suscipit. Necessitatibus eius consequatur
                ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
                quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
                Quia fugiat sit in iste officiis commodi quidem hic quas.
              </p> */}
          </div>
        </div>

        <div className="container-fluid" data-aos="fade-up">
          <Swiper
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              slideShadows: false,
            }}
            spaceBetween={75}
            slidesPerView={5}
            loop
            navigation
            centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, A11y, FreeMode, Autoplay]}
            className="mySwiper"
            // freeMode={true}
            //  pagination={true}  className="mySwiper"
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery1} className="img-fluid" alt="gallery-1" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery2} className="img-fluid" alt="gallery-2" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery3} className="img-fluid" alt="gallery-3" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery4} className="img-fluid" alt="gallery-4" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery5} className="img-fluid" alt="gallery-5" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery6} className="img-fluid" alt="gallery-6" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery7} className="img-fluid" alt="gallery-7" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery8} className="img-fluid" alt="gallery-8" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery9} className="img-fluid" alt="gallery-9" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery10} className="img-fluid" alt="gallery-10" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery11} className="img-fluid" alt="gallery-11" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <a href="#gallery" data-gall="gallery-carousel">
                  <img src={gallery12} className="img-fluid" alt="gallery-12" />
                </a>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="gallery-slider swiper">
            <div className="swiper-wrapper"></div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>
      {/* <!-- End Gallery Section --> */}

      {/* <!-- ======= Testimonials Section ======= --> */}
    
      {/* <!-- End Testimonials Section --> */}

      {/* <!-- ======= Pricing Section ======= --> */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-title">
            <h2>الباقات</h2>
        
          </div>

          <div className="row no-gutters">
            {plans ? (
              plans
                .slice()
                .reverse()
                .map((plan, index) => (
                  <div
                    className="col-lg-3 box"
                    data-aos="fade-right"
                    key={index + 1}
                  >
                    <h3>{plan.name}</h3>
                    <h4>
                      <i> ${plan.discount > 0 ? plan.discount : plan.price}</i>
                      <span>شهريا</span>
                    </h4>
                    {plan.discount > 0 ? (
                      <>
                        <p>
                          <span className="line-through text-red-600">${plan.price}</span>
                          {/* <span>discount</span> */}
                        </p>
                        <div>
                          <h5 >${plan.price - plan.discount}  <span>discount</span></h5>
                          
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}

                    <ul>
                      {plan.plan_desc.map((plan, index) => (
                        <li className="d-flex" key={index + 1}>
                          <i className="bx bx-check" id={index + 1}></i>{" "}
                          {plan.desc}
                        </li>
                      ))}

                      {/* <li className="d-flex">
                     {plan.percentage1 >0?<>
                     <i className="bx bx-check"></i>نسبة من المرحلة 1 {plan.percentage1}%</>
                   : <><i className="bx bx-x"></i> نسبة من المرحلة 1</>
}
                   </li>
                     <li className="d-flex">
                     {plan.percentage2 >0?<>
                     <i className="bx bx-check"></i>نسبة من المرحلة 2 {plan.percentage2}%</>
                   : <><i className="bx bx-x"></i> نسبة من المرحلة 2</>
}
                   </li>
                     <li className="d-flex">
                     {plan.percentage3 >0 ?<>
                     <i className="bx bx-check"></i>نسبة من المرحلة 3 {plan.percentage3}%</>
                   : <><i className="bx bx-x"></i> نسبة من المرحلة 3</>
}
                   </li> */}

                      {/* <li>
                    <i className="bx bx-check"></i> Nec feugiat nisl pretium
                  </li>
                  <li>
                    <i className="bx bx-check"></i> Nulla at volutpat diam
                    uteera
                  </li>
                  <li className="na">
                    <i className="bx bx-x"></i>
                    <span>Pharetra massa massa ultricies</span>
                  </li>
                  <li className="na">
                    <i className="bx bx-x"></i>
                    <span>Massa ultricies mi quis hendrerit</span>
                  </li> */}
                    </ul>
                    <a
                      href={userToken ? "#" : "/login"}
                      onClick={
                        plan.id !== 1 ? () => handleClick(plan.id) : null
                      }
                      style={{ visibility: plan.id !== 1 ? "visible" : "hidden" }}
                      name="id"
                      className="get-started-btn"
                    >
                      Get Started
                    </a>
                  </div>
                ))
            ) : (
              <>
                <div className="col-lg-4 box" data-aos="fade-right">
                  <h3>Free</h3>
                  <h4>
                    $0<span>per month</span>
                  </h4>
                  <ul>
                    <li>
                      <i className="bx bx-check"></i> Quam adipiscing vitae
                      proin
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Nec feugiat nisl pretium
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Nulla at volutpat diam
                      uteera
                    </li>
                    <li className="na">
                      <i className="bx bx-x"></i>
                      <span>Pharetra massa massa ultricies</span>
                    </li>
                    <li className="na">
                      <i className="bx bx-x"></i>
                      <span>Massa ultricies mi quis hendrerit</span>
                    </li>
                  </ul>
                  <a href="#" className="get-started-btn">
                    Get Started
                  </a>
                </div>

                <div className="col-lg-4 box featured" data-aos="fade-up">
                  <h3>Business</h3>
                  <h4>
                    $29<span>per month</span>
                  </h4>
                  <ul>
                    <li>
                      <i className="bx bx-check"></i> Quam adipiscing vitae
                      proin
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Nec feugiat nisl pretium
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Nulla at volutpat diam
                      uteera
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Pharetra massa massa
                      ultricies
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Massa ultricies mi quis
                      hendrerit
                    </li>
                  </ul>
                  <a href="#" className="get-started-btn">
                    Get Started
                  </a>
                </div>

                <div className="col-lg-4 box" data-aos="fade-left">
                  <h3>Developer</h3>
                  <h4>
                    $49<span>per month</span>
                  </h4>
                  <ul>
                    <li>
                      <i className="bx bx-check"></i> Quam adipiscing vitae
                      proin
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Nec feugiat nisl pretium
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Nulla at volutpat diam
                      uteera
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Pharetra massa massa
                      ultricies
                    </li>
                    <li>
                      <i className="bx bx-check"></i> Massa ultricies mi quis
                      hendrerit
                    </li>
                  </ul>
                  <a href="#" className="get-started-btn">
                    Get Started
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      {/* <!-- End Pricing Section --> */}

      {/* <!-- ======= Contact Section ======= --> */}
      {/* <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>التواصل</h2>
            {/* <p>
                Magnam dolores commodi suscipit. Necessitatibus eius consequatur
                ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
                quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
                Quia fugiat sit in iste officiis commodi quidem hic quas.
              </p> 
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6 info">
                  <i className="bx bx-map"></i>
                  <h4>العنوان</h4>
                  <p>
                    50 Intersection Of Rd. 24, El Arab Sq.,
                    <br />
                    معادي السرايات الغربية، قسم المعادي، محافظة القاهرة
                  </p>
                </div>
                <div className="col-lg-6 info">
                  <i className="bx bx-phone"></i>
                  <h4>اتصل بنا</h4>
                  <p style={{ direction: "ltr" }}>+2 012 2365 4789</p>
                </div>
                <div className="col-lg-6 info">
                  <i className="bx bx-envelope"></i>
                  <h4>ارسل لنا</h4>
                  <p>
                    upvila@gmail.com
                    <br />
                    info@upvila.com
                  </p>
                </div>
                <div className="col-lg-6 info">
                  <i className="bx bx-time-five"></i>
                  <h4>اوقات العمل</h4>
                  <p>من الاحد الى الجمعة : 10 صباحا الى 6 مساءا</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                className="php-email-form p-0"
                data-aos="fade-up"
              >
                <div className="form-group col-12">
                  <input
                    placeholder="اسمك"
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    required
                  />
                </div>
                <div className="form-group col-12 mt-3">
                  <input
                    placeholder="ايميلك"
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div className="form-group col-12 mt-3">
                  <input
                    placeholder="العنوان"
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    required
                  />
                </div>
                <div className="form-group col-12 mt-3">
                  <textarea
                    placeholder="الرسالة"
                    className="form-control"
                    name="message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    رسالتك وصلت الينا شكر لتواصلك
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">ارسال</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
      {/* <!-- End Contact Section --> */}
    </main>
  );
}
