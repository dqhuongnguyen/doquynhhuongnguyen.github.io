// auth.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    // Handle form submission for registration/login
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const fullname = document.getElementById("fullname").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            // Validate inputs
            if (!fullname || !email || !password || !confirmPassword) {
                alert("Please fill in all fields.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Save user data in localStorage (demo only, never store passwords like this in production)
            localStorage.setItem("username", fullname);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password); // Not secure! For demo only

            // Redirect to homepage
            window.location.href = "./index.html";
        });
    }

    // Populate username on homepage or cart page
    const accountLink = document.getElementById("account-link");
    const mobileAccountLink = document.getElementById("mobile-account-link");
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
        if (accountLink) accountLink.innerHTML = `<img src="./assets/user.webp" width="20px">${storedUsername}`;
        if (mobileAccountLink) mobileAccountLink.innerHTML = `<img src="./assets/user.webp" width="20px">${storedUsername}`;
    }
});
