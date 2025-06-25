
const BASE = "/api";

export async function signup({ username, password, displayName, avatar }) {
  const res = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, displayName, avatar })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Signup failed");
  }
  return data;
}

export async function login({ username, password }) {
  const res = await fetch(`${BASE}/tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }
  return data; 
}

export async function fetchMails(token) {
  const res = await fetch(`${BASE}/mails`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to load mails");
  }
  return res.json();
}
