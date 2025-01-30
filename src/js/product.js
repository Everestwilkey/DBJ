import { setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { renderProductPage } from "./productDetails.mjs";
// This get the items in the local storage for what ever was in the cart already
const productid = getParam("product");
console.log(productid);
function getCart(key) {
  let retrievedList = [];
  const storedListString = localStorage.getItem(key);
  console.log(storedListString);
  // checks to make sure there cart is not empty if so we return a empty cart
  if (storedListString != null) {
    retrievedList = JSON.parse(storedListString);
    console.log(retrievedList);
  } else {
    console.log("no items in the cart");
  }
  //returns any items in the cart that were in localstorage
  return retrievedList;
}

function addProductToCart(product) {
  let retrievedList = getCart("so-cart");
  // Add the product to the list of products in the cart
  retrievedList.push(product);
  // Save the new list to local storage and overwrite the old one
  setLocalStorage("so-cart", retrievedList);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  animateCartIcon(); // Call animation function
}
// Function to animate the backpack opening
function animateCartIcon() {
  const cartIcon = document.querySelector(".cart svg"); // Target the SVG
  if (!cartIcon) return;

  // Add class to trigger animation
  cartIcon.classList.add("cart-open");

  // Remove class after animation

  setTimeout(() => {
    cartIcon.classList.remove("cart-open");
  }, 500);
}

async function init() {
  await renderProductPage(".productPage");
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
  setupCartCounter();
}
init();
// add listener to Add to Cart button

function setupCartCounter() {
  /*
For the cart number to pop up
*/
  // Select the "Add to Cart" button element
  const button = document.getElementById("addToCart");

  // Initialize the counter for the number of times the button is clicked
  let count = 0;

  // Add a click event listener to the button
  button.addEventListener("click", () => {
    // Increment the counter each time the button is clicked
    count++;

    // Check if the <span> already exists
    let countSpan = button.querySelector(".cart-count");

    if (!countSpan) {
      // Dynamically create the <span> and add it to the button
      countSpan = document.createElement("span");
      countSpan.className = "cart-count";
      button.appendChild(countSpan);
    }

    // Update the count and trigger the animation
    countSpan.textContent = count;

    // Reset and reapply the animation for the pop effect
    countSpan.style.animation = "none"; // Reset animation
    setTimeout(() => {
      countSpan.style.animation = ""; // Reapply animation
    }, 10);
  });
}
