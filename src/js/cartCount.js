import { getLocalStorage } from "./utils.mjs";

// Function to update cart count
export function updateCartCount() {
    let cart = getLocalStorage("so-cart") || []; // Retrieve cart from localStorage
    const cartCount = document.getElementById("cart-count");
  
    if (cartCount) { // Ensure the element exists
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? "inline-block" : "none";
    }
  }
  
  // Run the function on page load
  document.addEventListener("DOMContentLoaded", updateCartCount);
  