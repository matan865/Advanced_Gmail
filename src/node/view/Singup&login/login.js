console.log("JS loaded!"); // quick check that the JS file runs

// when "submit" button is clicked
document.getElementById("submitBtn").onclick = function () {
  const input = document.getElementById("emailInput");
  const value = input.value.trim();

  // check if empty or missing "@"
  if (value === "" || !value.includes("@")) {
    input.classList.add("is-invalid"); // mark as invalid
    
  } else {
    input.classList.remove("is-invalid"); // clear invalid state
    localStorage.setItem("userEmail", value); // save email for later use
    location.href = "password.html"; // move to password page
  }
}

// when "Create Account" button is clicked
document.getElementById("CreateAccount").onclick = function () {
  location.href = "sing_up.html"; // go to sign-up page
}



