const BASE = "/api";

export async function signup({ username, password, displayName, avatar, birthday, gender, email }) {
  const res = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      username, 
      password, 
      name: displayName, 
      email: email, 
      avatarUrl: avatar || ""
    })
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
  localStorage.setItem("userId", data.userId); // Save userId
  return data; 
}

export async function fetchMails() {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User not logged in");

  const res = await fetch(`${BASE}/mails`, {
    headers: { 
      "user-id": userId,
      "Content-Type": "application/json"
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to load mails");
  }
  return res.json();
}

export async function sendMail({ to, subject, body }) {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User not logged in");

  const res = await fetch(`${BASE}/mails`, {
    method: "POST",
    headers: { 
      "user-id": userId,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ to, subject, body }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to send mail");
  }
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to load users");
  }
  return res.json();
}
