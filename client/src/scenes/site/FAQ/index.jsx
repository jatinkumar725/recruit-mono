import React from "react";
import InnerBanner from "../../../components/InnerBanner";
import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../../constants/routeConstant";

const Index = () => {
  return (
    <>
      <InnerBanner heading="Question & Answers" subTitle="Find your answers" />

      <section className="faq-section position-relative pt-100 lg-pt-80">
        <div className="container">
          <ul
            className="nav nav-tabs border-0 justify-content-center"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#fc1"
                role="tab"
                aria-selected="true"
              >
                All
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#fc2"
                role="tab"
                aria-selected="false"
                tabIndex={-1}
              >
                Marketing
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#fc3"
                role="tab"
                aria-selected="false"
                tabIndex={-1}
              >
                Buying
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#fc4"
                role="tab"
                aria-selected="false"
                tabIndex={-1}
              >
                User Manual
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#fc5"
                role="tab"
                aria-selected="false"
                tabIndex={-1}
              >
                Payments
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#fc6"
                role="tab"
                aria-selected="false"
                tabIndex={-1}
              >
                {" "}
                Terms &amp; Conditions
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#fc7"
                role="tab"
                aria-selected="false"
                tabIndex={-1}
              >
                Account
              </button>
            </li>
          </ul>
          <div className="bg-wrapper mt-60 lg-mt-40">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade active show"
                role="tabpanel"
                id="fc1"
              >
                <div
                  className="accordion accordion-style-two"
                  id="accordionTwo"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-one">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-one"
                        aria-expanded="false"
                        aria-controls="collapse-one"
                      >
                        How does the free trial work?
                      </button>
                    </div>
                    <div
                      id="collapse-one"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-one"
                      data-bs-parent="#accordionTwo"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-two">
                      <button
                        className="accordion-button "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-two"
                        aria-expanded="true"
                        aria-controls="collapse-two"
                      >
                        How do you find different criteria in your process?
                      </button>
                    </div>
                    <div
                      id="collapse-two"
                      className="accordion-collapse collapse show"
                      aria-labelledby="heading-two"
                      data-bs-parent="#accordionTwo"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-three">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-three"
                        aria-expanded="false"
                        aria-controls="collapse-three"
                      >
                        What do you look for in a founding team?
                      </button>
                    </div>
                    <div
                      id="collapse-three"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-three"
                      data-bs-parent="#accordionTwo"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-four">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-four"
                        aria-expanded="false"
                        aria-controls="collapse-four"
                      >
                        Do you recommend Pay as you go or Pre pay?
                      </button>
                    </div>
                    <div
                      id="collapse-four"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-four"
                      data-bs-parent="#accordionTwo"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-five">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-five"
                        aria-expanded="false"
                        aria-controls="collapse-five"
                      >
                        What do I get for $0 with my plan?
                      </button>
                    </div>
                    <div
                      id="collapse-five"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-five"
                      data-bs-parent="#accordionTwo"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" role="tabpanel" id="fc2">
                <div
                  className="accordion accordion-style-two"
                  id="accordionThree"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-six">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-six"
                        aria-expanded="false"
                        aria-controls="collapse-six"
                      >
                        How does the free trial work?
                      </button>
                    </div>
                    <div
                      id="collapse-six"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-six"
                      data-bs-parent="#accordionThree"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-seven">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-seven"
                        aria-expanded="false"
                        aria-controls="collapse-seven"
                      >
                        How do you find different criteria in your process?
                      </button>
                    </div>
                    <div
                      id="collapse-seven"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-seven"
                      data-bs-parent="#accordionThree"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" role="tabpanel" id="fc3">
                <div
                  className="accordion accordion-style-two"
                  id="accordionFour"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-eight">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-eight"
                        aria-expanded="false"
                        aria-controls="collapse-eight"
                      >
                        How does the free trial work?
                      </button>
                    </div>
                    <div
                      id="collapse-eight"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-eight"
                      data-bs-parent="#accordionFour"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-nine">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-nine"
                        aria-expanded="false"
                        aria-controls="collapse-nine"
                      >
                        How do you find different criteria in your process?
                      </button>
                    </div>
                    <div
                      id="collapse-nine"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-nine"
                      data-bs-parent="#accordionFour"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" role="tabpanel" id="fc4">
                <div
                  className="accordion accordion-style-two"
                  id="accordionFive"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-ten">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-ten"
                        aria-expanded="false"
                        aria-controls="collapse-ten"
                      >
                        How does the free trial work?
                      </button>
                    </div>
                    <div
                      id="collapse-ten"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-ten"
                      data-bs-parent="#accordionFive"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-eleven">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-eleven"
                        aria-expanded="false"
                        aria-controls="collapse-eleven"
                      >
                        How do you find different criteria in your process?
                      </button>
                    </div>
                    <div
                      id="collapse-eleven"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-eleven"
                      data-bs-parent="#accordionFive"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" role="tabpanel" id="fc5">
                <div
                  className="accordion accordion-style-two"
                  id="accordionSix"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-twelve">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-twelve"
                        aria-expanded="false"
                        aria-controls="collapse-twelve"
                      >
                        How does the free trial work?
                      </button>
                    </div>
                    <div
                      id="collapse-twelve"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-twelve"
                      data-bs-parent="#accordionSix"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-thirteen">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-thirteen"
                        aria-expanded="false"
                        aria-controls="collapse-thirteen"
                      >
                        How do you find different criteria in your process?
                      </button>
                    </div>
                    <div
                      id="collapse-thirteen"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-thirteen"
                      data-bs-parent="#accordionSix"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" role="tabpanel" id="fc6">
                <div
                  className="accordion accordion-style-two"
                  id="accordionSeven"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-fourteen">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-fourteen"
                        aria-expanded="false"
                        aria-controls="collapse-fourteen"
                      >
                        How does the free trial work?
                      </button>
                    </div>
                    <div
                      id="collapse-fourteen"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-fourteen"
                      data-bs-parent="#accordionSeven"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-fifteen">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-fifteen"
                        aria-expanded="false"
                        aria-controls="collapse-fifteen"
                      >
                        How do you find different criteria in your process?
                      </button>
                    </div>
                    <div
                      id="collapse-fifteen"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-fifteen"
                      data-bs-parent="#accordionSeven"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" role="tabpanel" id="fc7">
                <div
                  className="accordion accordion-style-two"
                  id="accordionEight"
                >
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-sixteen">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-sixteen"
                        aria-expanded="false"
                        aria-controls="collapse-sixteen"
                      >
                        How does the free trial work?
                      </button>
                    </div>
                    <div
                      id="collapse-sixteen"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-sixteen"
                      data-bs-parent="#accordionEight"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="heading-seventeen">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-seventeen"
                        aria-expanded="false"
                        aria-controls="collapse-seventeen"
                      >
                        How do you find different criteria in your process?
                      </button>
                    </div>
                    <div
                      id="collapse-seventeen"
                      className="accordion-collapse collapse "
                      aria-labelledby="heading-seventeen"
                      data-bs-parent="#accordionEight"
                    >
                      <div className="accordion-body">
                        <p>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="text-center border-bottom pb-150 lg-pb-50 mt-60 lg-mt-40 wow fadeInUp"
            style={{ visibility: "visible" }}
          >
            <div className="title-three mb-30">
              <h2 className="fw-normal">Don’t get your answer?</h2>
            </div>
            <NavLink className="btn-one" to={APP_ROUTES.Contact}>
              Contact Us
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
