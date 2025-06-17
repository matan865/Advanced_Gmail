import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function InboxToolbar() {
  return (
    <div className="mainBlock">
      <div className="toolBar col-9">
        <div className="row">
          <div className="d-flex align-items-center gap-3">
            <input type="checkbox" />
            <i className="bi bi-arrow-clockwise"></i>
            <span className="ms-auto">1-50</span>
            <i className="bi bi-chevron-left"></i>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InboxToolbar;
