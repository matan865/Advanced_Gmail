import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!email.includes("@")) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
      localStorage.setItem("userEmail", email);
      navigate("/password");
    }
  };

  const handleCreate = () => {
    navigate("/signup");
  };

  return (
    <div className="right-section">
      <div className="mb-3">
        <input
          type="text"
          className={`form-control ${isInvalid ? "is-invalid" : ""}`}
          placeholder="Email or phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="invalid-feedback">
          <span className="me-1">❗</span>Couldn't find your account
        </div>
      </div>
      <p><a href="#" className="link-primary text-decoration-none">Forgot email?</a></p>
      <div className="d-flex justify-content-end gap-2">
        <button onClick={handleCreate} className="btn btn-outline-primary">Create account</button>
        <button onClick={handleNext} className="btn btn-primary">Next</button>
      </div>
    </div>
  );
}

export default LoginForm;
