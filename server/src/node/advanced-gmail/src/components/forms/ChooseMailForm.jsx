import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export default function ChooseMailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter a valid email address");
      return;
    }

    // Save email to localStorage and navigate to signup completion
    localStorage.setItem("userEmail", email);
    navigate("/signup-complete"); //  complete signup with chosen email
  };

  return (
    <form onSubmit={handleSubmit} className="right-section">
      <div className="mb-3">
        <input
          type="text"
          className={`form-control mt-2 ${error ? "is-invalid" : ""}`}
          placeholder="Create your mail address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <p className="text-muted mb-2">
          You can use letters, numbers and periods
        </p>
        {error && <div className="invalid-feedback">❗ {error}</div>}
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </div>
    </form>
  );
}
