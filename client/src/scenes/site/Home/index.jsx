import React from "react";

import { SITE_DIR_URI } from "./../../../constants/siteConstants";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../../constants/routeConstant";
import RecentJobPosts from "./RecentJobPosts";

const index = () => {

  return (
    <>
      <div className="hero-banner-six position-relative pt-170 lg-pt-150 pb-60 lg-pb-40">
        <div className="container">
          <div className="position-relative">
            <div className="row">
              <div className="col-xxl-8 col-xl-9 col-lg-8 m-auto text-center">
                <h1>Find & Hire Experts for any Job.</h1>
                <p className="text-md text-white mt-25 mb-55 lg-mb-40">
                  Unlock your potential with quality job & earn from world
                  leading brands.
                </p>
              </div>
            </div>
            <div className="position-relative">
              <div className="row">
                <div className="col-xl-8 col-lg-9 m-auto">
                  <div className="job-search-one style-two position-relative me-xxl-3 ms-xxl-3 mb-100 lg-mb-50">
                    <form action="#">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="input-box">
                            <div className="label">
                              Your job title, keyword or company?
                            </div>
                            <input
                              type="text"
                              placeholder="Google"
                              className="keyword"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="input-box border-left">
                            <div className="label">Category</div>
                            <select className="nice-select lg">
                              <option value="1">Web Design</option>
                              <option value="2">Design & Creative</option>
                              <option value="3">It & Development</option>
                              <option value="4">Web & Mobile Dev</option>
                              <option value="5">Writing</option>
                              <option value="6">Sales & Marketing</option>
                              <option value="7">Music & Audio</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <button className="fw-500 text-md h-100 w-100 tran3s search-btn-two">
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-8 m-auto">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="counter-block-two mt-15 text-center wow fadeInUp">
                        <div className="main-count fw-500 text-white">
                          <span className="counter">30</span>k+
                        </div>
                        <p className="text-white">Wordlwide Client</p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div
                        className="counter-block-two mt-15 text-center wow fadeInUp"
                        data-wow-delay="0.2s"
                      >
                        <div className="main-count fw-500 text-white">
                          <span className="counter">3</span>%
                        </div>
                        <p className="text-white">Top Talents</p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div
                        className="counter-block-two mt-15 text-center wow fadeInUp"
                        data-wow-delay="0.35s"
                      >
                        <div className="main-count fw-500 text-white">
                          <span className="counter">12</span>mil
                        </div>
                        <p className="text-white">Dollar Payout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="banner-six-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner w-100 h-100">
            <div
              className="carousel-item active"
              style={{
                backgroundImage: `url(${SITE_DIR_URI}images/assets/02.jpg)`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="partner-logos bg-color border-0 pt-45 pb-45 ps-3 pe-3">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className="partner-slider"
        >
          <SwiperSlide>
            <div className="item">
              <div className="logo d-flex align-items-center">
                <img src={`${SITE_DIR_URI}images/214440.gif`} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <div className="logo d-flex align-items-center">
                <img src={`${SITE_DIR_URI}images/315118.gif`} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <div className="logo d-flex align-items-center">
                <img src={`${SITE_DIR_URI}images/42932.gif`} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <div className="logo d-flex align-items-center">
                <img src={`${SITE_DIR_URI}images/2436002.gif`} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <div className="logo d-flex align-items-center">
                <img src={`${SITE_DIR_URI}images/29798.gif`} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <div className="logo d-flex align-items-center">
                <img src={`${SITE_DIR_URI}images/9558.gif`} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <div className="logo d-flex align-items-center">
                <img src={`${SITE_DIR_URI}images/5239022.gif`} alt="" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <section className="category-section-five position-relative mt-85 md-mt-60">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-8">
              <div className="title-four text-center text-lg-start">
                <h2>Popular Categories</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex justify-content-lg-end">
                <a
                  href="job-grid-v3"
                  className="btn-six dark d-none d-lg-inline-block"
                >
                  Explore all fields
                </a>
              </div>
            </div>
          </div>
          <div className="card-wrapper d-flex flex-wrap justify-content-center justify-content-lg-between pt-50 lg-pt-30">
            <div className="card-style-seven text-center mt-15 wow fadeInUp">
              <a
                to="#"
                className="wrapper d-flex align-items-center"
                style={{ background: "#EAFBFD" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src={`${SITE_DIR_URI}images/icon/icon_31.svg`}
                    alt=""
                    className="lazy-img"
                  />
                </div>
                <div className="title fw-500">UI/UX Design</div>
              </a>
            </div>
            <div
              className="card-style-seven text-center mt-15 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <a
                to="#"
                className="wrapper d-flex align-items-center"
                style={{ background: "#FFFAEC" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src={`${SITE_DIR_URI}images/icon/icon_32.svg`}
                    alt=""
                    className="lazy-img"
                  />
                </div>
                <div className="title fw-500">Development</div>
              </a>
            </div>
            <div
              className="card-style-seven text-center mt-15 wow fadeInUp"
              data-wow-delay="0.15s"
            >
              <a
                to="#"
                className="wrapper d-flex align-items-center"
                style={{ background: "#FFEBFB" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src={`${SITE_DIR_URI}images/icon/icon_33.svg`}
                    alt=""
                    className="lazy-img"
                  />
                </div>
                <div className="title fw-500">Marketing</div>
              </a>
            </div>
            <div
              className="card-style-seven text-center mt-15 wow fadeInUp"
              data-wow-delay="0.16s"
            >
              <a
                to="#"
                className="wrapper d-flex align-items-center"
                style={{ background: "#E8F7E9" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src={`${SITE_DIR_URI}images/icon/icon_34.svg`}
                    alt=""
                    className="lazy-img"
                  />
                </div>
                <div className="title fw-500">Telemarketing</div>
              </a>
            </div>
            <div
              className="card-style-seven text-center mt-15 wow fadeInUp"
              data-wow-delay="0.17s"
            >
              <a
                to="#"
                className="wrapper d-flex align-items-center"
                style={{ background: "#F7F5FF" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src={`${SITE_DIR_URI}images/icon/icon_35.svg`}
                    alt=""
                    className="lazy-img"
                  />
                </div>
                <div className="title fw-500">Accounting</div>
              </a>
            </div>
            <div
              className="card-style-seven text-center mt-15 wow fadeInUp"
              data-wow-delay="0.18s"
            >
              <a
                to="#"
                className="wrapper d-flex align-items-center"
                style={{ background: "#FFF3EA" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src={`${SITE_DIR_URI}images/icon/icon_36.svg`}
                    alt=""
                    className="lazy-img"
                  />
                </div>
                <div className="title fw-500">Editing</div>
              </a>
            </div>
          </div>
          <div className="text-center mt-40 d-lg-none">
            <NavLink to="job-grid-v3" className="btn-six dark">
              Explore all fields
            </NavLink>
          </div>
        </div>
      </section>

      <section className="category-section-three pt-140 lg-pt-100">
        <div className="container">
          <div className="position-relative">
            <div className="title-four text-center text-lg-start mb-40 d-flex justify-content-between">
              <h2>Featured Companies</h2>
              <ul className="slick-arrow-one color-two d-flex justify-content-center style-none sm-mt-20">
                <li className="prev_d slick-arrow">
                  <i className="bi bi-arrow-left" />
                </li>
                <li className="next_d slick-arrow">
                  <i className="bi bi-arrow-right" />
                </li>
              </ul>
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={{
                // Add navigation controls
                prevEl: ".prev_d",
                nextEl: ".next_d",
              }}
              modules={[Navigation, Autoplay]}
              className="card-wrapper category-slider-one row"
            >
              <SwiperSlide>
                <div className="item">
                  <div
                    className="card-style-six position-relative"
                    style={{
                      backgroundImage: `url(${SITE_DIR_URI}images/company/1.webp)`,
                    }}
                  >
                    <NavLink
                      to="#"
                      className="w-100 h-100 ps-4 pb-20 d-flex align-items-end"
                    >
                      <div className="title text-white fw-500 text-lg">
                        Arrow Electronics
                      </div>
                    </NavLink>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div
                    className="card-style-six position-relative"
                    style={{
                      backgroundImage: `url(${SITE_DIR_URI}images/company/2.webp)`,
                    }}
                  >
                    <NavLink
                      to="#"
                      className="w-100 h-100 ps-4 pb-20 d-flex align-items-end"
                    >
                      <div className="title text-white fw-500 text-lg">
                        Arvind Limited
                      </div>
                    </NavLink>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div
                    className="card-style-six position-relative"
                    style={{
                      backgroundImage: `url(${SITE_DIR_URI}images/company/3.webp)`,
                    }}
                  >
                    <NavLink
                      to="#"
                      className="w-100 h-100 ps-4 pb-20 d-flex align-items-end"
                    >
                      <div className="title text-white fw-500 text-lg">
                        G R Infraprojects 
                      </div>
                    </NavLink>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div
                    className="card-style-six position-relative"
                    style={{
                      backgroundImage: `url(${SITE_DIR_URI}images/company/4.webp)`,
                    }}
                  >
                    <NavLink
                      to="#"
                      className="w-100 h-100 ps-4 pb-20 d-flex align-items-end"
                    >
                      <div className="title text-white fw-500 text-lg">
                        Lucknow Healthcity 
                      </div>
                    </NavLink>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div
                    className="card-style-six position-relative"
                    style={{
                      backgroundImage: `url(${SITE_DIR_URI}images/company/5.webp)`,
                    }}
                  >
                    <NavLink
                      to="#"
                      className="w-100 h-100 ps-4 pb-20 d-flex align-items-end"
                    >
                      <div className="title text-white fw-500 text-lg">
                      Brane Enterprises
                      </div>
                    </NavLink>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            {/* /.card-wrapper */}
          </div>
        </div>
      </section>

      <RecentJobPosts />

      <section className="fancy-banner-three mt-150 lg-mt-100">
        <div className="bg-wrapper pt-85 lg-pt-50 pb-80 lg-pb-50 position-relative wow fadeInUp">
          <div className="container">
            <div className="row">
              <div className="col-xxl-5 col-xl-6 col-lg-6 ms-auto">
                <div className="text-wrapper p0 mb-50 md-mb-20 wow fadeInRight">
                  <div className="title-one mt-25 mb-25 lg-mb-20">
                    <h2 className="text-white main-font">
                      Let’s get started It’s{" "}
                      <span style={{ color: "#00BF58" }}>simple.</span>
                    </h2>
                  </div>
                  <p className="text-white text-md">
                    Give yourself the power of responsibility. Remind yourself
                    the only thing stopping you is yourself.
                  </p>
                </div>
              </div>
            </div>

            <div className="row gx-xl-5 justify-content-between">
              <div className="col-lg-4 d-flex">
                <div className="card-style-nine w-100 d-flex mt-20 wow fadeInUp">
                  <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                    <img
                      src={`${SITE_DIR_URI}images/icon/icon_37.svg`}
                      alt=""
                      className="lazy-img"
                    />
                  </div>
                  <div className="ps-4 text d-flex flex-column">
                    <div className="text-lg mb-10">
                      It’s take 2 minutes to open an account.
                    </div>
                    <span className="fw-500 text-uppercase">
                      Create Account
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex">
                <div
                  className="card-style-nine w-100 d-flex mt-20 wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                    <img
                      src={`${SITE_DIR_URI}images/icon/icon_38.svg`}
                      alt=""
                      className="lazy-img"
                    />
                  </div>
                  <div className="ps-4 text d-flex flex-column">
                    <div className="text-lg mb-10">
                      Put your CV in front of great employers.
                    </div>
                    <span className="fw-500 text-uppercase">
                      Find Your Vacancy
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex">
                <div
                  className="card-style-nine w-100 d-flex mt-20 wow fadeInUp"
                  data-wow-delay="0.35s"
                >
                  <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                    <img
                      src={`${SITE_DIR_URI}images/icon/icon_39.svg`}
                      alt=""
                      className="lazy-img"
                    />
                  </div>
                  <div className="ps-4 text d-flex flex-column">
                    <div className="text-lg mb-10">
                      Your next career move starts here.
                    </div>
                    <span href="#" className="fw-500 text-uppercase">
                      Get A Job
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="wow fadeInLeft">
                <div className="title-two">
                  <div className="sub-title">Why choose us?</div>
                  <h2 className="main-font color-blue">
                    World of talent at your fingertips
                  </h2>
                </div>
                <div
                  className="accordion accordion-style-one color-two mt-40"
                  id="accordionOne"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        Seamless Search
                      </button>
                    </div>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionOne"
                    >
                      <div className="accordion-body">
                        <p>
                          It only takes 5 minutes. Set-up is smooth and simple,
                          with fully customisable page design to reflect your
                          brand.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Hire top talents
                      </button>
                    </div>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionOne"
                    >
                      <div className="accordion-body">
                        <p>
                          It only takes 5 minutes. Set-up is smooth and simple,
                          with fully customisable page design to reflect your
                          brand.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Protected payments, every time
                      </button>
                    </div>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionOne"
                    >
                      <div className="accordion-body">
                        <p>
                          It only takes 5 minutes. Set-up is smooth and simple,
                          with fully customisable page design to reflect your
                          brand.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* /.accordion-style-one */}
                <NavLink
                  to={APP_ROUTES.About}
                  className="btn-five mt-45 lg-mt-20"
                >
                  Learn More
                </NavLink>
              </div>
            </div>
            <div className="col-lg-6 col-md-11 ms-auto me-auto me-lg-0">
              <div className="img-data position-relative md-mt-50">
                <div className="row">
                  <div className="col-md-6 col-sm-8 col-10">
                    <img
                      src={`${SITE_DIR_URI}images/assets/321x197.webp`}
                      alt=""
                      className="lazy-img img01"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-5">
                    <img
                      src={`${SITE_DIR_URI}images/assets/195x175.webp`}
                      alt=""
                      className="lazy-img img02 mt-35"
                    />
                  </div>
                  <div className="col-md-6 col-7">
                    <img
                      src={`${SITE_DIR_URI}images/assets/296x323.webp`}
                      alt=""
                      className="lazy-img img01 mt-35"
                    />
                  </div>
                </div>
                <img
                  src={`${SITE_DIR_URI}images/assets/screen_01.png`}
                  alt=""
                  className="lazy-img shapes screen01 wow fadeInRight"
                />
                <img
                  src={`${SITE_DIR_URI}images/assets/screen_02.png`}
                  alt=""
                  className="lazy-img shapes screen02 wow fadeInUp"
                />
                <img
                  src={`${SITE_DIR_URI}images/assets/418x250.webp`}
                  alt=""
                  className="lazy-img shapes screen03 wow fadeInUp"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feedback-section-five position-relative mt-180 xl-mt-150 pt-90 md-pt-60 pb-130 xl-pb-100 md-pb-70">
        <div className="container">
          <div className="position-relative">
            <div className="row">
              <div className="col-md-6">
                <div className="title-one mb-55 lg-mb-40">
                  <h2 className="main-font text-white">
                    What’s our clients Think of us?
                  </h2>
                </div>
              </div>
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={{
                // Add navigation controls
                prevEl: ".prev_b",
                nextEl: ".next_b",
              }}
              modules={[Navigation, Autoplay]}
              className="row feedback-slider-one"
            >
              <SwiperSlide>
                <div className="item">
                  <div className="feedback-block-three position-relative">
                    <img
                      src="images/icon/icon_41.svg"
                      alt=""
                      className="quote-icon"
                    />
                    <div className="review fw-500">Impressive!</div>
                    <ul className="style-none d-flex rating">
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                    </ul>
                    <blockquote className="mt-50 lg-mt-20 mb-15 lg-mb-10 text-dark">
                      Amazing theme, I'm using it for our internal process &amp;
                      procedures, and it's working very well.
                    </blockquote>
                    <div className="block-footer d-flex align-items-center justify-content-between pt-35 lg-pt-10">
                      <div className="d-flex align-items-center">
                        <div className="name fw-500 text-dark">Rashed Ka,</div>
                        <span className="opacity-50 ps-1">Dhaka</span>
                      </div>
                      <img
                        src={`${SITE_DIR_URI}images/avatar_01.webp`}
                        alt=""
                        className="author-img rounded-circle"
                      />
                    </div>
                  </div>
                  {/* /.feedback-block-three */}
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div className="feedback-block-three position-relative">
                    <img
                      src="images/icon/icon_41.svg"
                      alt=""
                      className="quote-icon"
                    />
                    <div className="review fw-500">Great work!!</div>
                    <ul className="style-none d-flex rating">
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                    </ul>
                    <blockquote className="mt-50 lg-mt-20 mb-15 lg-mb-10 text-dark">
                      Great service, highly recommend. Friendly staff and
                      excellent quality products. Will definitely be returning!
                    </blockquote>
                    <div className="block-footer d-flex align-items-center justify-content-between pt-35 lg-pt-10">
                      <div className="d-flex align-items-center">
                        <div className="name fw-500 text-dark">
                          Zubayer Al Hasan,
                        </div>
                        <span className="opacity-50 ps-1">USA</span>
                      </div>
                      <img
                        src={`${SITE_DIR_URI}images/avatar_03.webp`}
                        alt=""
                        className="author-img rounded-circle"
                      />
                    </div>
                  </div>
                  {/* /.feedback-block-three */}
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item">
                  <div className="feedback-block-three position-relative">
                    <img
                      src="images/icon/icon_41.svg"
                      alt=""
                      className="quote-icon"
                    />
                    <div className="review fw-500">Impressive!</div>
                    <ul className="style-none d-flex rating">
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="bi bi-star-fill" />
                        </NavLink>
                      </li>
                    </ul>
                    <blockquote className="mt-50 lg-mt-20 mb-15 lg-mb-10 text-dark">
                      Absolutely amazing! The service was impeccable, and the
                      products exceeded my expectations. I'll be back!
                    </blockquote>
                    <div className="block-footer d-flex align-items-center justify-content-between pt-35 lg-pt-10">
                      <div className="d-flex align-items-center">
                        <div className="name fw-500 text-dark">Rashed Ka,</div>
                        <span className="opacity-50 ps-1">Dhaka</span>
                      </div>
                      <img
                        src={`${SITE_DIR_URI}images/avatar_01.webp`}
                        alt=""
                        className="author-img rounded-circle"
                      />
                    </div>
                  </div>
                  {/* /.feedback-block-three */}
                </div>
              </SwiperSlide>
            </Swiper>
            <ul className="slider-arrows slick-arrow-one color-two d-flex justify-content-center style-none sm-mt-30">
              <li className="prev_b slick-arrow text-white">
                <i className="bi bi-arrow-left" />
              </li>
              <li className="next_b slick-arrow text-white">
                <i className="bi bi-arrow-right" />
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="blog-section-one mt-160 xl-mt-150 lg-mt-100 pb-180 xl-pb-150 lg-pb-120">
        <div className="container">
          <div className="position-relative">
            <div className="row">
              <div className="col-xl-7">
                <div className="title-one mb-30 lg-mb-10">
                  <h2 className="main-font color-blue">Batter Jobs Guide</h2>
                </div>
              </div>
            </div>
            <div className="row gx-xxl-5">
              <div className="col-lg-4 col-md-6">
                <article className="blog-meta-one mt-35 xs-mt-20 wow fadeInUp">
                  <figure className="post-img m0">
                    <NavLink to="blog-details" className="w-100 d-block">
                      <img
                        src={`${SITE_DIR_URI}images/blog/01.jpg`}
                        alt=""
                        className="lazy-img w-100 tran4s"
                      />
                    </NavLink>
                  </figure>
                  <div className="post-data mt-30 lg-mt-20">
                    <div>
                      <NavLink to="blog-details" className="date">
                        23 Apr, 2024
                      </NavLink>
                    </div>
                    <NavLink to="blog-details" className="mt-10 mb-5">
                      <h4 className="tran3s blog-title">
                        How women can push for pay equality
                      </h4>
                    </NavLink>
                    <p className="mb-20">
                      If success is a process with a number of defined steps,
                      then it is just like…
                    </p>
                    <NavLink to="blog-details" className="read-more">
                      <img
                        src={`${SITE_DIR_URI}images/icon/icon_42.svg`}
                        alt=""
                        className="lazy-img"
                      />
                    </NavLink>
                  </div>
                </article>
                {/* /.blog-meta-one */}
              </div>
              <div className="col-lg-4 col-md-6">
                <article
                  className="blog-meta-one mt-35 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <figure className="post-img m0">
                    <NavLink to="blog-details" className="w-100 d-block">
                      <img
                        src={`${SITE_DIR_URI}images/blog/02.jpg`}
                        alt=""
                        className="lazy-img w-100 tran4s"
                      />
                    </NavLink>
                  </figure>
                  <div className="post-data mt-30 lg-mt-20">
                    <div>
                      <NavLink to="blog-details" className="date">
                        14 March, 2024
                      </NavLink>
                    </div>
                    <NavLink to="blog-details" className="mt-10 mb-5">
                      <h4 className="tran3s blog-title">
                        How to sell yourself in a job interview
                      </h4>
                    </NavLink>
                    <p className="mb-20">
                      Having clarity of purpose and a clear picture of what you
                      desire, is probably the single...
                    </p>
                    <NavLink to="blog-details" className="read-more">
                      <img
                        src={`${SITE_DIR_URI}images/icon/icon_42.svg`}
                        alt=""
                        className="lazy-img"
                      />
                    </NavLink>
                  </div>
                </article>
                {/* /.blog-meta-one */}
              </div>
              <div className="col-lg-4 d-none d-lg-block">
                <article
                  className="blog-meta-one mt-35 wow fadeInUp"
                  data-wow-delay="0.19s"
                >
                  <figure className="post-img m0">
                    <NavLink to="blog-details" className="w-100 d-block">
                      <img
                        src={`${SITE_DIR_URI}images/blog/03.jpg`}
                        alt=""
                        className="lazy-img w-100 tran4s"
                      />
                    </NavLink>
                  </figure>
                  <div className="post-data mt-30 lg-mt-20">
                    <div>
                      <NavLink to="blog-details" className="date">
                        07 Mar, 2024
                      </NavLink>
                    </div>
                    <NavLink to="blog-details" className="mt-10 mb-5">
                      <h4 className="tran3s blog-title">
                        Job interview tips for older workers
                      </h4>
                    </NavLink>
                    <p className="mb-20">
                      There are a million distractions in every facet of our
                      lives...
                    </p>
                    <NavLink to="blog-details" className="read-more">
                      <img
                        src={`${SITE_DIR_URI}images/icon/icon_42.svg`}
                        alt=""
                        className="lazy-img"
                      />
                    </NavLink>
                  </div>
                </article>
                {/* /.blog-meta-one */}
              </div>
            </div>
            <div className="text-center explore-btn sm-mt-50">
              <NavLink to="blog-v1" className="btn-six">
                Explore More
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
