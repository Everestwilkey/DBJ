class RegistrationCTA {
    constructor() {
        this.modalShown = false;
        this.init();
    }

    init() {
        // Check if user has seen the modal before
        if (localStorage.getItem("ctaModalShown")) {
            return;
        }

        // Create modal HTML
        const modalHTML = `
            <div id="registration-cta" class="modal-overlay">
                <div class="modal-content">
                    <button class="close-button">&times;</button>
                    <h2>🎉 Special Offer for New Visitors!</h2>
                    <p>Register today and get a chance to win amazing prizes:</p>
                    <ul>
                        <li>🎁 $50 Store Credit</li>
                        <li>⭐ Exclusive Member Discounts</li>
                        <li>🔔 Early Access to Sales</li>
                    </ul>
                    <button class="register-button">Register Now</button>
                </div>
            </div>
        `;

        // Add modal to the page
        document.body.insertAdjacentHTML("beforeend", modalHTML);

        // Show modal with a slight delay
        setTimeout(() => this.showModal(), 2000);

        // Add event listeners
        this.addEventListeners();
    }

    showModal() {
        const modal = document.getElementById("registration-cta");
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
        this.modalShown = true;
        localStorage.setItem("ctaModalShown", "true");
    }

    hideModal() {
        const modal = document.getElementById("registration-cta");
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }

    addEventListeners() {
        const modal = document.getElementById("registration-cta");
        const closeButton = modal.querySelector(".close-button");
        const registerButton = modal.querySelector(".register-button");

        closeButton.addEventListener("click", () => this.hideModal());
        
        registerButton.addEventListener("click", () => {
            // Redirect to registration page
            window.location.href = "/register";
        });

        // Close modal when clicking outside
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.hideModal();
            }
        });
    }
}

export default RegistrationCTA; 