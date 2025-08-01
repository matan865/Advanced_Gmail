import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api";
import "../../styles/login.css";


export default function SignUpForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) return "Enter your first name";
    if (!birthday) return "Enter your birthday";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    if (!gender) return "Please select your gender";
    
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return "Email not selected.";
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const userEmail = localStorage.getItem("userEmail"); // Get email from ChooseMailPage
      const { token } = await signup({
        username: name,
        password,
        displayName: name,
        avatar: null,
        birthday,
        gender,
        email: userEmail 
      });

      localStorage.setItem("token", token);
      localStorage.removeItem("userEmail"); // Clean up
      navigate("/inbox");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="right-section">
      <div className="mb-3">
        <input
          type="text"
          placeholder="First name"
          className={`form-control mt-2 ${error ? 'is-invalid' : ''}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          className={`form-control mt-2 ${error ? 'is-invalid' : ''}`}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className={`form-control mt-2 ${error ? 'is-invalid' : ''}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className={`form-control mt-2 ${error ? 'is-invalid' : ''}`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <select
          className={`form-select mt-2 ${error ? 'is-invalid' : ''}`}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="none">Rather not say</option>
        </select>
      </div>

      {error && (
        <div className="text-danger mb-2">
          ❗ {error}
        </div>
      )}

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary mt-2">
          Next
        </button>
      </div>
    </form>
  );
}
