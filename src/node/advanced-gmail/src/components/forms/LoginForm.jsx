
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api";
import "../../styles/inputbox.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter a valid email and password");
      return;
    }
    try {
      const { token, userId } = await login({ username: email, password });
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      navigate("/inbox");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="right-section">
      <div className="inputbox ">
        <input
          type="text"
          placeholder="Enter your email"
          className={`form-control ${error ? "is-invalid" : ""}`}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <i></i>
      </div>
      <div className="inputbox">

        <input
          type="password"
          placeholder="Password"
          className={`form-control mt-2 ${error ? "is-invalid" : ""}`}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <i></i>
      </div>

      {error && <div className="text-danger mt-2">❗ {error}</div>}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Link to="/signup" className="btn btn-outline-primary">
          Create account
        </Link>
        <button type="submit" className="btn btn-primary next-btn">
          Next
        </button>
      </div>
    </form>
  );
}
export default LoginForm;