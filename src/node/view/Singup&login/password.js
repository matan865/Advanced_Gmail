document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("userEmail");
  const display = document.getElementById("emailDisplay");

  if (email) {
    display.textContent = email;
  }
});

document.getElementById("submitBtn").onclick = function () {
  const input = document.getElementById("passwordInput");
  const value = input.value.trim();

  if (value !== "123456") { // Replace with actual password validation logic
    input.classList.add("is-invalid");

  } else {
    input.classList.remove("is-invalid");
    location.href = "inbox.html";
  }


};

document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordInput");
  const checkbox = document.getElementById("showPassword");

  checkbox.addEventListener("change", function () {
    passwordInput.type = this.checked ? "text" : "password";
  });
});