import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChooseMailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const existingEmails = ["roy123@gmail.com"];

  const handleSubmit = () => {
    if (email.trim() === "" || existingEmails.includes(email.trim())) {
      setError(true);
    } else {
      setError(false);
      // send the email to your backend or API
      localStorage.setItem("userEmail", email);
      navigate("/inbox");
    }
  };

  return (
    <div className="right-section">
      <div className="mb-3">
        <input
          type="text"
          className={`form-control mt-2 ${error ? "is-invalid" : ""}`}
          placeholder="Create your own Mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-muted mb-2">You can use letters, numbers and periods</p>
        {error && (
          <div className="invalid-feedback">
            ❗ This email address is already taken
          </div>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <button onClick={handleSubmit} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}

export default ChooseMailForm;
