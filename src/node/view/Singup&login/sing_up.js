document.getElementById("submitBtn").onclick = function () {
  let isValid = true;

  const nameInput = document.getElementById("nameInput");
  if (nameInput.value.trim() === "") {
    nameInput.classList.add("is-invalid");
    isValid = false;
  } else {
    nameInput.classList.remove("is-invalid");
  }

  const birthdayInput = document.getElementById("birthdayInput");
  if (birthdayInput.value.trim() === "") {
    birthdayInput.classList.add("is-invalid");
    isValid = false;
  } else {
    birthdayInput.classList.remove("is-invalid");
  }

  const passwordInput = document.getElementById("passwordInput");
  if (passwordInput.value.length < 8) {
    passwordInput.classList.add("is-invalid");
    isValid = false;
  } else {
    passwordInput.classList.remove("is-invalid");
  }

  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordInput.classList.add("is-invalid");
    isValid = false;
  } else {
    confirmPasswordInput.classList.remove("is-invalid");
  }

  const genderSelect = document.getElementById("genderSelect");
  if (genderSelect.value === "Gender") {
    genderSelect.classList.add("is-invalid");
    isValid = false;
  } else {
    genderSelect.classList.remove("is-invalid");
  }

  if (isValid) {
    location.href = "choose_mail.html";
  }
};
