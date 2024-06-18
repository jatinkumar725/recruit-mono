import React from "react";

const Index = () => {
  return (
    <>
      <section className="job-listing-three pt-100 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <button
                type="button"
                className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
                data-bs-toggle="offcanvas"
                data-bs-target="#filteroffcanvas"
              >
                <i className="bi bi-funnel" />
                Filter
              </button>
              <div
                className="filter-area-tab offcanvas offcanvas-start"
                id="filteroffcanvas"
              >
                <button
                  type="button"
                  className="btn-close text-reset d-lg-none"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
                <div className="main-title fw-500 text-dark">All Filters</div>
                <div className="light-bg border-20 ps-4 pe-4 pt-25 pb-30 mt-20">
                  <div className="filter-block bottom-line pb-25">
                    <a
                      className="filter-title fw-500 text-dark"
                      data-bs-toggle="collapse"
                      href="#collapseLocation"
                      role="button"
                      aria-expanded="false"
                    >
                      Location
                    </a>
                    <div className="collapse show" id="collapseLocation">
                      <div className="main-body">
                        <select className="nice-select bg-white">
                          <option value={0}>Washington DC</option>
                          <option value={1}>California, CA</option>
                          <option value={2}>New York</option>
                          <option value={3}>Miami</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="filter-block bottom-line pb-25 mt-25">
                    <a
                      className="filter-title fw-500 text-dark"
                      data-bs-toggle="collapse"
                      href="#collapseJobType"
                      role="button"
                      aria-expanded="false"
                    >
                      Job Type
                    </a>
                    <div className="collapse show" id="collapseJobType">
                      <div className="main-body">
                        <ul className="style-none filter-input">
                          <li>
                            <input type="checkbox" name="JobType" />
                            <label>
                              Fulltime <span>3</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="JobType" />
                            <label>
                              Part-time (20hr/week) <span>0</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="filter-block bottom-line pb-25 mt-25">
                    <a
                      className="filter-title fw-500 text-dark"
                      data-bs-toggle="collapse"
                      href="#collapseJobType"
                      role="button"
                      aria-expanded="false"
                    >
                      Employment Type
                    </a>
                    <div className="collapse show" id="collapseJobType">
                      <div className="main-body">
                        <ul className="style-none filter-input">
                          <li>
                            <input type="checkbox" name="JobType" />
                            <label>
                              Fulltime <span>3</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="JobType" />
                            <label>
                              Part-time<span>0</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* /.filter-block */}
                  <div className="filter-block bottom-line pb-25 mt-25">
                    <a
                      className="filter-title fw-500 text-dark"
                      data-bs-toggle="collapse"
                      href="#collapseExp"
                      role="button"
                      aria-expanded="false"
                    >
                      Experience
                    </a>
                    <div className="collapse show" id="collapseExp">
                      <div className="main-body">
                        <ul className="style-none filter-input">
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              Fresher <span>5</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              Intermediate <span>3</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              No-Experience <span>1</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              Internship <span>12</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              Expert <span>17</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* /.filter-block */}
                  <div className="filter-block bottom-line pb-25 mt-25">
                    <a
                      className="filter-title fw-500 text-dark"
                      data-bs-toggle="collapse"
                      href="#collapseSalary"
                      role="button"
                      aria-expanded="false"
                    >
                      Salary
                    </a>
                    <div className="collapse show" id="collapseSalary">
                      <div className="main-body">
                        <div className="salary-slider">
                          <div className="price-input d-flex align-items-center pt-5">
                            <div className="field d-flex align-items-center">
                              <input
                                type="number"
                                className="input-min"
                                readOnly=""
                              />
                            </div>
                            <div className="pe-1 ps-1">-</div>
                            <div className="field d-flex align-items-center">
                              <input
                                type="number"
                                className="input-max"
                                readOnly=""
                              />
                            </div>
                            <div className="currency ps-1">USD</div>
                          </div>
                          <div className="slider">
                            <div className="progress" />
                          </div>
                          <div className="range-input mb-10">
                            <input
                              type="range"
                              className="range-min"
                              min={0}
                              max={950}
                              step={10}
                            />
                            <input
                              type="range"
                              className="range-max"
                              min={0}
                              max={1000}
                              step={10}
                            />
                          </div>
                        </div>
                        <ul className="style-none d-flex flex-wrap justify-content-between radio-filter mb-5">
                          <li>
                            <input type="radio" name="jobDuration" />
                            <label>Weekly</label>
                          </li>
                          <li>
                            <input type="radio" name="jobDuration" />
                            <label>Monthly</label>
                          </li>
                          <li>
                            <input type="radio" name="jobDuration" />
                            <label>Hourly</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* /.filter-block */}
                  <div className="filter-block bottom-line pb-25 mt-25">
                    <a
                      className="filter-title fw-500 text-dark collapsed"
                      data-bs-toggle="collapse"
                      href="#collapseCategory"
                      role="button"
                      aria-expanded="false"
                    >
                      Category
                    </a>
                    <div className="collapse" id="collapseCategory">
                      <div className="main-body">
                        <ul className="style-none filter-input">
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              Web Design <span>15</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              Design &amp; Creative <span>8</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              It &amp; Development <span>7</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              Web &amp; Mobile Dev <span>5</span>
                            </label>
                          </li>
                          <li>
                            <input type="checkbox" name="Experience" />
                            <label>
                              Writing <span>4</span>
                            </label>
                          </li>
                          <li className="hide">
                            <input type="checkbox" name="Experience" />
                            <label>
                              Sales &amp; Marketing <span>25</span>
                            </label>
                          </li>
                          <li className="hide">
                            <input type="checkbox" name="Experience" />
                            <label>
                              Music &amp; Audio <span>1</span>
                            </label>
                          </li>
                        </ul>
                        <div className="more-btn">
                          <i className="bi bi-plus" /> Show More
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.filter-block */}
                  <div className="filter-block bottom-line pb-25 mt-25">
                    <a
                      className="filter-title fw-500 text-dark collapsed"
                      data-bs-toggle="collapse"
                      href="#collapseTag"
                      role="button"
                      aria-expanded="false"
                    >
                      Tags
                    </a>
                    <div className="collapse" id="collapseTag">
                      <div className="main-body">
                        <ul className="style-none d-flex flex-wrap justify-space-between radio-filter mb-5">
                          <li>
                            <input type="checkbox" name="tags" />
                            <label>Web Design</label>
                          </li>
                          <li>
                            <input type="checkbox" name="tags" />
                            <label>Squarespace</label>
                          </li>
                          <li>
                            <input type="checkbox" name="tags" />
                            <label>Layout Design</label>
                          </li>
                          <li>
                            <input type="checkbox" name="tags" />
                            <label>Web Development</label>
                          </li>
                          <li>
                            <input type="checkbox" name="tags" />
                            <label>React</label>
                          </li>
                          <li>
                            <input type="checkbox" name="tags" />
                            <label>Full Stack</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* /.filter-block */}
                  <a
                    href="#"
                    className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30"
                  >
                    Apply Filter
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <p className="pb-30 lg-pb-20 m0">
                Showing <span className="text-dark fw-500">1 to 20</span> of{" "}
                <span className="text-dark fw-500">7,096</span>
              </p>
              <div className="job-post-item-wrapper">
                <div className="wrapper">
                  <div className="job-list-three d-flex h-100 w-100">
                    <div className="main-wrapper h-100 w-100">
                      <a
                        href="job-details-v2.html"
                        className="save-btn text-center rounded-circle tran3s"
                        title="Save Job"
                      >
                        <i className="bi bi-bookmark-dash" />
                      </a>
                      <div className="list-header d-flex align-items-center">
                        <div className="info-wrapper ps-0">
                          <a
                            href="job-details-v2.html"
                            className="title fw-500 tran3s"
                          >
                            Developer &amp; expert in java c++
                          </a>
                          <a href="#" className="d-block text-site-primary">
                            Battersea web expert
                          </a>
                          <ul className="style-none d-flex flex-wrap info-data mt-2">
                            <li>₹ Not disclosed</li>
                            <li>Intermediate</li>
                            <li>Spain, Barcelona</li>
                          </ul>
                        </div>
                      </div>
                      {/* ./.list-header */}
                      <p>
                        We would like to design a page on Figma to promote
                        Workroom as All-in-one solutions for Marketing, Sales,
                        Support teams...
                      </p>
                      <div className="d-sm-flex align-items-center justify-content-between mt-auto">
                        <span className="fw-500 client-status text-secondary mx-0">
                          20 Mar, 2024
                        </span>
                        <a
                          href="job-details-v2.html"
                          className="apply-btn text-center tran3s xs-mt-20"
                        >
                          APPLY
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-center">
                  <ul className="pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none">
                    <li className="active">
                      <a href="#">1</a>
                    </li>
                    <li>
                      <a href="#">2</a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">4</a>
                    </li>
                    <li>....</li>
                    <li className="ms-2">
                      <a href="#" className="d-flex align-items-center">
                        Last{" "}
                        <img
                          src="images/icon/icon_50.svg"
                          alt=""
                          className="ms-2"
                        />
                      </a>
                    </li>
                  </ul>
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
