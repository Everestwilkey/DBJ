document.getElementById("newsletter-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    if(email) {
        localStorage.setItem("newsletterEmail", email);
        document.getElementById("message").textContent = "Thank you for subscribing!";
        document.getElementById("email").value = "";
    }
})