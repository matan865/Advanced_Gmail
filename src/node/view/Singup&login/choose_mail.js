document.getElementById("submitBtn").onclick = function () {
    let isValid = true;
    const emailInput = document.getElementById("emailInput");
    if (emailInput.value.trim() === "") {
        emailInput.classList.add("is-invalid");
        isValid = false;
    }
    else {
        emailInput.classList.remove("is-invalid");
    }
    if (isValid) {
        // Simulate an email check (replace with actual email validation logic)
        const existingEmails = ["roy123@gmail.com"]; // Example existing emails
        if (existingEmails.includes(emailInput.value.trim())) {
            emailInput.classList.add("is-invalid");
            isValid = false;
        } else {
            emailInput.classList.remove("is-invalid");
            location.href = "inbox.html"; 
        }
    }

}