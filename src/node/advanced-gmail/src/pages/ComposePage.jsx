import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ComposePage({ onClose }) {
  return (
    <div className="mainContainer" style={{ width: "50%", marginTop: "50px"}}>
      <div className="mailToolBar col-9 p-3 d-flex justify-content-between align-items-center">
        <h5>New Message</h5>
        <button className="btn btn-outline-secondary" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="mailContent p-3">
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="To" />
        </div>

        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Subject" />
        </div>

        <div className="mb-3">
          <textarea className="form-control" rows="10" placeholder="Write your message..."></textarea>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">
            <i className="bi bi-send me-2"></i> Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComposePage;
