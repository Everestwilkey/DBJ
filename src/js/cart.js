import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let totalelement = document.querySelector('.cart-footer')
  let totalTextElement = document.querySelector('.cart-total')
  const cartItems = getLocalStorage("so-cart");
  // checks if there is any items in the cart if not will not display the total
  if(cartItems == 0){
    //hides the total element from the page
    totalelement.classList.add("hidden");

  }
  // will display the total for the cart if there are any items
  else{
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // sets the total for the cart 
  let total = setcartTotal(cartItems)
  // gets the total and displays it in the p tag on the cart page 
  totalTextElement.innerText = `Total: $${total.toFixed(2)}`;
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // removes the hidden class on the div total to show the total
  totalelement.classList.remove("hidden");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

//this will get the cart contents and update the total cost for the items in the cart
function setcartTotal(products){
  var total = 0
  products.forEach((product) => {
    total  +=  parseFloat(product.ListPrice)
  });
  console.log("Cart Total:", total);
  // returns the calculate total for the cart and return a float 
  return total
 

}
renderCartContents();

