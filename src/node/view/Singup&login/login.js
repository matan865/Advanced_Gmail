console.log("JS loaded!");

document.getElementById("submitBtn").onclick = function () {
  const input = document.getElementById("emailInput");
  const value = input.value.trim();

  if (value === "" || !value.includes("@")) {
    input.classList.add("is-invalid");
    
  } else {
    input.classList.remove("is-invalid");
    localStorage.setItem("userEmail", value);
    location.href = "password.html";
  }
}

document.getElementById("CreateAccount").onclick = function () {
  location.href = "sing_up.html";
}



