import React from "react";
import InnerBanner from "../../../components/InnerBanner";
import { SITE_DIR_URI } from "../../../constants/siteConstants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Index = () => {
  return (
    <>
      <InnerBanner heading="About us" />

      {/* 
		=============================================
			Text Feature Three
		============================================== 
		*/}
      <section className="text-feature-three position-relative pt-100 lg-pt-80 md-pt-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-11 m-auto">
              <div className="row">
                <div className="col-lg-5">
                  <div className="title-one mt-30 md-mb-40">
                    <h2 className="fw-500">
                      We’ve been helping customer globally.
                    </h2>
                  </div>
                </div>
                <div className="col-lg-6 ms-auto">
                  <div className="wow fadeInRight">
                    <div
                      className="accordion accordion-style-one color-two ps-xxl-5 ms-xxl-4"
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
                            Who we are?
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
                              Our founders Dustin Moskovitz and Justin lorem
                              Rosenstein met while leading Engineering teams at
                              Facebook quesi. Lorem ipsum dolor sit, amet
                              consectetur adipisicing elit.
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
                            What’s our goal
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
                              Our founders Dustin Moskovitz and Justin lorem
                              Rosenstein met while leading Engineering teams at
                              Facebook quesi. Lorem ipsum dolor sit, amet
                              consectetur adipisicing elit.
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
                            Our vision
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
                              Our founders Dustin Moskovitz and Justin lorem
                              Rosenstein met while leading Engineering teams at
                              Facebook quesi. Lorem ipsum dolor sit, amet
                              consectetur adipisicing elit.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* /.accordion-style-one */}
                  </div>
                </div>
              </div>
              <div className="video-post d-flex align-items-center justify-content-center mt-100 lg-mt-50 mb-50 lg-mb-30">
                <a
                  className="rounded-circle video-icon tran3s text-center"
                  href="https://www.youtube.com/embed/aXFSJTjVjw0"
                >
                  <i className="bi bi-play" />
                </a>
              </div>
              <div className="border-bottom pb-50 lg-pb-10">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="counter-block-one mt-25 text-center wow fadeInUp">
                      <h2 className="main-count fw-500">
                        <span className="counter">7</span>million
                      </h2>
                      <p>Completed Jobs</p>
                    </div>{" "}
                    {/* /.counter-block-one */}
                  </div>
                  <div className="col-sm-4">
                    <div
                      className="counter-block-one mt-25 text-center wow fadeInUp"
                      data-wow-delay="0.2s"
                    >
                      <h2 className="main-count fw-500">
                        <span className="counter">30</span>k+
                      </h2>
                      <p>Worldwide Client</p>
                    </div>{" "}
                    {/* /.counter-block-one */}
                  </div>
                  <div className="col-sm-4">
                    <div
                      className="counter-block-one mt-25 text-center wow fadeInUp"
                      data-wow-delay="0.35s"
                    >
                      <h2 className="main-count fw-500">
                        <span className="counter">13</span>billion
                      </h2>
                      <p>Dollar Payout</p>
                    </div>{" "}
                    {/* /.counter-block-one */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /.text-feature-three */}
      {/* 
		=============================================
			Text Feature One
		============================================== 
		*/}
      <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80 pb-180 xl-pb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 order-lg-last">
              <div className="ps-xxl-4 wow fadeInRight">
                <div className="title-one">
                  <h2>Get over 50.000+ talented experts in jobi.</h2>
                </div>
                <p className="mt-40 md-mt-20 mb-40 md-mb-20">
                  A full hybrid workforce management tools are yours to use, as
                  well as access to our top 1% of talent.{" "}
                </p>
                <ul className="list-style-one style-none">
                  <li>Seamless searching</li>
                  <li>Get top 3% experts for your project</li>
                  <li>Protected payments system</li>
                </ul>
                <a href="signup.html" className="btn-one lg mt-50 md-mt-30">
                  Post a Job
                </a>
              </div>
            </div>
            <div className="col-lg-7 col-md-11 m-auto order-lg-first">
              <div className="img-data position-relative pe-xl-5 me-xl-5 md-mt-50">
                <div className="row">
                  <div className="col-md-6 col-sm-8 col-10">
                    <img
                      src={`${SITE_DIR_URI}images/assets/img_02.jpg`}
                      alt=""
                      className="lazy-img img01"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-5">
                    <img
                      src={`${SITE_DIR_URI}images/assets/img_03.jpg`}
                      alt=""
                      className="lazy-img img02 mt-35"
                    />
                  </div>
                  <div className="col-md-6 col-7">
                    <img
                      src={`${SITE_DIR_URI}images/assets/img_04.jpg`}
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
                  src={`${SITE_DIR_URI}images/assets/screen_03.png`}
                  alt=""
                  className="lazy-img shapes screen03 wow fadeInUp"
                />
                <img
                  src={`${SITE_DIR_URI}images/shape/shape_06.svg`}
                  alt=""
                  className="lazy-img shapes shape_01"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /.text-feature-one */}
      {/*
		=====================================================
			How It Works
		=====================================================
		*/}
      <section className="how-it-works position-relative bg-color pt-110 lg-pt-80 pb-110 lg-pb-70">
        <div className="container">
          <div className="title-one text-center mb-65 lg-mb-40">
            <h2 className="text-white">
              How it’s{" "}
              <span className="position-relative">
                work?{" "}
                <img
                  src={`${SITE_DIR_URI}images/shape/shape_07.svg`}
                  alt=""
                  className="lazy-img shapes shape"
                />
              </span>
            </h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-3 col-lg-4 col-md-6">
              <div className="card-style-two text-center mt-25 wow fadeInUp">
                <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                  <img
                    src={`${SITE_DIR_URI}images/icon/icon_08.svg`}
                    alt=""
                    className="lazy-img"
                  />
                </div>
                <div className="title fw-500 text-white">Create Account</div>
                <p>It’s very easy to open an account and start your journey.</p>
              </div>
              {/* /.card-style-two */}
            </div>
            <div className="col-xxl-3 col-lg-4 col-md-6 m-auto">
              <div
                className="card-style-two text-center position-relative arrow mt-25 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                  <img
                    src={`${SITE_DIR_URI}images/icon/icon_09.svg`}
                    alt=""
                    className="lazy-img"
                  />
                </div>
                <div className="title fw-500 text-white">
                  Complete your profile
                </div>
                <p>
                  Complete your profile with all the info to get attention of
                  client.
                </p>
              </div>
              {/* /.card-style-two */}
            </div>
            <div className="col-xxl-3 col-lg-4 col-md-6">
              <div
                className="card-style-two text-center mt-25 wow fadeInUp"
                data-wow-delay="0.19s"
              >
                <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                  <img
                    src={`${SITE_DIR_URI}images/icon/icon_10.svg`}
                    alt=""
                    className="lazy-img"
                  />
                </div>
                <div className="title fw-500 text-white">Apply job or hire</div>
                <p>
                  Apply &amp; get your preferable jobs with all the requirements
                  and get it.
                </p>
              </div>
              {/* /.card-style-two */}
            </div>
          </div>
        </div>
        <img
          src={`${SITE_DIR_URI}images/shape/shape_08.svg`}
          alt=""
          className="lazy-img shapes shape_01"
        />
        <img
          src={`${SITE_DIR_URI}images/shape/shape_09.svg`}
          alt=""
          className="lazy-img shapes shape_02"
        />
      </section>
      {/* /.how-it-works */}
      {/*
		=====================================================
			FeedBack Section One
		=====================================================
		*/}
      <section className="feedback-section-one pt-180 xl-pt-150 lg-pt-100 pb-80 lg-pb-20">
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div className="title-one text-center text-md-start mb-65 md-mb-50">
                <h2>Trusted by leading startups.</h2>
              </div>
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={70}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            navigation={{
              // Add navigation controls
              prevEl: ".prev_b",
              nextEl: ".next_b",
            }}
            loop={true}
            modules={[Autoplay]}
            className="feedback-slider-one"
          >
            <SwiperSlide className="item">
              <div className="feedback-block-one">
                <div className="logo">
                  <img src="images/logo/media_01.png" alt="" />
                </div>
                <blockquote className="fw-500 mt-50 md-mt-30 mb-50 md-mb-30">
                  “Seattle opera simplifies Performance planning with jobi
                  eSignature.”
                </blockquote>
                <div className="name text-dark">
                  <span className="fw-500">Rashed kabir,</span> Lead Designer
                </div>
                <div className="review pt-40 md-pt-20 mt-40 md-mt-30 d-flex justify-content-between align-items-center">
                  <div className="text-md fw-500 text-dark">4.5 Excellent</div>
                  <ul className="style-none d-flex">
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /.feedback-block-one */}
            </SwiperSlide>
            <SwiperSlide className="item">
              <div className="feedback-block-one">
                <div className="logo">
                  <img src="images/logo/media_02.png" alt="" />
                </div>
                <blockquote className="fw-500 mt-50 md-mt-30 mb-50 md-mb-30">
                  “How DocuSign CLM helps Celonis scale its global business.”
                </blockquote>
                <div className="name text-dark">
                  <span className="fw-500">Mark Joge,</span> Marketing Chief
                </div>
                <div className="review pt-40 md-pt-20 mt-40 md-mt-30 d-flex justify-content-between align-items-center">
                  <div className="text-md fw-500 text-dark">4.8 Awesome</div>
                  <ul className="style-none d-flex">
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /.feedback-block-one */}
            </SwiperSlide>
            <SwiperSlide className="item">
              <div className="feedback-block-one">
                <div className="logo">
                  <img src="images/logo/media_01.png" alt="" />
                </div>
                <blockquote className="fw-500 mt-50 md-mt-30 mb-50 md-mb-30">
                  “Seattle opera simplifies Performance planning with jobi
                  eSignature.”
                </blockquote>
                <div className="name text-dark">
                  <span className="fw-500">Rashed kabir,</span> Lead Designer
                </div>
                <div className="review pt-40 md-pt-20 mt-40 md-mt-30 d-flex justify-content-between align-items-center">
                  <div className="text-md fw-500 text-dark">4.5 Excellent</div>
                  <ul className="style-none d-flex">
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /.feedback-block-one */}
            </SwiperSlide>
          </Swiper>
          <ul className="slider-arrows slick-arrow-one d-flex justify-content-center style-none sm-mt-30">
            <li className="prev_b slick-arrow">
              <i className="bi bi-arrow-left" />
            </li>
            <li className="next_b slick-arrow">
              <i className="bi bi-arrow-right" />
            </li>
          </ul>
          <div className="partner-logos border-0 pt-150 xl-pt-120 md-pt-80 sm-pt-40 pb-80 md-pb-40">
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
          {/* /.partner-logos */}
        </div>
      </section>
      {/* /.feedback-section-one */}
    </>
  );
};

export default Index;
