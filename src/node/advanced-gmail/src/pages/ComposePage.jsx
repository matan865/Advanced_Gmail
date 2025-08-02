import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { sendMail } from "../api";

function ComposePage({ onClose }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = async () => {
    try {
      //to is an email
      await sendMail({ to, subject, body });
      alert("Mail sent successfully");
      onClose();
    } catch (error) {
      console.error("Failed to send mail:", error);
      alert("Failed to send mail.");
    }
  };

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
          <input
            type="email"
            className="form-control"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows="10"
            placeholder="Write your message..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleSend}>
            <i className="bi bi-send me-2"></i> Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComposePage;
