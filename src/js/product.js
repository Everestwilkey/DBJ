import { setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { renderProductPage } from "./productDetails.mjs";
// This get the items in the local storage for what ever was in the cart already
const productid = getParam("product")
console.log(productid)
function getCart(key) {

  let retrievedList = []
  const storedListString = localStorage.getItem(key);
  console.log(storedListString)
  // checks to make sure there cart is not empty if so we return a empty cart
  if (storedListString != null) {
    retrievedList = JSON.parse(storedListString);
    console.log(retrievedList)
  }
  else {
    console.log("no items in the cart")
  }
  //returns any items in the cart that were in localstorage
  return retrievedList
}

function addProductToCart(product) {
  let retrievedList = getCart("so-cart")
  // Add the product to the list of products in the cart
  retrievedList.push(product)
  // Save the new list to local storage and overwrite the old one
  setLocalStorage("so-cart", retrievedList);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}


// add listener to Add to Cart button
await renderProductPage(".productPage")
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
