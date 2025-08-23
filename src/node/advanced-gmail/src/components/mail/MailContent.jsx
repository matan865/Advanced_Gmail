import React from "react";
import IconButton from "./IconButton";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function MailContent({sender, subject, date, body, fromAvatar, fromEmail, labels = [], onToggleStarred , onReply  }) {
  return (
    <div className="container ms-auto" style={{ height: "600px", width: "1000px", overflowY: "auto" }}>
      <div className="mail my-4">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0">
            {subject}
            {labels && labels.map(label => <span key={label} className="badge bg-light text-dark border ms-2">{label}</span>)}
          </h5>
          <div className="d-flex align-items-center gap-3 text-muted">
            <small>{date}</small>
            <IconButton icon={(labels || []).includes("Starred") ? "bi-star-fill text-warning" : "bi-star"} title="Star"
              onClick={onToggleStarred } />
            <i className="bi bi-reply" title="Reply" role="button" onClick={onReply} ></i>
          </div>
        </div>

        <div className="d-flex align-items-center mt-3">
          <img 
            src={fromAvatar || "/avatars/avatar1.png"} 
            className="rounded-circle me-2" 
            alt="profile" 
            style={{width: "40px", height: "40px"}}
          />
          <div>
            <strong>{sender}</strong>
            <small className="text-muted ms-2">
              &lt;{fromEmail || 'unknown@mail.com'}&gt;
            </small>

            <div className="text-muted small">to me</div>
          </div>
        </div>
      </div>

      <div className="mail-content my-4">
        <p className="text-muted">
          {body || "No content"}
        </p>
      </div>

      <div className="ButtonsBelow d-flex gap-2">
        <button type="button" className="btn btn-outline-secondary" onClick={onReply}>
          <i className="bi bi-reply me-2"></i> Reply
        </button>
        <button type="button" className="btn btn-outline-secondary">
          <i className="bi bi-forward me-2"></i> Forward
        </button>
      </div>
    </div>
  );
}

export default MailContent;