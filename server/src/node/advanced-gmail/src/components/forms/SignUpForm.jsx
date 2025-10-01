import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, getUsers } from "../../api";
import "../../styles/login.css";


export default function SignUpForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");

  // Users list and username suggestion logic
  const [users, setUsers] = useState([]);
  const [suggestedUsername, setSuggestedUsername] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  useEffect(() => {
    // Load existing users once so we can suggest a unique username
    (async () => {
      try {
        const list = await getUsers();
        setUsers(Array.isArray(list) ? list : []);
      } catch (e) {
        // Non-fatal for the form; just proceed without suggestions
        console.warn("Failed to load users for suggestions", e);
      }
    })();
  }, []);

  // Create a unique username suggestion based on current input and existing users
  useEffect(() => {
    const existing = new Set(users.map(u => u.username));
    const base = String(username || '').trim();
    if (!base) {
      setSuggestedUsername("");
      setUsernameTaken(false);
      setEmailConfirmed(false);
      return;
    }
    if (!existing.has(base)) {
      setSuggestedUsername(base);
      setUsernameTaken(false);
      setEmailConfirmed(false);
      return;
    }
    // Find next available with numeric suffix
    let i = 1;
    let candidate = `${base}${i}`;
    while (existing.has(candidate)) {
      i += 1;
      candidate = `${base}${i}`;
    }
    setSuggestedUsername(candidate);
    setUsernameTaken(true);
    setEmailConfirmed(false);
  }, [username, users]);

  const validate = () => {
    if (!name.trim()) return "Enter your first name";
    if (!birthday) return "Enter your birthday";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password !== confirmPassword) return "Passwords do not match";
  if (!username.trim()) return "Enter a username";
  if (!gender) return "Please select your gender";
    
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

    if (usernameTaken && !emailConfirmed) {
      setError("Please confirm the suggested email");
      return;
    }

    try {
      const finalUsername = suggestedUsername || username;
      await signup({
        username: finalUsername,
        password,
        displayName: name,
        avatarUrl: avatarUrl || undefined,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="right-section">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Username"
          className={`form-control mt-2 ${error ? 'is-invalid' : ''}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {username && (
          <div className="mt-1 small">
            <span>
              Your mail is: <strong>{(suggestedUsername || username).trim()}@mail.com</strong>
            </span>
            {usernameTaken && suggestedUsername && suggestedUsername !== username && (
              <div className="text-warning mt-1">
                Username is taken. Suggested available: <strong>{suggestedUsername}</strong>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary ms-2"
                  onClick={() => setUsername(suggestedUsername)}
                >
                  Use suggested
                </button>
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="confirmEmail"
                    checked={emailConfirmed}
                    onChange={(e) => setEmailConfirmed(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="confirmEmail">
                    I confirm my email will be {(suggestedUsername || username).trim()}@mail.com
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
        <input
          type="text"
          placeholder="Full name"
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
        
        {/* Avatar picker */}
        <p>Choose your avatar</p>
        <div className="d-flex gap-2 flex-wrap mt-3">
          {[1,2,3,4,5,6].map(i => {
            const src = `/avatars/avatar${i}.png`;
            return (
              <img
                key={i}
                src={src}
                alt={`avatar ${i}`}
                onClick={() => setAvatarUrl(src)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: avatarUrl === src ? '3px solid #0d6efd' : '1px solid #ccc',
                  cursor: 'pointer'
                }}
              />
            );
          })}
        </div>
      </div>

      {error && (
        <div className="text-danger mb-2">
          ❗ {error}
        </div>
      )}

      <div className="d-flex justify-content-end">
  <button type="submit" className="btn btn-primary mt-2" disabled={username && usernameTaken && !emailConfirmed}>
          Create account
        </button>
      </div>
    </form>
  );
}
