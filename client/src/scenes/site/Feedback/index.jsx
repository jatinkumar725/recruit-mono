import React from "react";
import InnerBanner from "../../../components/InnerBanner";

const Index = () => {
  return (
    <>
      <InnerBanner heading="Report a Problem" subTitle="Please fill in the form below and we will revert to the specified email address in 48 hours." />

      <section className="contact-us-section">
        <div className="container">
          <div className="border-bottom pb-150 lg-pb-80">
            <div className="row">
              <div className="col-xl-9 m-auto">
                <div
                  className="form-style-one mt-70 lg-mt-50"
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
                      <div className="col-sm-6">
                        <div className="input-group-meta form-group mb-35">
                          <label htmlFor="">Contact Number*</label>
                          <input
                            type="text"
                            placeholder="Contact Number*"
                            name="mobile"
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="input-group-meta form-group mb-35">
                          <label htmlFor="">Attach Screenshot*</label>
                          <input
                            type="file"
                            name="attachment"
                            className="form-control pt-3"
                            required={true}
                          />
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
                            placeholder="Details of Concern*"
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
