import React from "react";
import InnerBanner from "../../../components/InnerBanner";
import { SITE_DIR_URI } from "../../../constants/siteConstants";

const Index = () => {
  return (
    <>
      <InnerBanner heading="Contact Us" subTitle="Get your answers" />

      <section className="contact-us-section pt-100 lg-pt-80">
        <div className="container">
          <div className="border-bottom pb-150 lg-pb-80">
            <div className="title-one text-center mb-70 lg-mb-40">
              <h2>Get in touch</h2>
            </div>
            <div className="row">
              <div className="col-xl-10 m-auto">
                <div className="row">
                  <div className="col-md-4">
                    <div
                      className="address-block-one text-center mb-40"
                      style={{ visibility: "visible" }}
                    >
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                        <img
                          alt="icon"
                          width={25}
                          height={34}
                          src={`${SITE_DIR_URI}images/icon/icon_57.svg`}
                        />
                      </div>
                      <h5 className="title">Our Address</h5>
                      <p>
                        Bass Hill Plaza Medical Centre <br />
                        Sydney, Australia
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className="address-block-one text-center mb-40 wow fadeInUp"
                      style={{ visibility: "visible" }}
                    >
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                        <img
                          alt="icon"
                          width={30}
                          height={23}
                          src={`${SITE_DIR_URI}images/icon/icon_58.svg`}
                        />
                      </div>
                      <h5 className="title">Contact Info</h5>
                      <p>
                        Open a chat or give us call at <br />
                        <a href="tel:310.841.5500" className="call">
                          310.841.5500
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className="address-block-one text-center mb-40 wow fadeInUp"
                      style={{ visibility: "visible" }}
                    >
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                        <img
                          alt="icon"
                          width={35}
                          height={30}
                          src={`${SITE_DIR_URI}images/icon/icon_59.svg`}
                        />
                      </div>
                      <h5 className="title">Live Support</h5>
                      <p>
                        live chat service <br />
                        <a href="#" className="webaddress">
                          web.batterjobs.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-9 m-auto">
                <div
                  className="form-style-one mt-85 lg-mt-50 wow fadeInUp"
                  style={{ visibility: "visible" }}
                >
                  <form>
                    <div className="messages" />
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="input-group-meta form-group mb-30">
                          <label htmlFor="">Name*</label>
                          <input
                            type="text"
                            placeholder="Your Name*"
                            name="name"
                            required={true}
                          />
                          <div className="help-block with-errors">
                            <div style={{ color: "red" }} />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-group-meta form-group mb-30">
                          <label htmlFor="">Email*</label>
                          <input
                            type="email"
                            placeholder="Email Address*"
                            name="email"
                            required={true}
                          />
                          <div className="help-block with-errors">
                            <div style={{ color: "red" }} />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-group-meta form-group mb-35">
                          <label htmlFor="">Subject</label>
                          <input
                            type="text"
                            placeholder="Write about the subject here.."
                            name="subject"
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-group-meta form-group mb-35">
                          <textarea
                            placeholder="Your message*"
                            name="message"
                            required={true}
                          />
                          <div className="help-block with-errors">
                            <div style={{ color: "red" }} />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn-eleven fw-500 tran3s d-block">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
