// when the "submit" button is clicked
document.getElementById("submitBtn").onclick = function () {
    let isValid = true;
    const emailInput = document.getElementById("emailInput");
    // check if the field is empty
    if (emailInput.value.trim() === "") {
        emailInput.classList.add("is-invalid"); // mark as invalid
        isValid = false;
    }
    else {
        emailInput.classList.remove("is-invalid"); // remove invalid mark
    }
    // if the input passed the first check
    if (isValid) {
        // Simulate an email check (replace with actual email validation logic)
        const existingEmails = ["roy123@gmail.com"]; // Example existing emails
        // if email already exists
        if (existingEmails.includes(emailInput.value.trim())) {
            emailInput.classList.add("is-invalid"); // mark as invalid
            isValid = false;
        } else {
            emailInput.classList.remove("is-invalid"); // remove invalid mark
            location.href = "inbox.html"; // redirect to inbox
        }
    }

}