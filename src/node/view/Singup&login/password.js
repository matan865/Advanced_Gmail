// when page loads, show saved email if it exists
document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("userEmail");
  const display = document.getElementById("emailDisplay");

  if (email) {
    display.textContent = email; // put email on screen
  }
});

// when "submit" button is clicked
document.getElementById("submitBtn").onclick = function () {
  const input = document.getElementById("passwordInput");
  const value = input.value.trim();

  // quick check: password must be "123456"
  if (value !== "123456") { // Replace with actual password validation logic
    input.classList.add("is-invalid"); // mark as invalid

  } else {
    input.classList.remove("is-invalid"); // clear invalid state 
    location.href = "inbox.html"; // move to inbox page
  }


};
// toggle show/hide password
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordInput");
  const checkbox = document.getElementById("showPassword");

  checkbox.addEventListener("change", function () {
    passwordInput.type = this.checked ? "text" : "password"; // switch mode
  });
});