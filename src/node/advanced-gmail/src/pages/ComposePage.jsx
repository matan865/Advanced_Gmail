import React, { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { sendMail, getUsers } from "../api";

function ComposePage({ onClose, initialTo = "", initialSubject = "", initialBody = "" }) {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [users, setUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Load users for autocomplete suggestions
    (async () => {
      try {
        const list = await getUsers();
        setUsers(Array.isArray(list) ? list : []);
      } catch (e) {
        console.warn("Failed to load users for compose suggestions", e);
      }
    })();
  }, []);

 
  useEffect(() => { setTo(initialTo || ""); }, [initialTo]);
  useEffect(() => { setSubject(initialSubject || ""); }, [initialSubject]);
  useEffect(() => { setBody(initialBody || ""); }, [initialBody]);

  // Multi-recipient helpers (comma-separated tokens)
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
    const q = getCurrentToken(to).toLowerCase();
    if (!q) return [];
    return users
      .filter(
        (u) => (u.username || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [to, users]);

  const handleSend = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Redirecting to login…');
        window.location.href = '/login';
        return;
      }

      const toVal = String(to || '').trim();
      const subjectVal = String(subject || '').trim();
      const bodyVal = String(body || '').trim();
      if (!toVal || !subjectVal || !bodyVal) {
        alert('Please fill To, Subject, and text');
        return;
      }

      setIsSending(true);
      const recipients = Array.from(new Set(splitRecipients(toVal)));
      if (recipients.length === 0) {
        alert('Please enter at least one recipient');
        return;
      }
      for (const rcp of recipients) {
        // eslint-disable-next-line no-await-in-loop
        await sendMail({ to: rcp, subject: subjectVal, body: bodyVal });
      }
      alert("Mail sent successfully");
      onClose();
    } catch (error) {
      console.error("Failed to send mail:", error);
      alert(`Failed to send mail. ${error?.message || ''}`);
    } finally {
      setIsSending(false);
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
        <div className="mb-3 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="To"
            value={to}
            onChange={(e) => { setTo(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="list-group position-absolute w-100" style={{ zIndex: 10 , backgroundColor: "white"}}>
              {suggestions.map(u => (
                <li
                  key={u.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  role="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { setTo(replaceCurrentToken(to, u.email)); setShowSuggestions(false); }}
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
          <button className="btn btn-primary" onClick={handleSend} disabled={isSending}>
            <i className="bi bi-send me-2"></i> Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComposePage;
