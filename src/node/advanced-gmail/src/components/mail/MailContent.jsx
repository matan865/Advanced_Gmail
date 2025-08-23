import React, { useEffect, useMemo, useState } from "react";
import IconButton from "./IconButton";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/mailContent.css";
import { sendMail, getUsers } from "../../api";

function MailContent({sender, subject, date, body, fromAvatar, fromEmail, labels = [], onToggleStarred , onReply  }) {
  // Forward UI state
  const [showForward, setShowForward] = useState(false);
  const [forwardTo, setForwardTo] = useState("");
  const [users, setUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // load users for autocomplete (same source as ComposePage)
  useEffect(() => {
    (async () => {
      try {
        const list = await getUsers();
        setUsers(Array.isArray(list) ? list : []);
      } catch (e) {
        console.warn("Failed to load users for forward suggestions", e);
      }
    })();
  }, []);

  // helpers copied from ComposePage (multi recipients comma-separated)
  const splitRecipients = (val) =>
    String(val || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const getCurrentToken = (val) => {
    const parts = String(val || "").split(",");
    return (parts[parts.length - 1] || "").trim();
  };

  const replaceCurrentToken = (val, replacement) => {
    const parts = String(val || "")
      .split(",")
      .map((s) => s.trim());
    parts[parts.length - 1] = replacement;
    const joined = parts.filter(Boolean).join(", ");
    return joined ? `${joined}, ` : "";
  };

  const suggestions = useMemo(() => {
    const q = getCurrentToken(forwardTo).toLowerCase();
    if (!q) return [];
    return users
      .filter(
        (u) =>
          (u.username || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [forwardTo, users]);

  const buildForwardPayload = () => {
    const subj = (subject || "").toLowerCase().startsWith("fwd:")
      ? subject
      : `Fwd: ${subject || ""}`;
    const dateStr =
      date ? new Date(date).toLocaleString() : "";
    const displayFrom =
      typeof sender === "string" ? sender : (sender || "");
    const forwardedBody =
      `\n\n---------- Forwarded message ----------\n` +
      `From: ${displayFrom} <${fromEmail || "unknown@mail.com"}>\n` +
      (dateStr ? `Date: ${dateStr}\n` : "") +
      `Subject: ${subject || ""}\n\n` +
      `${body || ""}`;
    return { subj, forwardedBody };
  };

  const handleForwardSend = async (recipients) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Redirecting to login…");
        window.location.href = "/login";
        return;
      }
      const uniq = Array.from(new Set(recipients.filter(Boolean)));
      if (uniq.length === 0) {
        alert("Please enter at least one recipient");
        return;
      }
      const { subj, forwardedBody } = buildForwardPayload();
      for (const rcp of uniq) {
        // eslint-disable-next-line no-await-in-loop
        await sendMail({ to: rcp, subject: subj, body: forwardedBody });
      }
      alert("Mail forwarded successfully");
      // reset UI
      setShowForward(false);
      setForwardTo("");
      setShowSuggestions(false);
    } catch (err) {
      console.error("Failed to forward:", err);
      alert(`Failed to forward. ${err?.message || ""}`);
    }
  };

  const onSuggestionClick = (u) => {
    // auto-send immediately to chosen suggestion
    handleForwardSend([u.email]);
  };

  const onForwardKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const recipients = splitRecipients(forwardTo);
      handleForwardSend(recipients);
    }
  };

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
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => { setShowForward((v) => !v); setShowSuggestions(false); }}
          title="Forward"
        >
          <i className="bi bi-forward me-2"></i> Forward
        </button>
        {showForward && (
          <div className="forward-box position-relative">
            <input
              type="text"
              placeholder="Enter email"
              className="form-control"
              value={forwardTo}
              onChange={(e) => { setForwardTo(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={onForwardKeyDown}
              style={{ minWidth: 320 }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="list-group position-absolute w-100"
                style={{ zIndex: 10, backgroundColor: "white" }}
              >
                {suggestions.map((u) => (
                  <li
                    key={u.id}
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    role="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setForwardTo(replaceCurrentToken(forwardTo, u.email));
                      setShowSuggestions(false);
                    }}
                  >
                    <span>
                      <strong>{u.username}</strong>
                      <span className="text-muted ms-2">{u.email}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MailContent;