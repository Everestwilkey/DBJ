// alerts.js
async function loadAlerts() {
    try {
      const response = await fetch("./json/alerts.json"); // Fetch alerts data
      const alerts = await response.json(); // Parse the JSON data
  
      if (alerts.length > 0) {
        const alertSection = document.createElement("section");
        alertSection.classList.add("alert-list");
  
        alerts.forEach(alert => {
          const alertParagraph = document.createElement("p");
          alertParagraph.textContent = alert.message;
          alertParagraph.style.backgroundColor = alert.background;
          alertParagraph.style.color = alert.color;
          alertParagraph.setAttribute("data-background", alert.background); // Set background as a data attribute
  
          // Create the close button
          const closeButton = document.createElement("button");
          closeButton.classList.add("close-btn");
          closeButton.textContent = "×"; // Close button character (×)
          
          // Add event listener to close the alert when clicked
          closeButton.addEventListener("click", () => {
            alertParagraph.style.display = "none"; // Hide the alert
          });
  
          // Append the close button to the alert
          alertParagraph.appendChild(closeButton);
          alertSection.appendChild(alertParagraph);
        });
  
        const mainElement = document.querySelector("main");
        if (mainElement) {
          mainElement.prepend(alertSection);
        }
      }
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }
  
  // Call the function when the page loads
  window.addEventListener("DOMContentLoaded", loadAlerts);
  