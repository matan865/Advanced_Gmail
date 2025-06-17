import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (password !== "123456") {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
      navigate("/inbox");
    }
  };

  return (
    <div className="right-section">
      <div className="mb-3">
        <input
          id="passwordInput"
          type={showPassword ? "text" : "password"}
          className={`form-control ${isInvalid ? "is-invalid" : ""}`}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-check d-flex align-items-center gap-2 mt-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label className="form-check-label">Show password</label>
        </div>
        {isInvalid && (
          <div className="invalid-feedback">
            ❗ Invalid password
          </div>
        )}
      </div>

      <p><a href="#" className="link-primary text-decoration-none">Forgot email?</a></p>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-outline-primary">Try another way</button>
        <button onClick={handleNext} className="btn btn-primary">Next</button>
      </div>
    </div>
  );
}

export default PasswordForm;
