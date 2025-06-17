import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Enter your first name";
    if (!birthday) newErrors.birthday = "Enter your birthday";
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!gender) newErrors.gender = "Please select your gender";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      navigate("/choose-mail");
    }
  };

  return (
    <div className="right-section">
      <div className="mb-3">
        <input
          type="text"
          placeholder="First name"
          className={`form-control mt-2 ${errors.name ? "is-invalid" : ""}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="invalid-feedback">❗ {errors.name}</div>}

        <input
          type="date"
          className={`form-control mt-2 ${errors.birthday ? "is-invalid" : ""}`}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        {errors.birthday && <div className="invalid-feedback">❗ {errors.birthday}</div>}

        <input
          type="password"
          placeholder="Enter your password"
          className={`form-control mt-2 ${errors.password ? "is-invalid" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="invalid-feedback">❗ {errors.password}</div>}

        <input
          type="password"
          placeholder="Confirm password"
          className={`form-control mt-2 ${errors.confirmPassword ? "is-invalid" : ""}`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <div className="invalid-feedback">❗ {errors.confirmPassword}</div>}

        <select
          className={`form-select mt-2 ${errors.gender ? "is-invalid" : ""}`}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="none">Rather not say</option>
        </select>
        {errors.gender && <div className="invalid-feedback">❗ {errors.gender}</div>}

        <div className="mb-3 mt-3">
          <label className="form-label">Upload a profile picture</label>
          <input className="form-control mt-2" type="file" accept="image/*" />
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button onClick={handleSubmit} className="btn btn-primary mt-2">
          Next
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
