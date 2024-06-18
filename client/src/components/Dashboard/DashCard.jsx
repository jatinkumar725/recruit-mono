import React from "react";

const DashCard = ({ title, value, imageLink }) => {
  return (
    <div className="col-lg-3 col-md-6">
      <div className="dash-card-one bg-white border-30 position-relative mb-15">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1">
            <img
              src={imageLink}
              alt={`${title} - ${value}`}
              className="lazy-img"
            />
          </div>
          <div className="order-sm-0">
            <div className="value fw-500">{value}</div>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCard;
