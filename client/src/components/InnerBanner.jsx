import React from "react";
import { SITE_DIR_URI } from "../constants/siteConstants";

const InnerBanner = ({ heading, subTitle, beforeTitle, afterTitle }) => {
  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-8 m-auto text-center">
              {beforeTitle}
              <div className="title-two">
                {heading && <h2 className="text-white">{heading}</h2>}
              </div>
              {subTitle && (
                <p className="text-lg text-white mt-30 lg-mt-20">{subTitle}</p>
              )}
              {afterTitle}
            </div>
          </div>
        </div>
      </div>
      <img
        src={`${SITE_DIR_URI}images/shape/shape_02.svg`}
        alt=""
        className="lazy-img shapes shape_01"
      />
      <img
        src={`${SITE_DIR_URI}images/shape/shape_03.svg`}
        alt=""
        className="lazy-img shapes shape_02"
      />
    </div>
  );
};

export default InnerBanner;
